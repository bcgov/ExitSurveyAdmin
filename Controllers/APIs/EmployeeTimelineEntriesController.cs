using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeTimelineEntriesController : ControllerBase
    {
        private readonly ExitSurveyAdminContext _context;

        public EmployeeTimelineEntriesController(ExitSurveyAdminContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeTimelineEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeTimelineEntry>>> GetEmployeeTimelineEntries()
        {
            return await _context.EmployeeTimelineEntries
                .Include(ete => ete.EmployeeAction)
                .Include(ete => ete.EmployeeStatus)
                .ToListAsync();
        }

        // GET: api/EmployeeTimelineEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeTimelineEntry>> GetEmployeeTimelineEntry(string id)
        {
            var employeeTimelineEntry = await _context.EmployeeTimelineEntries
                    .Include(ete => ete.EmployeeAction)
                    .Include(ete => ete.EmployeeStatus)
                    .FirstOrDefaultAsync(ete => ete.Id == id);

            if (employeeTimelineEntry == null)
            {
                return NotFound();
            }

            return employeeTimelineEntry;
        }

        // POST: api/EmployeeTimelineEntries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<EmployeeTimelineEntry>> PostEmployeeTimelineEntry(EmployeeTimelineEntry employeeTimelineEntry)
        {
            // TODO: Do proper validation here.
            _context.EmployeeTimelineEntries.Add(employeeTimelineEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeeTimelineEntry), new { id = employeeTimelineEntry.Id }, employeeTimelineEntry);
        }

        private bool EmployeeTimelineEntryExists(string id)
        {
            return _context.EmployeeTimelineEntries.Any(e => e.Id == id);
        }
    }
}
