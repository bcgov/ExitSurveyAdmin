using System;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeResult
    ***REMOVED***
        public EmployeeResult(Employee employee, Exception exception = null)
        ***REMOVED***
            this.employee = employee;
            this.exception = exception;
      ***REMOVED***

        public Employee employee ***REMOVED*** get; set; ***REMOVED***

        public Exception exception ***REMOVED*** get; set; ***REMOVED***

        public bool HasException
        ***REMOVED***
            get ***REMOVED*** return (this.exception != null); ***REMOVED***
      ***REMOVED***

        public TaskOutcomeEnum TaskOutcome
        ***REMOVED***
            get ***REMOVED*** return this.HasException ? TaskOutcomeEnum.Warn : TaskOutcomeEnum.Success; ***REMOVED***
      ***REMOVED***

        public string ExceptionMessage
        ***REMOVED***
            get
            ***REMOVED***

                if (this.HasException)
                ***REMOVED***
                    return $"Exception with ***REMOVED***this.employee.FullName***REMOVED***: ***REMOVED***this.exception.Message***REMOVED***";
              ***REMOVED***
                else
                ***REMOVED***
                    return null;
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
