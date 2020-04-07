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
    public class TaskLogEntriesController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext _context;

        public TaskLogEntriesController(ExitSurveyAdminContext context)
        ***REMOVED***
            _context = context;
      ***REMOVED***

        // GET: api/TaskLogEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskLogEntry>>> GetTaskLogEntries()
        ***REMOVED***
            return await _context.TaskLogEntries
                .Include(tle => tle.Task)
                .Include(tle => tle.TaskOutcome)
                .ToListAsync();
      ***REMOVED***

        // GET: api/TaskLogEntries/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<TaskLogEntry>> GetTaskLogEntry(int id)
        ***REMOVED***
            var taskLogEntry = await _context.TaskLogEntries
                    .Include(tle => tle.Task)
                    .Include(tle => tle.TaskOutcome)
                    .FirstOrDefaultAsync(tle => tle.Id == id);

            if (taskLogEntry == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            return taskLogEntry;
      ***REMOVED***

        // POST: api/TaskLogEntries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TaskLogEntry>> PostTaskLogEntry(TaskLogEntry taskLogEntry)
        ***REMOVED***
            // TODO: Do proper validation here.
            _context.TaskLogEntries.Add(taskLogEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskLogEntry), new ***REMOVED*** id = taskLogEntry.Id ***REMOVED***, taskLogEntry);
      ***REMOVED***

        private bool TaskLogEntryExists(int id)
        ***REMOVED***
            return _context.TaskLogEntries.Any(e => e.Id == id);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
