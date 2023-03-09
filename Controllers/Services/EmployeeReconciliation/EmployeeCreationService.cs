using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeCreationService
    ***REMOVED***
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeInfoLookupService infoLookupService;

        public EmployeeCreationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService
        )
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.infoLookupService = infoLookupService;
      ***REMOVED***

        public List<Employee> ExistingEmployees(string[] candidateGovernmentEmployeeIds)
        ***REMOVED***
            return context.Employees
                .Where(e => candidateGovernmentEmployeeIds.Contains(e.GovernmentEmployeeId))
                .Include(e => e.CurrentEmployeeStatus)
                .ToList();
      ***REMOVED***

        // NB. For reconciliation purposes, existence is determined by the
        // combination of EmployeeId, ExitCount, and record count.
        public Employee FindExisting(Employee candidate, List<Employee> employeesToSearch)
        ***REMOVED***
            var employee = employeesToSearch.Find(
                e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
                    && e.RecordCount == candidate.RecordCount
            );

            return employee;
      ***REMOVED***

        public async Task<EmployeeTaskResult> InsertEmployees(List<Employee> employees)
        ***REMOVED***
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ReconcileEmployees);

            // Do this in a batch, working with 50 employees at a time.
            var BATCH_SIZE = 50;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Prepare employees.
                var employeesToCreate = employeeTaskResult.AddIncrementalStep(
                    PrepareEmployees(employeesInBatch)
                );

                // Step 2. Get telkeys.
                var employeesToSave = employeeTaskResult.AddIncrementalStep(
                    await callWeb.CreateSurveys(employeesToCreate)
                );

                // Step 3. Save context.
                var result = await SaveNewEmployees(employeesToSave);
                employeeTaskResult.AddFinalStep(result);
          ***REMOVED***

            return employeeTaskResult;
      ***REMOVED***

        private TaskResult<Employee> PrepareEmployees(List<Employee> employees)
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            foreach (var employee in employees)
            ***REMOVED***
                try
                ***REMOVED***
                    // Set the status code for a new employee.
                    var newStatusCode = EmployeeStatusEnum.Exiting.Code;
                    employee.CurrentEmployeeStatusCode = EmployeeStatusEnum.Exiting.Code;

                    // Set the email. TODO: And other LDAP fields?
                    employee.UpdateInfoFromLdap(infoLookupService);

                    // Set other preferred fields; runs on creation only.
                    employee.InstantiateFields();

                    // Set timeline entries.
                    employee.TimelineEntries = new List<EmployeeTimelineEntry>();
                    employee.TimelineEntries.Add(
                        new EmployeeTimelineEntry
                        ***REMOVED***
                            EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                            EmployeeStatusCode = newStatusCode,
                            Comment = "Created automatically by script."
                      ***REMOVED***
                    );

                    taskResult.AddSucceeded(employee);
              ***REMOVED***
                catch (Exception exception)
                ***REMOVED***
                    taskResult.AddFailedWithException(
                        employee,
                        new FailedToPrepareEmployeeException(
                            $"Could not prepare employee ***REMOVED***employee***REMOVED***: ***REMOVED***exception.Message***REMOVED***"
                        )
                    );
              ***REMOVED***
          ***REMOVED***

            return taskResult;
      ***REMOVED***

        private async Task<TaskResult<Employee>> SaveNewEmployees(List<Employee> employees)
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            try
            ***REMOVED***
                foreach (var e in employees)
                ***REMOVED***
                    context.Employees.Add(e);
              ***REMOVED***
                await context.SaveChangesAsync();
                taskResult.AddSucceeded(employees);
          ***REMOVED***
            catch (Exception exception)
            ***REMOVED***
                // Remove the employee and the timeline entry from the
                // context, or else we will also get errors next time we
                // next try to save changes to the context.
                foreach (var employee in employees)
                ***REMOVED***
                    context.RemoveRange(employee.TimelineEntries);
                    context.Remove(employee);
              ***REMOVED***

                // Assume that saving all employees failed.
                taskResult.AddFailed(employees);
                taskResult.AddException(
                    new FailedToSaveContextException(
                        $"Saving employees failed for a range of employees: ***REMOVED***String.Join(", ", employees)***REMOVED***. Error: ***REMOVED***exception.Message***REMOVED***"
                    )
                );
          ***REMOVED***

            return taskResult;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
