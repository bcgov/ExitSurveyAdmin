using System;
using ExitSurveyAdmin.Models;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeResult
    {
        private static string NEW_LINE = System.Environment.NewLine;

        public EmployeeResult(Employee employee, Exception exception = null)
        {
            this.Employee = employee;
            if (exception == null)
            {
                this.Exceptions = new List<Exception>();
            }
            else
            {
                this.Exceptions = new List<Exception>() { exception };
            }
        }

        public Employee Employee { get; set; }

        public List<Exception> Exceptions { get; set; }

        public void AddException(Exception exception)
        {
            this.Exceptions.Add(exception);
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
                if (this.HasExceptions)
                {
                    var message =
                        $"There were {this.ExceptionCount} errors with {this.Employee.FullName} ({this.Employee.GovernmentEmployeeId}):";

                    // There were exceptions. Add to the text.
                    message += string.Join(NEW_LINE, this.Exceptions);

                    return message;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
