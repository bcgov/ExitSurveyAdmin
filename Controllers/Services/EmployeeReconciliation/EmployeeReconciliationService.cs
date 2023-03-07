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

        public EmployeeReconciliationService(
            LoggingService logger,
            EmployeeCreationService creationService,
            EmployeeUpdateService updateService,
            EmployeeNotExitingService notExitingService
        )
        ***REMOVED***
            this.logger = logger;
            this.creationService = creationService;
            this.updateService = updateService;
            this.notExitingService = notExitingService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> RefreshCallWebStatusAndLog()
        ***REMOVED***
            var taskResult = await updateService.RefreshCallWebStatus();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateNotExitingAndLog(List<Employee> employees)
        ***REMOVED***
            var taskResult = await notExitingService.UpdateNotExiting(employees);
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> ReconcileEmployeesAndLog(
            TaskEnum callingTask,
            List<Employee> candidateEmployees
        )
        ***REMOVED***
            var taskResult = await ReconcileWithDatabase(candidateEmployees);
            taskResult.Task = callingTask;
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        private async Task<EmployeeTaskResult> ReconcileWithDatabase(
            List<Employee> candidateEmployees
        )
        ***REMOVED***
            var employeesToCreate = new List<Employee>();
            var employeesToUpdate = new List<Tuple<Employee, Employee>>();

            // Get all the employees from the database who might be relevant to
            // this reconciliation attempt, i.e. where an employee with their
            // ID already exists in the database.
            var employeeIds = candidateEmployees.Select(e => e.GovernmentEmployeeId).ToArray();
            var existingEmployees = creationService.ExistingEmployees(employeeIds);

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

            // Update employees.
            var updateResult = await updateService.UpdateExistingEmployees(employeesToUpdate);

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                candidateEmployees.Count(),
                creationResult.GoodEmployees.Concat(updateResult.GoodEmployees).ToList(),
                creationResult.Exceptions.Concat(updateResult.Exceptions).ToList()
            );
      ***REMOVED***
  ***REMOVED***
***REMOVED***
