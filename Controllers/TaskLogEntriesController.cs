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
    public class TaskLogEntriesController : ControllerBase
    {
        private readonly ExitSurveyAdminContext _context;

        public TaskLogEntriesController(ExitSurveyAdminContext context)
        {
            _context = context;
        }

        // GET: api/TaskLogEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskLogEntry>>> GetTaskLogEntries()
        {
            return await _context.TaskLogEntries
                .Include(tle => tle.Task)
                .Include(tle => tle.TaskOutcome)
                .ToListAsync();
        }

        // GET: api/TaskLogEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskLogEntry>> GetTaskLogEntry(string id)
        {
            var taskLogEntry = await _context.TaskLogEntries
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
            _context.TaskLogEntries.Add(taskLogEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskLogEntry), new { id = taskLogEntry.Id }, taskLogEntry);
        }

        private bool TaskLogEntryExists(string id)
        {
            return _context.TaskLogEntries.Any(e => e.Id == id);
        }
    }
}
