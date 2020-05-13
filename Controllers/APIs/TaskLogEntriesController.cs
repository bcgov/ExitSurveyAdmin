using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskLogEntriesController : ControllerBase
    {
        private readonly ExitSurveyAdminContext context;

        public TaskLogEntriesController(ExitSurveyAdminContext context)
        {
            this.context = context;
        }

        // GET: api/TaskLogEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskLogEntry>>> GetTaskLogEntries()
        {
            return await context.TaskLogEntries
                .Include(tle => tle.Task)
                .Include(tle => tle.TaskOutcome)
                .ToListAsync();
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
