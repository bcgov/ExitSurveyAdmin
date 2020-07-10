using ExitSurveyAdmin.Models;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class LoggingService
    {
        private readonly ExitSurveyAdminContext context;

        public LoggingService(ExitSurveyAdminContext context)
        {
            this.context = context;
        }

        public async Task<TaskLogEntry> Log(
            TaskEnum task, TaskOutcomeEnum taskOutcome, string comment
        )
        {
            var entry = new TaskLogEntry()
            {
                TaskCode = task.Code,
                TaskOutcomeCode = taskOutcome.Code,
                Comment = comment
            };

            context.TaskLogEntries.Add(entry);
            await context.SaveChangesAsync();

            return entry;
        }

        public Task<TaskLogEntry> LogSuccess(TaskEnum task, string comment)
        {
            return Log(task, TaskOutcomeEnum.Success, comment);
        }

        public Task<TaskLogEntry> LogWarning(TaskEnum task, string comment)
        {
            return Log(task, TaskOutcomeEnum.Warn, comment);
        }

        public Task<TaskLogEntry> LogFailure(TaskEnum task, string comment)
        {
            return Log(task, TaskOutcomeEnum.Fail, comment);
        }
    }
}