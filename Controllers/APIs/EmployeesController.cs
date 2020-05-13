using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
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
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
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
        {
            Context = context;
            SieveProcessor = sieveProcessor;
            EmployeeInfoLookup = employeeInfoLookup;
            EmployeeReconciler = employeeReconciler;
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
            var employees = Context.Employees
                .AsNoTracking()
                .Include(e => e.TimelineEntries);

            var sievedEmployees = await SieveProcessor.GetPagedAsync(employees, sieveModel);
            Response.Headers.Add("X-Pagination", sievedEmployees.SerializeMetadataToJson());

            return Ok(sievedEmployees.Results);
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await Context.Employees
                .Include(e => e.TimelineEntries)
                .FirstOrDefaultAsync(i => i.Id == id);

            var email = EmployeeInfoLookup
                .EmailByEmployeeId(employee.GovernmentEmployeeId);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            try
            {
                Employee updatedEmployee = await EmployeeReconciler
                    .ReconcileEmployee(Context, employee);
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

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            Employee newEmployee = await EmployeeReconciler
                .ReconcileEmployee(Context, employee);

            return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await Context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            Context.Employees.Remove(employee);
            await Context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return Context.Employees.Any(e => e.Id == id);
        }
    }
}
