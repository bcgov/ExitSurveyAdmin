using ExitSurveyAdmin.Models;
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
        private EmployeeCreationService creationService;
        private EmployeeUpdateService updateService;
        private EmployeeNotExitingService notExitingService;
        private EmployeeRefreshService refreshService;

        public EmployeeReconciliationService(
            LoggingService logger,
            EmployeeCreationService creationService,
            EmployeeUpdateService updateService,
            EmployeeRefreshService refreshService,
            EmployeeNotExitingService notExitingService
        )
        {
            this.logger = logger;
            this.creationService = creationService;
            this.updateService = updateService;
            this.refreshService = refreshService;
            this.notExitingService = notExitingService;
        }

        public async Task<EmployeeTaskResult> RefreshCallWebStatusAndLog()
        {
            var taskResult = await refreshService.RefreshCallWebStatus();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        public async Task<EmployeeTaskResult> UpdateNotExitingAndLog(List<Employee> employees)
        {
            var taskResult = await notExitingService.UpdateNotExiting(employees);
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        public async Task<EmployeeTaskResult> ReconcileEmployeesAndLog(
            TaskEnum callingTask,
            List<Employee> candidateEmployees
        )
        {
            var taskResult = await ReconcileWithDatabase(candidateEmployees);
            taskResult.Task = callingTask;
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        private async Task<EmployeeTaskResult> ReconcileWithDatabase(
            List<Employee> candidateEmployees
        )
        {
            var employeesToCreate = new List<Employee>();
            var employeesToUpdate = new List<Tuple<Employee, Employee>>();

            // Get all the employees from the database who might be relevant to
            // this reconciliation attempt, i.e. where an employee with their
            // ID already exists in the database.
            var employeeIds = candidateEmployees.Select(e => e.GovernmentEmployeeId).ToArray();
            var existingEmployees = creationService.ExistingEmployees(employeeIds);

            // Separate out employees who need creating vs. those who need updating.
            foreach (var candidateEmployee in candidateEmployees)
            {
                // Get the existing employee, if it exists.
                var existingEmployee = creationService.FindExisting(
                    candidateEmployee,
                    existingEmployees
                );
                if (existingEmployee == null)
                {
                    employeesToCreate.Add(candidateEmployee);
                }
                else
                {
                    employeesToUpdate.Add(Tuple.Create(existingEmployee, candidateEmployee));
                }
            }

            // Create employees.
            var creationResult = await creationService.InsertEmployees(employeesToCreate);

            // Update employees.
            var updateResult = await updateService.UpdateExistingEmployees(employeesToUpdate);

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                candidateEmployees.Count(),
                creationResult.GoodEmployees.Concat(updateResult.GoodEmployees).ToList(),
                creationResult.Exceptions.Concat(updateResult.Exceptions).ToList()
            );
        }
    }
}
