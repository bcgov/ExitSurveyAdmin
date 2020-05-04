using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Newtonsoft.Json;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ExitSurveyAdminContext _context;

        public EmployeesController(ExitSurveyAdminContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<PagedList<Employee>>> GetEmployees(
            int pageSize = 50, int page = 1
        )
        {
            if (pageSize < 1)
            {
                throw new ArgumentOutOfRangeException("Page size must be >= 1.");
            }
            if (page < 1)
            {
                throw new ArgumentOutOfRangeException("Page must be >= 1.");
            }

            var employees = _context.Employees
                .Include(e => e.TimelineEntries);
            // .Skip((page - 1) * pageSize)
            // .Take(pageSize)
            // .ToListAsync();

            var employeePage = PagedList<Employee>
                .ToPagedList(employees, page, pageSize);

            var metadata = new
            {
                employeePage.TotalCount,
                employeePage.PageSize,
                employeePage.CurrentPage,
                employeePage.TotalPages,
                employeePage.HasNext,
                employeePage.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            return employeePage;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.TimelineEntries)
                .FirstOrDefaultAsync(i => i.Id == id);

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
                Employee updatedEmployee = await EmployeeReconciliationService
                    .ReconcileEmployee(_context, employee);
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
            Employee newEmployee = await EmployeeReconciliationService
                .ReconcileEmployee(_context, employee);

            return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
