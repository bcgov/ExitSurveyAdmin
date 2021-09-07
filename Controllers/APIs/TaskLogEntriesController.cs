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
using Microsoft.AspNetCore.Authorization;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskLogEntriesController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext context;
        private readonly SieveProcessor SieveProcessor;

        public TaskLogEntriesController(
            ExitSurveyAdminContext context,
            SieveProcessor sieveProcessor
        )
        ***REMOVED***
            this.context = context;
            SieveProcessor = sieveProcessor;
      ***REMOVED***

        // GET: api/TaskLogEntries
        [HttpGet]
        public async Task<ActionResult<IList<TaskLogEntry>>> GetTaskLogEntries(
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

            // Task log entry query.
            var taskLogEntries = context.TaskLogEntries
                .AsNoTracking()
                .Include(tle => tle.Task)
                .Include(tle => tle.TaskOutcome);

            var sievedTaskLogEntries = await SieveProcessor
                .GetPagedAsync(taskLogEntries, sieveModel);
            Response.Headers.Add("X-Pagination", sievedTaskLogEntries
                .SerializeMetadataToJson());

            return Ok(sievedTaskLogEntries.Results);
      ***REMOVED***

        // GET: api/TaskLogEntries/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<TaskLogEntry>> GetTaskLogEntry(int id)
        ***REMOVED***
            var taskLogEntry = await context.TaskLogEntries
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
            context.TaskLogEntries.Add(taskLogEntry);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskLogEntry), new ***REMOVED*** id = taskLogEntry.Id ***REMOVED***, taskLogEntry);
      ***REMOVED***

        private bool TaskLogEntryExists(int id)
        ***REMOVED***
            return context.TaskLogEntries.Any(e => e.Id == id);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
