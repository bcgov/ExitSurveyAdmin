using System;
using ExitSurveyAdmin.Models;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeResult
    ***REMOVED***
        private static string NEW_LINE = System.Environment.NewLine;

        public EmployeeResult(Employee employee, Exception exception = null)
        ***REMOVED***
            this.Employee = employee;
            if (exception == null)
            ***REMOVED***
                this.Exceptions = new List<Exception>();
          ***REMOVED***
            else
            ***REMOVED***
                this.Exceptions = new List<Exception>() ***REMOVED*** exception ***REMOVED***;
          ***REMOVED***
      ***REMOVED***

        public Employee Employee ***REMOVED*** get; set; ***REMOVED***

        public List<Exception> Exceptions ***REMOVED*** get; set; ***REMOVED***

        public void AddException(Exception exception)
        ***REMOVED***
            this.Exceptions.Add(exception);
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
                if (this.HasExceptions)
                ***REMOVED***
                    var message =
                        $"There were ***REMOVED***this.ExceptionCount***REMOVED*** errors with ***REMOVED***this.Employee.FullName***REMOVED*** (***REMOVED***this.Employee.GovernmentEmployeeId***REMOVED***):";

                    // There were exceptions. Add to the text.
                    message += string.Join(NEW_LINE, this.Exceptions);

                    return message;
              ***REMOVED***
                else
                ***REMOVED***
                    return null;
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
