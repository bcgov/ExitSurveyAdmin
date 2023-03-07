using System;
using System.Linq;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
***REMOVED***
    // Tracks successes and failures of operations on a generic T (in typical
    // use, this will be an Employee). The consumer is responsible for adding
    // ranges of successes / failures and their associated Exceptions.
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

        // Adds the failures and exceptions from another TaskResult, while
        // returning the successes. In practical use, this makes it possible
        // to perform a process returning a TaskResult on a list of (e.g.)
        // Employees, store the failures + exceptions, and then have a list of
        // Employees for whom the operation was successful to work with in the
        // next step of the operation.
        public List<T> AddIncremental(TaskResult<T> otherTaskResult)
        ***REMOVED***
            this.CopyFailedAndExceptionsFrom(otherTaskResult);
            return otherTaskResult.Succeeded;
      ***REMOVED***

        // Adds all successes, failures and exceptions from another TaskResult.
        // Ideally, called with the results of a final step in a process,
        // before "this" TaskResult is returned.
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
  ***REMOVED***
***REMOVED***
