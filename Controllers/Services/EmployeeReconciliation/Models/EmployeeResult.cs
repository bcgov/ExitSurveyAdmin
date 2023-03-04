using System;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeResult
    {
        public EmployeeResult(Employee employee, Exception exception = null)
        {
            this.employee = employee;
            this.exception = exception;
        }

        public Employee employee { get; set; }

        public Exception exception { get; set; }

        public bool HasException
        {
            get { return (this.exception != null); }
        }

        public TaskOutcomeEnum TaskOutcome
        {
            get { return this.HasException ? TaskOutcomeEnum.Warn : TaskOutcomeEnum.Success; }
        }

        public string ExceptionMessage
        {
            get
            {

                if (this.HasException)
                {
                    return $"Exception with {this.employee.FullName}: {this.exception.Message}";
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
