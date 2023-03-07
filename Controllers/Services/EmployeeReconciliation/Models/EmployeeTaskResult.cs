using ExitSurveyAdmin.Models;

using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeTaskResult
    ***REMOVED***
        private static string NEW_LINE = System.Environment.NewLine;

        public EmployeeTaskResult(TaskEnum task)
        ***REMOVED***
            this.Task = task;
            this.CandidateEmployeesCount = 0;
            this.GoodEmployees = new List<Employee>();
            this.Exceptions = Exceptions;
      ***REMOVED***

        public EmployeeTaskResult(
            TaskEnum task,
            int candidateEmployeesCount,
            List<Employee> goodEmployees,
            List<string> exceptions
        )
        ***REMOVED***
            this.Task = task;
            this.CandidateEmployeesCount = candidateEmployeesCount;
            this.GoodEmployees = goodEmployees;
            this.Exceptions = exceptions;
      ***REMOVED***

        public void AddTaskResult(TaskResult<Employee> taskResult)
        ***REMOVED***
            this.CandidateEmployeesCount += taskResult.TotalRecordCount;
            this.GoodEmployees.AddRange(taskResult.Succeeded);
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
      ***REMOVED***

        public List<Employee> AddIncrementalStep(TaskResult<Employee> taskResult)
        ***REMOVED***
            this.CandidateEmployeesCount += taskResult.FailedCount;
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
            return taskResult.Succeeded;
      ***REMOVED***

        public void AddFinalStep(TaskResult<Employee> taskResult)
        ***REMOVED***
            this.CandidateEmployeesCount += taskResult.TotalRecordCount;
            this.GoodEmployees.AddRange(taskResult.Succeeded);
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

        public int CandidateEmployeesCount ***REMOVED*** get; set; ***REMOVED***

        public List<Employee> GoodEmployees ***REMOVED*** get; set; ***REMOVED***

        public List<string> Exceptions ***REMOVED*** get; set; ***REMOVED***

        public int GoodRecordCount
        ***REMOVED***
            get ***REMOVED*** return GoodEmployees.Count; ***REMOVED***
      ***REMOVED***

        public int ExceptionCount
        ***REMOVED***
            get ***REMOVED*** return Exceptions.Count; ***REMOVED***
      ***REMOVED***

        public int TotalRecordCount
        ***REMOVED***
            get ***REMOVED*** return GoodRecordCount + ExceptionCount; ***REMOVED***
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
                    + $"***REMOVED***this.CandidateEmployeesCount***REMOVED*** "
                    + $"***REMOVED***this.TaskObjectNoun***REMOVED***. "
                    + $"***REMOVED***this.GoodRecordCount***REMOVED*** were successful. ";

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
