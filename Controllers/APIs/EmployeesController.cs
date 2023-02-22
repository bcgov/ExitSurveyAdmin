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
using Microsoft.AspNetCore.Authorization;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Authorize(Policy = "UserRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    ***REMOVED***
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
        ***REMOVED***
            this.context = context;
            this.sieveProcessor = sieveProcessor;
            this.employeeInfoLookup = employeeInfoLookup;
            this.employeeReconciler = employeeReconciler;
            this.callWebService = callWebService;
            this.logger = loggingService;
            this.emailService = emailService;
            this.csvService = csvService;
            this.psaApiService = psaApiService;
      ***REMOVED***

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IList<Employee>>> GetEmployees(
            [FromQuery] SieveModel sieveModel
        )
        ***REMOVED***
            // Validate the page size and page.
            if (sieveModel.PageSize < 1)
            ***REMOVED***
                throw new ArgumentOutOfRangeException("Page size must be >= 1.");
          ***REMOVED***
            if (sieveModel.Page < 1)
            ***REMOVED***
                throw new ArgumentOutOfRangeException("Page must be >= 1.");
          ***REMOVED***

            // Employee query.
            var employees = context.Employees.AsNoTracking().Include(e => e.TimelineEntries);

            var sievedEmployees = await sieveProcessor.GetPagedAsync(employees, sieveModel);

            Response.Headers.Add("X-Pagination", sievedEmployees.SerializeMetadataToJson());

            return Ok(sievedEmployees.Results);
      ***REMOVED***

        // GET: api/Employees/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        ***REMOVED***
            var employee = await FindById(id);

            if (employee == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            return employee;
      ***REMOVED***

        // PATCH: api/Employees/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("***REMOVED***id***REMOVED***")]
        public async Task<IActionResult> PatchEmployee(int id, EmployeePatchDto employeePatchDto)
        ***REMOVED***
            var existingEmployee = await FindById(id);

            var updatedEmployee = employeePatchDto.ApplyPatch(existingEmployee);

            context.Entry(updatedEmployee).State = EntityState.Modified;

            try
            ***REMOVED***
                await context.SaveChangesAsync();

                // Patch the row in CallWeb.
                await callWebService.UpdateSurvey(updatedEmployee);

                return Ok(updatedEmployee);
          ***REMOVED***
            catch (DbUpdateConcurrencyException)
            ***REMOVED***
                if (!EmployeeExists(id))
                ***REMOVED***
                    return NotFound();
              ***REMOVED***
                else
                ***REMOVED***
                    throw;
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***

        // POST: api/Employees
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        ***REMOVED***
            Employee newEmployee = await employeeReconciler.ReconcileEmployee(employee);

            return CreatedAtAction(nameof(GetEmployee), new ***REMOVED*** id = newEmployee.Id ***REMOVED***, newEmployee);
      ***REMOVED***

        // EmployeesFromPsaApi: Load employees from the PSA API and immediately
        // try to reconcile them.
        // POST: api/Employees/FromPsaApi
        [HttpPost("FromPsaApi")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromPsaApi(
            int startIndex,
            int count
        )
        ***REMOVED***
            try
            ***REMOVED***
                // Get a list of candidate Employee objects based on the PSA
                // API. They will be in JSON format.
                var currentEmployees = await psaApiService.GetCurrent();

                List<Employee> employeesToLoad;

                if (startIndex > -1 && count > 0)
                ***REMOVED***
                    // TODO: Validate.
                    employeesToLoad = currentEmployees.GoodEmployees.GetRange(startIndex, count);
              ***REMOVED***
                else
                ***REMOVED***
                    employeesToLoad = currentEmployees.GoodEmployees;
              ***REMOVED***

                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromJson,
                    employeesToLoad
                );

                emailService.SendTaskResultEmail(taskResult);

                return Ok(taskResult.GoodEmployees);
          ***REMOVED***
            catch (Exception exception)
            ***REMOVED***
                // TODO: Restore this
                // emailService.SendFailureEmail(TaskEnum.ParsePsa, exception);

                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.ParsePsa,
                    exception,
                    logger
                );
          ***REMOVED***
      ***REMOVED***

        // EmployeesFromJson: Given incomplete Employees in JSON format (as
        // obtained, for instance, from the PSA API), reconcile those employees.
        // POST: api/Employees/FromJson
        [HttpPost("FromJson")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromJson(List<Employee> employees)
        ***REMOVED***
            try
            ***REMOVED***
                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromJson,
                    employees
                );
                return Ok(taskResult.GoodEmployees);
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.LoadFromJson,
                    e,
                    logger
                );
          ***REMOVED***
      ***REMOVED***

        // EmployeesFromCsv: Given the raw text of the PSA CSV extract (as
        // obtained, for instance, from the PSA CSV file drop), transform it
        // into an array of nicely-formatted Employee JSON objects, then
        // reconcile each of those Employees.
        // POST: api/Employees/FromCsv
        [HttpPost("FromCsv")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCsv()
        ***REMOVED***
            try
            ***REMOVED***
                // Get a list of candidate Employee objects based on the CSV.
                var readResult = await csvService.ProcessCsvAndLog(Request);

                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromCsv,
                    readResult.GoodEmployees
                );
                return Ok(taskResult.GoodEmployees);
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.LoadFromCsv,
                    e,
                    logger
                );
          ***REMOVED***
      ***REMOVED***

        // New; inappropriately included
        // [HttpPost("RefreshEmployeeStatus")]
        // public async Task<ActionResult> RefreshEmployeeStatus()
        // ***REMOVED***
        //     try
        //     ***REMOVED***
        //         // Update existing employee statuses.
        //         var taskResult = await employeeReconciler.UpdateEmployeeStatusesAndLog();

        //         return Ok();
        //   ***REMOVED***
        //     catch (Exception e)
        //     ***REMOVED***
        //         return await ApiResponseHelper.LogFailureAndSendStacktrace(
        //             this,
        //             TaskEnum.RefreshStatuses,
        //             e,
        //             logger
        //         );
        //   ***REMOVED***
        // ***REMOVED***

        [HttpPost("RefreshEmployeeStatus")]
        public async Task<ActionResult> RefreshEmployeeStatus()
        ***REMOVED***
            try
            ***REMOVED***
                // Update existing employee statuses.
                await employeeReconciler.UpdateEmployeeStatuses();

                await logger.LogSuccess(
                    TaskEnum.RefreshStatuses,
                    $"Manually-triggered refresh of employee statuses."
                );
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                await logger.LogFailure(
                    TaskEnum.ReconcileCsv,
                    $"Error refreshing employee statuses. Stacktrace:\r\n" + e.StackTrace
                );
          ***REMOVED***

            return Ok();
      ***REMOVED***

        [AllowAnonymous]
        [HttpPost("ScheduledLoadAndUpdate")]
        public async Task<ActionResult> ScheduledLoadAndUpdate(int startIndex, int count)
        ***REMOVED***
            try
            ***REMOVED***
                // In all cases, update existing employee statuses.
                // TODO: Restore this!
                // await RefreshEmployeeStatus();

                // No matter the day, pull employee data.
                await EmployeesFromPsaApi(startIndex, count);

                await logger.LogSuccess(
                    TaskEnum.ScheduledTask,
                    "Scheduled load and update ran successfully."
                );

                return Ok();
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.ScheduledTask,
                    e,
                    logger
                );
          ***REMOVED***
      ***REMOVED***

        private bool EmployeeExists(int id)
        ***REMOVED***
            return context.Employees.Any(e => e.Id == id);
      ***REMOVED***

        private async Task<Employee> FindById(int id)
        ***REMOVED***
            var employee = await context.Employees
                .Include(e => e.TimelineEntries)
                .FirstOrDefaultAsync(i => i.Id == id);

            return employee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
