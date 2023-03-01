using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeReconciliationService
    {
        private LoggingService logger;
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeInfoLookupService infoLookupService;
        private EmployeeCreationService creationService;
        private EmployeeUpdateService updateService;

        public EmployeeReconciliationService(
            LoggingService logger,
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService,
            EmployeeCreationService creationService,
            EmployeeUpdateService updateService
        )
        {
            this.context = context;
            this.callWeb = callWeb;
            this.logger = logger;
            this.infoLookupService = infoLookupService;
            this.creationService = creationService;
            this.updateService = updateService;
        }

        public async Task<EmployeeTaskResult> UpdateEmployeeStatusesAndLog()
        {
            var taskResult = await updateService.UpdateEmployeeStatuses();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        public async Task<EmployeeTaskResult> UpdateNotExitingAndLog(List<Employee> employees)
        {
            var taskResult = await updateService.UpdateNotExiting(employees);
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        public async Task<EmployeeTaskResult> ReconcileEmployeesAndLog(
            TaskEnum callingTask,
            List<Employee> candidateEmployees
        )
        {
            var taskResult = await ReconcileEmployees(candidateEmployees);
            taskResult.Task = callingTask;
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        private async Task<EmployeeTaskResult> ReconcileEmployees(List<Employee> employees)
        {
            var result = await ReconcileWithDatabase(employees.Take(20));

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employees.Count,
                result.GoodEmployees,
                result.Exceptions
            );
        }

        private async Task<EmployeeTaskResult> ReconcileWithDatabase(
            IEnumerable<Employee> employees
        )
        {
            var employeesToCreate = new List<Employee>();
            var employeesToUpdate = new List<Tuple<Employee, Employee>>();

            foreach (var candidateEmployee in employees)
            {
                // Get the existing employee, if it exists.
                var existingEmployee = creationService.UniqueEmployeeExists(candidateEmployee);
                if (existingEmployee == null)
                {
                    employeesToCreate.Add(candidateEmployee);
                }
                else
                {
                    employeesToUpdate.Add(Tuple.Create(existingEmployee, candidateEmployee));
                }
            }

            var creationResult = await creationService.InsertEmployees(employeesToCreate);

            foreach (var tuple in employeesToUpdate)
            {
                await updateService.UpdateExistingEmployee(tuple.Item1, tuple.Item2);
            }

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employees.Count(),
                creationResult.GoodEmployees,
                creationResult.Exceptions
            );
        }
    }
}
