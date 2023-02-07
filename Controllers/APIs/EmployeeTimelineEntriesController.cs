using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Authorize(Policy = "UserRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeTimelineEntriesController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext context;

        public EmployeeTimelineEntriesController(ExitSurveyAdminContext context)
        ***REMOVED***
            this.context = context;
      ***REMOVED***

        // GET: api/EmployeeTimelineEntries
        [HttpGet]
        public async Task<
            ActionResult<IEnumerable<EmployeeTimelineEntry>>
        > GetEmployeeTimelineEntries()
        ***REMOVED***
            return await context.EmployeeTimelineEntries
                .Include(ete => ete.EmployeeAction)
                .Include(ete => ete.EmployeeStatus)
                .ToListAsync();
      ***REMOVED***

        // GET: api/EmployeeTimelineEntries/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<EmployeeTimelineEntry>> GetEmployeeTimelineEntry(int id)
        ***REMOVED***
            var employeeTimelineEntry = await context.EmployeeTimelineEntries
                .Include(ete => ete.EmployeeAction)
                .Include(ete => ete.EmployeeStatus)
                .FirstOrDefaultAsync(ete => ete.Id == id);

            if (employeeTimelineEntry == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            return employeeTimelineEntry;
      ***REMOVED***

        // POST: api/EmployeeTimelineEntries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<EmployeeTimelineEntry>> PostEmployeeTimelineEntry(
            EmployeeTimelineEntry employeeTimelineEntry
        )
        ***REMOVED***
            // TODO: Do proper validation here.
            context.EmployeeTimelineEntries.Add(employeeTimelineEntry);
            await context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetEmployeeTimelineEntry),
                new ***REMOVED*** id = employeeTimelineEntry.Id ***REMOVED***,
                employeeTimelineEntry
            );
      ***REMOVED***

        private bool EmployeeTimelineEntryExists(int id)
        ***REMOVED***
            return context.EmployeeTimelineEntries.Any(e => e.Id == id);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
