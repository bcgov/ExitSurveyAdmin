using ExitSurveyAdmin.Models;

using System.Collections.Generic;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeTaskResult : GenericTaskResult<Employee>
    ***REMOVED***
        public EmployeeTaskResult(TaskEnum task)
            : base(task) ***REMOVED*** ***REMOVED***

        public EmployeeTaskResult(
            TaskEnum task,
            int candidateEmployeesCount,
            int ignoredEmployeesCount,
            List<Employee> goodEmployees,
            List<string> exceptions
        )
            : base(task, candidateEmployeesCount, ignoredEmployeesCount, goodEmployees, exceptions)
        ***REMOVED*** ***REMOVED***
  ***REMOVED***
***REMOVED***
