using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeNotExitingService
    {
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeUpdateService updateService;

        public EmployeeNotExitingService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeUpdateService updateService
        )
        {
            this.context = context;
            this.callWeb = callWeb;
            this.updateService = updateService;
        }

        public async Task<EmployeeTaskResult> UpdateNotExiting(List<Employee> reconciledEmployees)
        {
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.UpdateNotExiting);

            var employeesWithStatuses = NotExitingEmployees(reconciledEmployees)
                .Select(e => Tuple.Create(e, EmployeeStatusEnum.NotExiting))
                .ToList();

            var ignoredEmployeeCount = reconciledEmployees.Count - employeesWithStatuses.Count;
            employeeTaskResult.IgnoredCount += ignoredEmployeeCount;
            employeeTaskResult.CandidateCount += ignoredEmployeeCount;

            employeeTaskResult.AddFinalStep(
                await updateService.SaveStatusesAndAddTimelineEntries(employeesWithStatuses)
            );

            return employeeTaskResult;
        }

        private List<Employee> NotExitingEmployees(List<Employee> reconciledEmployeeList)
        {
            return context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                .ToList()
                .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                .ToList();
        }
    }
}
