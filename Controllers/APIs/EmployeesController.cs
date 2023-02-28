using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CallWeb;
using ExitSurveyAdmin.Services.CsvService;
using ExitSurveyAdmin.Services.PsaApi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
{
    [Authorize(Policy = "UserRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ExitSurveyAdminContext context;
        private readonly SieveProcessor sieveProcessor;
        private readonly EmployeeReconciliationService employeeReconciler;
        private readonly EmployeeInfoLookupService employeeInfoLookup;
        private readonly CallWebService callWebService;
        private readonly LoggingService logger;
        private readonly CsvService csvService;
        private readonly PsaApiService psaApiService;
        private readonly EmailService emailService;

        public EmployeesController(
            ExitSurveyAdminContext context,
            SieveProcessor sieveProcessor,
            EmployeeReconciliationService employeeReconciler,
            EmployeeInfoLookupService employeeInfoLookup,
            CallWebService callWebService,
            LoggingService loggingService,
            CsvService csvService,
            PsaApiService psaApiService,
            EmailService emailService
        )
        {
            this.context = context;
            this.sieveProcessor = sieveProcessor;
            this.employeeInfoLookup = employeeInfoLookup;
            this.employeeReconciler = employeeReconciler;
            this.callWebService = callWebService;
            this.logger = loggingService;
            this.emailService = emailService;
            this.csvService = csvService;
            this.psaApiService = psaApiService;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IList<Employee>>> GetEmployees(
            [FromQuery] SieveModel sieveModel
        )
        {
            // Validate the page size and page.
            if (sieveModel.PageSize < 1)
            {
                throw new ArgumentOutOfRangeException("Page size must be >= 1.");
            }
            if (sieveModel.Page < 1)
            {
                throw new ArgumentOutOfRangeException("Page must be >= 1.");
            }

            // Employee query.
            var employees = context.Employees.AsNoTracking().Include(e => e.TimelineEntries);

            var sievedEmployees = await sieveProcessor.GetPagedAsync(employees, sieveModel);

            Response.Headers.Add("X-Pagination", sievedEmployees.SerializeMetadataToJson());

            return Ok(sievedEmployees.Results);
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await FindById(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PATCH: api/Employees/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchEmployee(int id, EmployeePatchDto employeePatchDto)
        {
            var existingEmployee = await FindById(id);

            var updatedEmployee = employeePatchDto.ApplyPatch(existingEmployee);

            context.Entry(updatedEmployee).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();

                // Patch the row in CallWeb.
                await callWebService.UpdateSurvey(updatedEmployee);

                return Ok(updatedEmployee);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // EmployeesFromPsaApi: Load employees from the PSA API and immediately
        // try to reconcile them. Does NOT refresh employee statuses or deal
        // with any exiting employees.
        // POST: api/Employees/FromPsaApi
        [HttpPost("FromPsaApi")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromPsaApi(
            int startIndex,
            int count
        )
        {
            try
            {
                // Get a list of candidate Employee objects based on the PSA
                // API. They will be in JSON format.
                var currentEmployees = await psaApiService.GetCurrent();

                List<Employee> employeesToLoad;

                if (startIndex > -1 && count > 0)
                {
                    employeesToLoad = currentEmployees.GoodEmployees.GetRange(startIndex, count);
                }
                else
                {
                    employeesToLoad = currentEmployees.GoodEmployees;
                }

                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromJson,
                    employeesToLoad
                );

                emailService.SendTaskResultEmail(taskResult);

                return Ok(taskResult.GoodEmployees);
            }
            catch (Exception exception)
            {
                emailService.SendFailureEmail(TaskEnum.ParsePsa, exception);

                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.ParsePsa,
                    exception,
                    logger
                );
            }
        }

        // EmployeesFromJson: Given (incomplete) Employees in JSON format (as
        // obtained, for instance, from the PSA API), reconcile those employees
        // with the "proper" ESA employees in the database. Does NOT refresh
        // employee statuses or deal with any exiting employees.
        // POST: api/Employees/FromJson
        [HttpPost("FromJson")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromJson(List<Employee> employees)
        {
            try
            {
                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromJson,
                    employees
                );

                emailService.SendTaskResultEmail(taskResult);

                return Ok(taskResult.GoodEmployees);
            }
            catch (Exception e)
            {
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.LoadFromJson,
                    e,
                    logger
                );
            }
        }

        // EmployeesFromCsv: Given the raw text of the PSA CSV extract (as
        // obtained, for instance, from the PSA CSV file drop), transform it
        // into an array of nicely-formatted Employee JSON objects, then
        // reconcile each of those Employees. Does NOT refresh employee
        // statuses or deal with any exiting employees.
        // POST: api/Employees/FromCsv
        [HttpPost("FromCsv")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCsv()
        {
            try
            {
                // Get a list of candidate Employee objects based on the CSV.
                var readResult = await csvService.ProcessCsvAndLog(Request);

                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromCsv,
                    readResult.GoodEmployees
                );

                emailService.SendTaskResultEmail(taskResult);

                return Ok(taskResult.GoodEmployees);
            }
            catch (Exception e)
            {
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.LoadFromCsv,
                    e,
                    logger
                );
            }
        }

        [HttpPost("RefreshEmployeeStatus")]
        public async Task<ActionResult> RefreshEmployeeStatus()
        {
            try
            {
                // Update existing employee statuses.
                var taskResult = await employeeReconciler.UpdateEmployeeStatusesAndLog();

                emailService.SendTaskResultEmail(taskResult);

                return Ok();
            }
            catch (Exception e)
            {
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.RefreshStatuses,
                    e,
                    logger
                );
            }
        }

        [AllowAnonymous]
        [HttpPost("ScheduledLoadAndUpdate")]
        public async Task<ActionResult> ScheduledLoadAndUpdate(int startIndex, int count)
        {
            try
            {
                // Step 1. Update existing employee statuses.
                await RefreshEmployeeStatus();

                // Step 2. Obtain the employees from the PSA API.
                var result = await EmployeesFromPsaApi(startIndex, count);

                var employees = (result.Result as ObjectResult).Value as List<Employee>;

                // Step 3. Refresh again.
                await RefreshEmployeeStatus();

                // Step 4. For all ACTIVE users in the DB who are NOT in the
                // data set, set them to Not Exiting, IF they are not in a final
                // state. Also updates CallWeb. This applies to employees who
                // have dropped off the data list because they're not actually
                // leaving their employment.
                await employeeReconciler.UpdateNotExitingAndLog(employees);

                await logger.LogSuccess(
                    TaskEnum.ScheduledTask,
                    "Scheduled load and update ran successfully."
                );

                return Ok();
            }
            catch (Exception e)
            {
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.ScheduledTask,
                    e,
                    logger
                );
            }
        }

        private bool EmployeeExists(int id)
        {
            return context.Employees.Any(e => e.Id == id);
        }

        private async Task<Employee> FindById(int id)
        {
            var employee = await context.Employees
                .Include(e => e.TimelineEntries)
                .FirstOrDefaultAsync(i => i.Id == id);

            return employee;
        }
    }
}
