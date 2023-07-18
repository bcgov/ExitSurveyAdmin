using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeRefreshService
    ***REMOVED***
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeUpdateService updateService;

        public EmployeeRefreshService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeUpdateService updateService
        )
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.updateService = updateService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> CheckSurveyComplete()
        ***REMOVED***
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.RefreshStatuses);

            // For all non-final employees, update.
            var employees = updateService.ActiveEmployees();

            // Do this in a batch, working with 100 employees at a time.
            var BATCH_SIZE = 100;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Get the status codes for the employees.
                var employeesWithSurveyStatusCodes = employeeTaskResult.AddIncrementalStep(
                    await callWeb.GetSurveyStatusCodes(employeesInBatch)
                );

                // Step 2. Update the statuses.
                employeeTaskResult.AddFinalStep(
                    await UpdateSurveyCompleteStatus(employeesWithSurveyStatusCodes)
                );
          ***REMOVED***

            return employeeTaskResult;
      ***REMOVED***

        private async Task<TaskResult<Employee>> UpdateSurveyCompleteStatus(
            List<Tuple<Employee, string>> employeeResultsWithSurveyStatusCodes
        )
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var tuple in employeeResultsWithSurveyStatusCodes)
            ***REMOVED***
                var employee = tuple.Item1;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                ***REMOVED***
                    // The employee does not have a valid status code.
                    taskResult.AddFailedWithException(
                        employee,
                        new NullCallWebStatusCodeException($"No status code for $***REMOVED***employee***REMOVED***")
                    );
                    continue;
              ***REMOVED***
                if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                ***REMOVED***
                    // The employee has completed the survey.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
                    continue;
              ***REMOVED***
                else
                ***REMOVED***
                    taskResult.AddIgnored(employee);
              ***REMOVED***
          ***REMOVED***

            taskResult.AddFinal(
                await updateService.SaveEmployeeStatusesAndUpdateCallWeb(employeesToSave)
            );

            return taskResult;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
