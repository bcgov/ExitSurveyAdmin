using ExitSurveyAdmin.Models;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class LoggingService
    {
        // Read a local file from the project.
        public async static Task<TaskLogEntry> Log(
            ExitSurveyAdminContext context,
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

        public static Task<TaskLogEntry> LogSuccess(
            ExitSurveyAdminContext context,
            TaskEnum task, string comment
        )
        {
            return Log(context, task, TaskOutcomeEnum.Success, comment);
        }

        public static Task<TaskLogEntry> LogWarning(
            ExitSurveyAdminContext context,
            TaskEnum task, string comment
        )
        {
            return Log(context, task, TaskOutcomeEnum.Warn, comment);
        }

        public static Task<TaskLogEntry> LogFailure(
            ExitSurveyAdminContext context,
            TaskEnum task, string comment
        )
        {
            return Log(context, task, TaskOutcomeEnum.Fail, comment);
        }
    }
}