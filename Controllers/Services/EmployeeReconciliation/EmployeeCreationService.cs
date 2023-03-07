using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeCreationService
    {
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeInfoLookupService infoLookupService;

        public EmployeeCreationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService
        )
        {
            this.context = context;
            this.callWeb = callWeb;
            this.infoLookupService = infoLookupService;
        }

        public List<Employee> ExistingEmployees(string[] candidateGovernmentEmployeeIds)
        {
            return context.Employees
                .Where(e => candidateGovernmentEmployeeIds.Contains(e.GovernmentEmployeeId))
                .Include(e => e.CurrentEmployeeStatus)
                .ToList();
        }

        // NB. For reconciliation purposes, existence is determined by the
        // combination of EmployeeId, ExitCount, and record count.
        public Employee FindExisting(Employee candidate, List<Employee> employeesToSearch)
        {
            var employee = employeesToSearch.Find(
                e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
                    && e.RecordCount == candidate.RecordCount
            );

            return employee;
        }

        public async Task<EmployeeTaskResult> InsertEmployees(List<Employee> employees)
        {
            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ReconcileEmployees);

            // Do this in a batch, working with 50 employees at a time.
            var BATCH_SIZE = 50;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            {
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
            }

            return employeeTaskResult;
        }

        private TaskResult<Employee> PrepareEmployees(List<Employee> employees)
        {
            var taskResult = new TaskResult<Employee>();

            foreach (var employee in employees)
            {
                try
                {
                    // Set the status code for a new employee.
                    var newStatusCode = EmployeeStatusEnum.Exiting.Code;
                    employee.CurrentEmployeeStatusCode = EmployeeStatusEnum.Exiting.Code;

                    // Set the email.
                    employee.UpdateEmail(infoLookupService);

                    // Set other preferred fields; runs on creation only.
                    employee.InstantiateFields();

                    // Set timeline entries.
                    employee.TimelineEntries = new List<EmployeeTimelineEntry>();
                    employee.TimelineEntries.Add(
                        new EmployeeTimelineEntry
                        {
                            EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                            EmployeeStatusCode = newStatusCode,
                            Comment = "Created automatically by script."
                        }
                    );

                    taskResult.AddSucceeded(employee);
                }
                catch (Exception exception)
                {
                    taskResult.AddFailedWithException(
                        employee,
                        new FailedToPrepareEmployeeException(
                            $"Could not prepare employee {employee}: {exception.Message}"
                        )
                    );
                }
            }

            return taskResult;
        }

        private async Task<TaskResult<Employee>> SaveNewEmployees(List<Employee> employees)
        {
            var taskResult = new TaskResult<Employee>();

            try
            {
                employees.Select(e => context.Add(e));
                await context.SaveChangesAsync();
                taskResult.AddSucceeded(employees);
            }
            catch (Exception exception)
            {
                // Assume saving all employees failed.
                taskResult.AddFailed(employees);
                taskResult.AddException(
                    new FailedToSaveContextException(
                        $"Saving employees failed for a range of employees: {String.Join(", ", employees)}. Error: {exception.Message}"
                    )
                );
            }

            return taskResult;
        }
    }
}
