using System;
using System.Linq;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
{


    public class TaskResult<T>
    {

        private static string NEW_LINE = System.Environment.NewLine;

        public TaskResult()
        {
            this.Succeeded = new List<T>();
            this.Failed = new List<T>();
            this.Exceptions = new List<Exception>();
        }

        public TaskResult(List<T> succeeded, List<T> failed, List<Exception> exceptions)
        {
            this.Succeeded = succeeded;
            this.Failed = failed;
            this.Exceptions = exceptions;
        }

        public List<T> Succeeded { get; set; }
        public List<T> Failed { get; set; }
        public List<Exception> Exceptions { get; set; }

        public int SucceededCount
        {
            get { return Succeeded.Count; }
        }

        public int FailedCount
        {
            get { return Failed.Count; }
        }

        public int ExceptionCount
        {
            get { return Exceptions.Count; }
        }

        public List<string> ExceptionMessages
        {
            get { return Exceptions.Select(ex => ex.Message).ToList(); }
        }

        public int TotalRecordCount
        {
            get { return SucceededCount + FailedCount; }
        }

        public bool HasExceptions
        {
            get { return (ExceptionCount > 0); }
        }

        public void AddSucceeded(T succeeded)
        {
            this.Succeeded.Add(succeeded);
        }

        public void AddSucceeded(IEnumerable<T> succeeded)
        {
            this.Succeeded.AddRange(succeeded);
        }

        public void AddFailed(T failed)
        {
            this.Failed.Add(failed);
        }

        public void AddFailed(IEnumerable<T> failed)
        {
            this.Failed.AddRange(failed);
        }

        public void AddException(Exception exception)
        {
            this.Exceptions.Add(exception);
        }

        public void AddExceptions(IEnumerable<Exception> exceptions)
        {
            this.Exceptions.AddRange(exceptions);
        }

        public void AddFailedWithException(T failed, Exception exception)
        {
            this.Failed.Add(failed);
            this.Exceptions.Add(exception);
        }

        public List<T> AddIncremental(TaskResult<T> otherTaskResult)
        {
            this.CopyFailedAndExceptionsFrom(otherTaskResult);
            return otherTaskResult.Succeeded;
        }

        public void AddFinal(TaskResult<T> otherTaskResult)
        {
            this.CopyFrom(otherTaskResult);
        }

        public void CopyFailedAndExceptionsFrom(TaskResult<T> otherTaskResult)
        {
            this.AddFailed(otherTaskResult.Failed);
            this.AddExceptions(otherTaskResult.Exceptions);
        }

        public void CopyFrom(TaskResult<T> otherTaskResult)
        {
            this.AddSucceeded(otherTaskResult.Succeeded);
            this.AddFailed(otherTaskResult.Failed);
            this.AddExceptions(otherTaskResult.Exceptions);
        }

        // public string Message
        // {
        //     get
        //     {
        //         var message =
        //             $"Tried to {this.TaskVerb} "
        //             + $"{this.CandidateEmployeesCount} "
        //             + $"{this.TaskObjectNoun}. "
        //             + $"{this.GoodRecordCount} were successful. ";

        //         if (this.HasExceptions)
        //         {
        //             // There were exceptions. Add to the text.
        //             message +=
        //                 $"There were {this.ExceptionCount} errors: "
        //                 + $"{string.Join(NEW_LINE, this.Exceptions)} ";
        //         }

        //         return message;
        //     }
        // }
    }
}
