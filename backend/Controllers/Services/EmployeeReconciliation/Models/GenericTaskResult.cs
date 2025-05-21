using ExitSurveyAdmin.Models;

using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class GenericTaskResult<E>
    ***REMOVED***
        private static string NEW_LINE = System.Environment.NewLine;

        public GenericTaskResult(TaskEnum task)
        ***REMOVED***
            this.Task = task;
            this.CandidateCount = 0;
            this.IgnoredCount = 0;
            this.Succeeded = new List<E>();
            this.Exceptions = new List<string>();
      ***REMOVED***

        public GenericTaskResult(
            TaskEnum task,
            int candidateCount,
            int ignoredCount,
            List<E> succeeded,
            List<string> exceptions
        )
        ***REMOVED***
            this.Task = task;
            this.CandidateCount = candidateCount;
            this.IgnoredCount = ignoredCount;
            this.Succeeded = succeeded;
            this.Exceptions = exceptions;
      ***REMOVED***

        public void AddTaskResult(TaskResult<E> taskResult)
        ***REMOVED***
            this.CandidateCount += taskResult.TotalRecordCount;
            this.IgnoredCount += taskResult.IgnoredCount;
            this.Succeeded.AddRange(taskResult.Succeeded);
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
      ***REMOVED***

        // The same idea as the similarly-named method on TaskResult: copy
        // any failures + ignores from the TaskResult, while returning a list of
        // successes to perform additional steps on.
        public List<T> AddIncrementalStep<T>(TaskResult<T> taskResult)
        ***REMOVED***
            this.IgnoredCount += taskResult.IgnoredCount;
            this.CandidateCount += taskResult.FailedCount + taskResult.IgnoredCount;
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
            return taskResult.Succeeded;
      ***REMOVED***

        // The same idea as the similarly-named method on TaskResult: copy
        // all successes and failures from the TaskResult.
        public void AddFinalStep(TaskResult<E> taskResult)
        ***REMOVED***
            this.IgnoredCount += taskResult.IgnoredCount;
            this.CandidateCount += taskResult.TotalRecordCount;
            this.Succeeded.AddRange(taskResult.Succeeded);
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
      ***REMOVED***

        public string TaskVerb
        ***REMOVED***
            get ***REMOVED*** return this.Task.Verb; ***REMOVED***
      ***REMOVED***

        public string TaskObjectNoun
        ***REMOVED***
            get ***REMOVED*** return this.Task.ObjectNoun; ***REMOVED***
      ***REMOVED***

        public TaskEnum Task ***REMOVED*** get; set; ***REMOVED***

        public int IgnoredCount ***REMOVED*** get; set; ***REMOVED***

        public int CandidateCount ***REMOVED*** get; set; ***REMOVED***

        public List<E> Succeeded ***REMOVED*** get; set; ***REMOVED***

        public List<string> Exceptions ***REMOVED*** get; set; ***REMOVED***

        public int SucceededCount
        ***REMOVED***
            get ***REMOVED*** return Succeeded.Count; ***REMOVED***
      ***REMOVED***

        public int ExceptionCount
        ***REMOVED***
            get ***REMOVED*** return Exceptions.Count; ***REMOVED***
      ***REMOVED***

        public bool HasExceptions
        ***REMOVED***
            get ***REMOVED*** return (ExceptionCount > 0); ***REMOVED***
      ***REMOVED***

        public TaskOutcomeEnum TaskOutcome
        ***REMOVED***
            get ***REMOVED*** return this.HasExceptions ? TaskOutcomeEnum.Warn : TaskOutcomeEnum.Success; ***REMOVED***
      ***REMOVED***

        public string Message
        ***REMOVED***
            get
            ***REMOVED***
                var message =
                    $"Tried to ***REMOVED***this.TaskVerb***REMOVED*** "
                    + $"***REMOVED***this.CandidateCount***REMOVED*** "
                    + $"***REMOVED***this.TaskObjectNoun***REMOVED***. ";

                if (this.IgnoredCount > 0)
                ***REMOVED***
                    message += $"***REMOVED***this.IgnoredCount***REMOVED*** were checked, but did not need processing. ";
              ***REMOVED***

                if (this.SucceededCount > 0 || this.HasExceptions)
                ***REMOVED***
                    message += $"***REMOVED***this.SucceededCount***REMOVED*** were successful. ";
              ***REMOVED***

                if (this.HasExceptions)
                ***REMOVED***
                    // There were exceptions. Add to the text.
                    message +=
                        $"There were ***REMOVED***this.ExceptionCount***REMOVED*** errors: "
                        + $"***REMOVED***string.Join(NEW_LINE, this.Exceptions)***REMOVED*** ";
              ***REMOVED***

                return message;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
