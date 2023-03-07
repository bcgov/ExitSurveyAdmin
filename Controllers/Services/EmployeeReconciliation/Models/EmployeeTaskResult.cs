using ExitSurveyAdmin.Models;

using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeTaskResult
    {
        private static string NEW_LINE = System.Environment.NewLine;

        public EmployeeTaskResult(TaskEnum task)
        {
            this.Task = task;
            this.CandidateEmployeesCount = 0;
            this.GoodEmployees = new List<Employee>();
            this.Exceptions = Exceptions;
        }

        public EmployeeTaskResult(
            TaskEnum task,
            int candidateEmployeesCount,
            List<Employee> goodEmployees,
            List<string> exceptions
        )
        {
            this.Task = task;
            this.CandidateEmployeesCount = candidateEmployeesCount;
            this.GoodEmployees = goodEmployees;
            this.Exceptions = exceptions;
        }

        public void AddTaskResult(TaskResult<Employee> taskResult)
        {
            this.CandidateEmployeesCount += taskResult.TotalRecordCount;
            this.GoodEmployees.AddRange(taskResult.Succeeded);
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
        }

        public List<Employee> AddIncrementalStep(TaskResult<Employee> taskResult)
        {
            this.CandidateEmployeesCount += taskResult.FailedCount;
            this.Exceptions.AddRange(taskResult.ExceptionMessages);
            return taskResult.Succeeded;
        }

        public void AddFinalStep(TaskResult<Employee> taskResult)
        {
            this.CandidateEmployeesCount += taskResult.TotalRecordCount;
            this.GoodEmployees.AddRange(taskResult.Succeeded);
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

        public int CandidateEmployeesCount { get; set; }

        public List<Employee> GoodEmployees { get; set; }

        public List<string> Exceptions { get; set; }

        public int GoodRecordCount
        {
            get { return GoodEmployees.Count; }
        }

        public int ExceptionCount
        {
            get { return Exceptions.Count; }
        }

        public int TotalRecordCount
        {
            get { return GoodRecordCount + ExceptionCount; }
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
                    + $"{this.CandidateEmployeesCount} "
                    + $"{this.TaskObjectNoun}. "
                    + $"{this.GoodRecordCount} were successful. ";

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
