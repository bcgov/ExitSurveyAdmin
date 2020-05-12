using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Sieve.Services;
using Sieve.Models;
using static ISieveProcessorExtensions;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext Context;
        private readonly SieveProcessor SieveProcessor;
        private readonly EmployeeInfoLookupService EmployeeInfoLookup;
        private readonly EmployeeReconciliationService EmployeeReconciler;

        public EmployeesController(
            ExitSurveyAdminContext context,
            SieveProcessor sieveProcessor,
            EmployeeInfoLookupService employeeInfoLookup,
            EmployeeReconciliationService employeeReconciler
        )
        ***REMOVED***
            Context = context;
            SieveProcessor = sieveProcessor;
            EmployeeInfoLookup = employeeInfoLookup;
            EmployeeReconciler = employeeReconciler;
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
            var employees = Context.Employees
                .AsNoTracking()
                .Include(e => e.TimelineEntries);

            var sievedEmployees = await SieveProcessor.GetPagedAsync(employees, sieveModel);
            Response.Headers.Add("X-Pagination", sievedEmployees.SerializeMetadataToJson());

            return Ok(sievedEmployees.Results);
      ***REMOVED***

        // GET: api/Employees/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        ***REMOVED***
            var employee = await Context.Employees
                .Include(e => e.TimelineEntries)
                .FirstOrDefaultAsync(i => i.Id == id);

            var email = EmployeeInfoLookup
                .EmailByEmployeeId(employee.GovernmentEmployeeId);

            if (employee == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            return employee;
      ***REMOVED***

        // PUT: api/Employees/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("***REMOVED***id***REMOVED***")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        ***REMOVED***
            if (id != employee.Id)
            ***REMOVED***
                return BadRequest();
          ***REMOVED***

            try
            ***REMOVED***
                Employee updatedEmployee = await EmployeeReconciler
                    .ReconcileEmployee(Context, employee);
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

            return NoContent();
      ***REMOVED***

        // POST: api/Employees
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        ***REMOVED***
            Employee newEmployee = await EmployeeReconciler
                .ReconcileEmployee(Context, employee);

            return CreatedAtAction(nameof(GetEmployee), new ***REMOVED*** id = newEmployee.Id ***REMOVED***, newEmployee);
      ***REMOVED***

        // DELETE: api/Employees/5
        [HttpDelete("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        ***REMOVED***
            var employee = await Context.Employees.FindAsync(id);
            if (employee == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            Context.Employees.Remove(employee);
            await Context.SaveChangesAsync();

            return employee;
      ***REMOVED***

        private bool EmployeeExists(int id)
        ***REMOVED***
            return Context.Employees.Any(e => e.Id == id);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
