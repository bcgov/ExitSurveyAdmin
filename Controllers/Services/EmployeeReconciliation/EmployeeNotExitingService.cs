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

        // Given a list of employees we have obtained from a JSON / CSV and have
        // reconciled with the database, set everyone NOT in that list, who is
        // in a non-final state in our database, to "NotExiting", i.e. they are
        // quite possibly not actually leaving employment.
        public async Task<EmployeeTaskResult> UpdateNotExiting(List<Employee> reconciledEmployees)
        {
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.UpdateNotExiting);

            // Select reconciled employees who are NOT in a final state.
            var notExitingEmployees = NotExitingEmployees(reconciledEmployees)
                .Select(e => Tuple.Create(e, EmployeeStatusEnum.NotExiting))
                .ToList();

            var ignoredEmployeeCount = reconciledEmployees.Count - notExitingEmployees.Count;
            employeeTaskResult.IgnoredCount += ignoredEmployeeCount;
            employeeTaskResult.CandidateCount += ignoredEmployeeCount;

            employeeTaskResult.AddFinalStep(
                await updateService.SaveEmployeeStatusesAndUpdateCallWeb(notExitingEmployees)
            );

            return employeeTaskResult;
        }

        private List<Employee> NotExitingEmployees(List<Employee> reconciledEmployeeList)
        {
            var activeEmployees = context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                .ToList();

            var activeDBEmployeesNotInCsv = activeEmployees
                .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                .ToList();

            return activeDBEmployeesNotInCsv;
        }
    }
}
