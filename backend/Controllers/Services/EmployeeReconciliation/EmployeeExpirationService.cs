using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeExpirationService
    {
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeUpdateService updateService;

        public EmployeeExpirationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeUpdateService updateService
        )
        {
            this.context = context;
            this.callWeb = callWeb;
            this.updateService = updateService;
        }

        public async Task<EmployeeTaskResult> ExpireEmployees()
        {
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ExpireEmployees);

            var taskResult = new TaskResult<Employee>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            var employees = updateService.ActiveEmployees();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var employee in employees)
            {
                if (employee.IsPastExpiryThreshold(thresholdInDays))
                {
                    // If their effective date is past the expiry threshold, expire.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
                }
                else
                {
                    taskResult.AddIgnored(employee);
                }
            }

            taskResult.AddFinal(
                await updateService.SaveEmployeeStatusesAndUpdateCallWeb(employeesToSave)
            );

            employeeTaskResult.AddFinalStep(taskResult);

            return employeeTaskResult;
        }

        public async Task<EmployeeTaskResult> UnexpireEmployees()
        {
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.UnexpireEmployees);

            var taskResult = new TaskResult<Employee>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            var employees = ExpiredEmployees();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var employee in employees)
            {
                if (employee.IsNowInsideExpiryThreshold(thresholdInDays))
                {
                    // If their effective date is now inside the expiry
                    // threshold, set to exiting.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
                }
                else
                {
                    taskResult.AddIgnored(employee);
                }
            }

            taskResult.AddFinal(
                await updateService.SaveEmployeeStatusesAndUpdateCallWeb(employeesToSave)
            );

            employeeTaskResult.AddFinalStep(taskResult);

            return employeeTaskResult;
        }

        private async Task<int> ExpiryThresholdInDays()
        {
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            return thresholdInDays;
        }

        public List<Employee> ExpiredEmployees()
        {
            return context.Employees
                .Include(e => e.CurrentEmployeeStatus)
                .Include(e => e.TimelineEntries)
                .Where(e => (e.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code))
                .ToList();
        }
    }
}
