using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext _context;

        public EmployeesController(ExitSurveyAdminContext context)
        ***REMOVED***
            _context = context;
      ***REMOVED***

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        ***REMOVED***
            return await _context.Employees
                .Include(e => e.TimelineEntries)
                .ToListAsync();
      ***REMOVED***

        // GET: api/Employees/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        ***REMOVED***
            var employee = await _context.Employees
                .Include(e => e.TimelineEntries)
                .FirstOrDefaultAsync(i => i.Id == id);

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

            _context.Entry(employee).State = EntityState.Modified;

            try
            ***REMOVED***
                await _context.SaveChangesAsync();
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
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new ***REMOVED*** id = employee.Id ***REMOVED***, employee);
      ***REMOVED***

        // DELETE: api/Employees/5
        [HttpDelete("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        ***REMOVED***
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
      ***REMOVED***

        private bool EmployeeExists(int id)
        ***REMOVED***
            return _context.Employees.Any(e => e.Id == id);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
