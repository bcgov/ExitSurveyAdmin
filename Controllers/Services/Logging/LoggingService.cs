using ExitSurveyAdmin.Models;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class LoggingService
    ***REMOVED***
        private readonly ExitSurveyAdminContext context;

        public LoggingService(ExitSurveyAdminContext context)
        ***REMOVED***
            this.context = context;
      ***REMOVED***

        public async Task<TaskLogEntry> Log(
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

        public Task<TaskLogEntry> LogSuccess(TaskEnum task, string comment)
        ***REMOVED***
            return Log(task, TaskOutcomeEnum.Success, comment);
      ***REMOVED***

        public Task<TaskLogEntry> LogWarning(TaskEnum task, string comment)
        ***REMOVED***
            return Log(task, TaskOutcomeEnum.Warn, comment);
      ***REMOVED***

        public Task<TaskLogEntry> LogFailure(TaskEnum task, string comment)
        ***REMOVED***
            return Log(task, TaskOutcomeEnum.Fail, comment);
      ***REMOVED***
  ***REMOVED***
***REMOVED***