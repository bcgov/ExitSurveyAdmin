using ExitSurveyAdmin.Models;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class LoggingService
    ***REMOVED***
        // Read a local file from the project.
        public async static Task<TaskLogEntry> Log(
            ExitSurveyAdminContext context,
            TaskEnum task, TaskOutcomeEnum taskOutcome, string comment
        )
        ***REMOVED***
            var entry = new TaskLogEntry()
            ***REMOVED***
                TaskCode = task.Code,
                TaskOutcomeCode = taskOutcome.Code,
                Comment = comment
          ***REMOVED***;

            context.TaskLogEntries.Add(entry);
            await context.SaveChangesAsync();

            return entry;
      ***REMOVED***

        public static Task<TaskLogEntry> LogSuccess(
            ExitSurveyAdminContext context,
            TaskEnum task, string comment
        )
        ***REMOVED***
            return Log(context, task, TaskOutcomeEnum.Success, comment);
      ***REMOVED***

        public static Task<TaskLogEntry> LogWarning(
            ExitSurveyAdminContext context,
            TaskEnum task, string comment
        )
        ***REMOVED***
            return Log(context, task, TaskOutcomeEnum.Warn, comment);
      ***REMOVED***

        public static Task<TaskLogEntry> LogFailure(
            ExitSurveyAdminContext context,
            TaskEnum task, string comment
        )
        ***REMOVED***
            return Log(context, task, TaskOutcomeEnum.Fail, comment);
      ***REMOVED***
  ***REMOVED***
***REMOVED***