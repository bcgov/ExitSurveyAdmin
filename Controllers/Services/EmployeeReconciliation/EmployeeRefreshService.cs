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

        public EmployeeRefreshService(ExitSurveyAdminContext context, CallWebService callWeb, EmployeeUpdateService updateService)
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.updateService = updateService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> RefreshCallWebStatus()
        ***REMOVED***
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.RefreshStatuses);

            // For all non-final employees, update.
            var employees = EmployeesNeedingCallWebRefresh();

            // Do this in a batch, working with 100 employees at a time.
            var BATCH_SIZE = 100;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Get the status codes for the employees.
                var employeesWithSurveyStatusCodes = employeeTaskResult.AddIncrementalStep(await callWeb.GetSurveyStatusCodes(
                        employeesInBatch
                    ));

                // Step 2. Update the statuses.
                employeeTaskResult.AddFinalStep(await updateService.UpdateEmployeeSurveyStatuses(
                    employeesWithSurveyStatusCodes
                ));
          ***REMOVED***

            return employeeTaskResult;
      ***REMOVED***

        private async Task<int> ExpiryThresholdInDays()
        ***REMOVED***
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            return thresholdInDays;
      ***REMOVED***

        private List<Employee> EmployeesNeedingCallWebRefresh()
        ***REMOVED***
            return context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(
                    e => (e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                // TODO: We are still investigating if this should be removed.
                // See https://github.com/bcgov/ExitSurveyAdmin/issues/208
                // || (e.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code)
                )
                .ToList();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
