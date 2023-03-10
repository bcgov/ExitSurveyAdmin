using ExitSurveyAdmin.Models;

using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
{
    public class GenericTaskResult<E>
    {
        private static string NEW_LINE = System.Environment.NewLine;

        public GenericTaskResult(TaskEnum task)
        {
            this.Task = task;
            this.CandidateCount = 0;
            this.IgnoredCount = 0;
            this.Succeeded = new List<E>();
            this.Exceptions = new List<string>();
        }

        public GenericTaskResult(
            TaskEnum task,
            int candidateCount,
            int ignoredCount,
            List<E> succeeded,
            List<string> exceptions
        )
        {
            this.Task = task;
            this.CandidateCount = candidateCount;
            this.IgnoredCount = ignoredCount;
            this.Succeeded = succeeded;
            this.Exceptions = exceptions;
        }

        public void AddTaskResult(TaskResult<E> taskResult)
        {
            this.CandidateCount += taskResult.TotalRecordCount;
            this.IgnoredCount += taskResult.IgnoredCount;
            this.Succeeded.AddRange(taskResult.Succeeded);
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
        }

        // The same idea as the similarly-named method on TaskResult: copy
        // any failures + ignores from the TaskResult, while returning a list of
        // successes to perform additional steps on.
        public List<T> AddIncrementalStep<T>(TaskResult<T> taskResult)
        {
            this.IgnoredCount += taskResult.IgnoredCount;
            this.CandidateCount += taskResult.FailedCount + taskResult.IgnoredCount;
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
            return taskResult.Succeeded;
        }

        // The same idea as the similarly-named method on TaskResult: copy
        // all successes and failures from the TaskResult.
        public void AddFinalStep(TaskResult<E> taskResult)
        {
            this.IgnoredCount += taskResult.IgnoredCount;
            this.CandidateCount += taskResult.TotalRecordCount;
            this.Succeeded.AddRange(taskResult.Succeeded);
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
        }

        public string TaskVerb
        {
            get { return this.Task.Verb; }
        }

        public string TaskObjectNoun
        {
            get { return this.Task.ObjectNoun; }
        }

        public TaskEnum Task { get; set; }

        public int IgnoredCount { get; set; }

        public int CandidateCount { get; set; }

        public List<E> Succeeded { get; set; }

        public List<string> Exceptions { get; set; }

        public int SucceededCount
        {
            get { return Succeeded.Count; }
        }

        public int ExceptionCount
        {
            get { return Exceptions.Count; }
        }

        public bool HasExceptions
        {
            get { return (ExceptionCount > 0); }
        }

        public TaskOutcomeEnum TaskOutcome
        {
            get { return this.HasExceptions ? TaskOutcomeEnum.Warn : TaskOutcomeEnum.Success; }
        }

        public string Message
        {
            get
            {
                var message =
                    $"Tried to {this.TaskVerb} "
                    + $"{this.CandidateCount} "
                    + $"{this.TaskObjectNoun}. ";

                if (this.IgnoredCount > 0)
                {
                    message += $"{this.IgnoredCount} were checked, but did not need processing. ";
                }

                if (this.SucceededCount > 0 || this.HasExceptions)
                {
                    message += $"{this.SucceededCount} were successful. ";
                }

                if (this.HasExceptions)
                {
                    // There were exceptions. Add to the text.
                    message +=
                        $"There were {this.ExceptionCount} errors: "
                        + $"{string.Join(NEW_LINE, this.Exceptions)} ";
                }

                return message;
            }
        }
    }
}
