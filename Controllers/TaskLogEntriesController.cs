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
            return await _context.TaskLogEntries.ToListAsync();
        }

        // GET: api/TaskLogEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskLogEntry>> GetTaskLogEntry(string id)
        {
            var taskLogEntry = await _context.TaskLogEntries.FindAsync(id);

            if (taskLogEntry == null)
            {
                return NotFound();
            }

            return taskLogEntry;
        }

        // Disable PUT. We won't ever want to update a task log entry.
        // PUT: api/TaskLogEntries/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutTaskLogEntry(string id, TaskLogEntry taskLogEntry)
        // {
        //     if (id != taskLogEntry.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(taskLogEntry).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!TaskLogEntryExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // POST: api/TaskLogEntries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TaskLogEntry>> PostTaskLogEntry(TaskLogEntry taskLogEntry)
        {
            _context.TaskLogEntries.Add(taskLogEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskLogEntry), new { id = taskLogEntry.Id }, taskLogEntry);
        }

        // Disable DELETE. We don't want to delete TaskLogEntries.
        // DELETE: api/TaskLogEntries/5
        // [HttpDelete("{id}")]
        // public async Task<ActionResult<TaskLogEntry>> DeleteTaskLogEntry(string id)
        // {
        //     var taskLogEntry = await _context.TaskLogEntries.FindAsync(id);
        //     if (taskLogEntry == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.TaskLogEntries.Remove(taskLogEntry);
        //     await _context.SaveChangesAsync();

        //     return taskLogEntry;
        // }

        private bool TaskLogEntryExists(string id)
        {
            return _context.TaskLogEntries.Any(e => e.Id == id);
        }
    }
}
