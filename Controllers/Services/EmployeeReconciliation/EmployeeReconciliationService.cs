using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.CallWeb;
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
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.logger = logger;
            this.infoLookupService = infoLookupService;
            this.creationService = creationService;
            this.updateService = updateService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateEmployeeStatusesAndLog()
        ***REMOVED***
            var taskResult = await updateService.UpdateEmployeeStatuses();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateNotExitingAndLog(List<Employee> employees)
        ***REMOVED***
            var taskResult = await updateService.UpdateNotExiting(employees);
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
            IEnumerable<Employee> employees
        )
        ***REMOVED***
            var employeesToCreate = new List<Employee>();
            var employeesToUpdate = new List<Tuple<Employee, Employee>>();

            var employeeIds = employees.Select(e => e.GovernmentEmployeeId).ToArray();

            var relevantEmployees = creationService.RelevantEmployees(employeeIds);

            // Filter out employees who need creating from those who need updating.
            foreach (var candidateEmployee in employees)
            ***REMOVED***
                // Get the existing employee, if it exists.
                // var existingEmployee = creationService.UniqueEmployeeExists(candidateEmployee);
                var existingEmployee = creationService.FindExisting(
                    candidateEmployee,
                    relevantEmployees
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
                employees.Count(),
                creationResult.GoodEmployees.Concat(updateResult.GoodEmployees).ToList(),
                creationResult.Exceptions.Concat(updateResult.Exceptions).ToList()
            );
      ***REMOVED***
  ***REMOVED***
***REMOVED***
