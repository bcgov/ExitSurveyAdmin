using System;
using System.Linq;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
***REMOVED***


    public class TaskResult<T>
    ***REMOVED***

        private static string NEW_LINE = System.Environment.NewLine;

        public TaskResult()
        ***REMOVED***
            this.Succeeded = new List<T>();
            this.Failed = new List<T>();
            this.Exceptions = new List<Exception>();
      ***REMOVED***

        public TaskResult(List<T> succeeded, List<T> failed, List<Exception> exceptions)
        ***REMOVED***
            this.Succeeded = succeeded;
            this.Failed = failed;
            this.Exceptions = exceptions;
      ***REMOVED***

        public List<T> Succeeded ***REMOVED*** get; set; ***REMOVED***
        public List<T> Failed ***REMOVED*** get; set; ***REMOVED***
        public List<Exception> Exceptions ***REMOVED*** get; set; ***REMOVED***

        public int SucceededCount
        ***REMOVED***
            get ***REMOVED*** return Succeeded.Count; ***REMOVED***
      ***REMOVED***

        public int FailedCount
        ***REMOVED***
            get ***REMOVED*** return Failed.Count; ***REMOVED***
      ***REMOVED***

        public int ExceptionCount
        ***REMOVED***
            get ***REMOVED*** return Exceptions.Count; ***REMOVED***
      ***REMOVED***

        public List<string> ExceptionMessages
        ***REMOVED***
            get ***REMOVED*** return Exceptions.Select(ex => ex.Message).ToList(); ***REMOVED***
      ***REMOVED***

        public int TotalRecordCount
        ***REMOVED***
            get ***REMOVED*** return SucceededCount + FailedCount; ***REMOVED***
      ***REMOVED***

        public bool HasExceptions
        ***REMOVED***
            get ***REMOVED*** return (ExceptionCount > 0); ***REMOVED***
      ***REMOVED***

        public void AddSucceeded(T succeeded)
        ***REMOVED***
            this.Succeeded.Add(succeeded);
      ***REMOVED***

        public void AddSucceeded(IEnumerable<T> succeeded)
        ***REMOVED***
            this.Succeeded.AddRange(succeeded);
      ***REMOVED***

        public void AddFailed(T failed)
        ***REMOVED***
            this.Failed.Add(failed);
      ***REMOVED***

        public void AddFailed(IEnumerable<T> failed)
        ***REMOVED***
            this.Failed.AddRange(failed);
      ***REMOVED***

        public void AddException(Exception exception)
        ***REMOVED***
            this.Exceptions.Add(exception);
      ***REMOVED***

        public void AddExceptions(IEnumerable<Exception> exceptions)
        ***REMOVED***
            this.Exceptions.AddRange(exceptions);
      ***REMOVED***

        public void AddFailedWithException(T failed, Exception exception)
        ***REMOVED***
            this.Failed.Add(failed);
            this.Exceptions.Add(exception);
      ***REMOVED***

        public List<T> AddIncremental(TaskResult<T> otherTaskResult)
        ***REMOVED***
            this.CopyFailedAndExceptionsFrom(otherTaskResult);
            return otherTaskResult.Succeeded;
      ***REMOVED***

        public void AddFinal(TaskResult<T> otherTaskResult)
        ***REMOVED***
            this.CopyFrom(otherTaskResult);
      ***REMOVED***

        public void CopyFailedAndExceptionsFrom(TaskResult<T> otherTaskResult)
        ***REMOVED***
            this.AddFailed(otherTaskResult.Failed);
            this.AddExceptions(otherTaskResult.Exceptions);
      ***REMOVED***

        public void CopyFrom(TaskResult<T> otherTaskResult)
        ***REMOVED***
            this.AddSucceeded(otherTaskResult.Succeeded);
            this.AddFailed(otherTaskResult.Failed);
            this.AddExceptions(otherTaskResult.Exceptions);
      ***REMOVED***

        // public string Message
        // ***REMOVED***
        //     get
        //     ***REMOVED***
        //         var message =
        //             $"Tried to ***REMOVED***this.TaskVerb***REMOVED*** "
        //             + $"***REMOVED***this.CandidateEmployeesCount***REMOVED*** "
        //             + $"***REMOVED***this.TaskObjectNoun***REMOVED***. "
        //             + $"***REMOVED***this.GoodRecordCount***REMOVED*** were successful. ";

        //         if (this.HasExceptions)
        //         ***REMOVED***
        //             // There were exceptions. Add to the text.
        //             message +=
        //                 $"There were ***REMOVED***this.ExceptionCount***REMOVED*** errors: "
        //                 + $"***REMOVED***string.Join(NEW_LINE, this.Exceptions)***REMOVED*** ";
        //       ***REMOVED***

        //         return message;
        //   ***REMOVED***
        // ***REMOVED***
  ***REMOVED***
***REMOVED***
