using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CallWeb;
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
    [Authorize(Roles = "exitsurveyadmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext context;
        private readonly SieveProcessor SieveProcessor;
        private readonly EmployeeInfoLookupService EmployeeInfoLookup;
        private readonly EmployeeReconciliationService EmployeeReconciler;
        private readonly CallWebService callWebService;

        public EmployeesController(
            ExitSurveyAdminContext context,
            SieveProcessor sieveProcessor,
            EmployeeInfoLookupService employeeInfoLookup,
            EmployeeReconciliationService employeeReconciler,
            CallWebService callWebService
        )
        ***REMOVED***
            this.context = context;
            SieveProcessor = sieveProcessor;
            EmployeeInfoLookup = employeeInfoLookup;
            EmployeeReconciler = employeeReconciler;
            this.callWebService = callWebService;
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
            var employees = context.Employees
                .AsNoTracking()
                .Include(e => e.TimelineEntries);

            var sievedEmployees = await SieveProcessor
                .GetPagedAsync(employees, sieveModel);
            Response.Headers.Add("X-Pagination", sievedEmployees
                .SerializeMetadataToJson());

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

            var updatedEmployee = employeePatchDto
                .ApplyPatch(existingEmployee);

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
            Employee newEmployee = await EmployeeReconciler
                .ReconcileEmployee(employee);

            return CreatedAtAction(nameof(GetEmployee), new ***REMOVED*** id = newEmployee.Id ***REMOVED***, newEmployee);
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
