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
{
    [Authorize(Roles = "exitsurveyadmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskLogEntriesController : ControllerBase
    {
        private readonly ExitSurveyAdminContext context;
        private readonly SieveProcessor SieveProcessor;

        public TaskLogEntriesController(
            ExitSurveyAdminContext context,
            SieveProcessor sieveProcessor
        )
        {
            this.context = context;
            SieveProcessor = sieveProcessor;
        }

        // GET: api/TaskLogEntries
        [HttpGet]
        public async Task<ActionResult<IList<TaskLogEntry>>> GetTaskLogEntries(
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
        }

        // GET: api/TaskLogEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskLogEntry>> GetTaskLogEntry(int id)
        {
            var taskLogEntry = await context.TaskLogEntries
                    .Include(tle => tle.Task)
                    .Include(tle => tle.TaskOutcome)
                    .FirstOrDefaultAsync(tle => tle.Id == id);

            if (taskLogEntry == null)
            {
                return NotFound();
            }

            return taskLogEntry;
        }

        // POST: api/TaskLogEntries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TaskLogEntry>> PostTaskLogEntry(TaskLogEntry taskLogEntry)
        {
            // TODO: Do proper validation here.
            context.TaskLogEntries.Add(taskLogEntry);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskLogEntry), new { id = taskLogEntry.Id }, taskLogEntry);
        }

        private bool TaskLogEntryExists(int id)
        {
            return context.TaskLogEntries.Any(e => e.Id == id);
        }
    }
}
