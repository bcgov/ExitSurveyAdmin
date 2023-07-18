using ExitSurveyAdmin.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeReconciliationService
    ***REMOVED***
        private LoggingService logger;
        private EmployeeCreationService creationService;
        private EmployeeUpdateService updateService;
        private EmployeeNotExitingService notExitingService;
        private EmployeeRefreshService refreshService;
        private EmployeeExpirationService expirationService;

        public EmployeeReconciliationService(
            LoggingService logger,
            EmployeeCreationService creationService,
            EmployeeUpdateService updateService,
            EmployeeRefreshService refreshService,
            EmployeeNotExitingService notExitingService,
            EmployeeExpirationService expirationService
        )
        ***REMOVED***
            this.logger = logger;
            this.creationService = creationService;
            this.updateService = updateService;
            this.refreshService = refreshService;
            this.notExitingService = notExitingService;
            this.expirationService = expirationService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> CheckSurveyCompleteAndLog()
        ***REMOVED***
            var taskResult = await refreshService.CheckSurveyComplete();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UnexpireAndLog()
        ***REMOVED***
            var taskResult = await expirationService.UnexpireEmployees();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> ExpireAndLog()
        ***REMOVED***
            var taskResult = await expirationService.ExpireEmployees();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateNotExitingAndLog(List<Employee> employees)
        ***REMOVED***
            var taskResult = await notExitingService.UpdateNotExiting(employees);
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<Tuple<List<Employee>, EmployeeTaskResult>> ReconcileEmployeesAndLog(
            TaskEnum callingTask,
            List<Employee> candidateEmployees
        )
        ***REMOVED***
            var reconciliationTuple = await ReconcileWithDatabase(candidateEmployees);
            var taskResult = reconciliationTuple.Item2;
            taskResult.Task = callingTask;
            await logger.LogEmployeeTaskResult(taskResult);
            return reconciliationTuple;
      ***REMOVED***

        private async Task<Tuple<List<Employee>, EmployeeTaskResult>> ReconcileWithDatabase(
            List<Employee> candidateEmployees
        )
        ***REMOVED***
            var employeesToCreate = new List<Employee>();
            var employeesToUpdate = new List<Tuple<Employee, Employee>>();

            // Get all the employees from the database who might be relevant to
            // this reconciliation attempt, i.e. where an employee with their
            // ID already exists in the database.
            var existingEmployees = creationService.ExistingEmployeesFromCandidates(
                candidateEmployees
            );

            // Separate out employees who need creating vs. those who need updating.
            foreach (var candidateEmployee in candidateEmployees)
            ***REMOVED***
                // Get the existing employee, if it exists.
                var existingEmployee = creationService.FindExisting(
                    candidateEmployee,
                    existingEmployees
                );
                if (existingEmployee == null)
                ***REMOVED***
                    employeesToCreate.Add(candidateEmployee);
              ***REMOVED***
                else
                ***REMOVED***
                    employeesToUpdate.Add(Tuple.Create(existingEmployee, candidateEmployee));
              ***REMOVED***
          ***REMOVED***

            // Create employees.
            var creationResult = await creationService.InsertEmployees(employeesToCreate);
            await logger.LogEmployeeTaskResult(creationResult);

            // Update employees.
            var updateResult = await updateService.UpdateExistingEmployees(employeesToUpdate);
            await logger.LogEmployeeTaskResult(updateResult);

            // Get the existing employees again. We're doing this once more
            // because we don't want to assume anything about which employees
            // might have failed to create, update, etc. This works only by
            // employee ID; we need to refine in the next step.
            var reprojectedExistingEmployees = creationService.ExistingEmployeesFromCandidates(
                candidateEmployees
            );
            // Filter down to only employees in the original CSV.
            var createdAndUpdatedEmployees = reprojectedExistingEmployees
                .Where(e => creationService.FindExisting(e, candidateEmployees) != null)
                .ToList();

            return new Tuple<List<Employee>, EmployeeTaskResult>(
                createdAndUpdatedEmployees,
                new EmployeeTaskResult(
                    TaskEnum.ReconcileEmployees,
                    candidateEmployees.Count(),
                    creationResult.IgnoredCount + updateResult.IgnoredCount,
                    creationResult.Succeeded.Concat(updateResult.Succeeded).ToList(),
                    creationResult.Exceptions.Concat(updateResult.Exceptions).ToList()
                )
            );
      ***REMOVED***
  ***REMOVED***
***REMOVED***
