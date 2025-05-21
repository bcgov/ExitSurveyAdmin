using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeExpirationService
    ***REMOVED***
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeUpdateService updateService;

        public EmployeeExpirationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeUpdateService updateService
        )
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.updateService = updateService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> ExpireEmployees()
        ***REMOVED***
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ExpireEmployees);

            var taskResult = new TaskResult<Employee>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            var employees = updateService.ActiveEmployees();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var employee in employees)
            ***REMOVED***
                if (employee.IsPastExpiryThreshold(thresholdInDays))
                ***REMOVED***
                    // If their effective date is past the expiry threshold, expire.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
              ***REMOVED***
                else
                ***REMOVED***
                    taskResult.AddIgnored(employee);
              ***REMOVED***
          ***REMOVED***

            taskResult.AddFinal(
                await updateService.SaveEmployeeStatusesAndUpdateCallWeb(employeesToSave)
            );

            employeeTaskResult.AddFinalStep(taskResult);

            return employeeTaskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UnexpireEmployees()
        ***REMOVED***
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.UnexpireEmployees);

            var taskResult = new TaskResult<Employee>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            var employees = ExpiredEmployees();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var employee in employees)
            ***REMOVED***
                if (employee.IsNowInsideExpiryThreshold(thresholdInDays))
                ***REMOVED***
                    // If their effective date is now inside the expiry
                    // threshold, set to exiting.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
              ***REMOVED***
                else
                ***REMOVED***
                    taskResult.AddIgnored(employee);
              ***REMOVED***
          ***REMOVED***

            taskResult.AddFinal(
                await updateService.SaveEmployeeStatusesAndUpdateCallWeb(employeesToSave)
            );

            employeeTaskResult.AddFinalStep(taskResult);

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

        public List<Employee> ExpiredEmployees()
        ***REMOVED***
            return context.Employees
                .Include(e => e.CurrentEmployeeStatus)
                .Include(e => e.TimelineEntries)
                .Where(e => (e.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code))
                .ToList();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
