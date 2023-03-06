using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

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
            var processedEmployeesList = new List<EmployeeResult>();
            var exceptionList = new List<string>();

            // Do this in a batch, working with 50 employees at a time.
            var BATCH_SIZE = 50;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Prepare employees.
                var preparedEmployees = employeesInBatch
                    .Select(e =>
                    ***REMOVED***
                        try
                        ***REMOVED***
                            return PrepareEmployee(e);
                      ***REMOVED***
                        catch (Exception exception)
                        ***REMOVED***
                            processedEmployeesList.Add(new EmployeeResult(e, exception));
                            return null;
                      ***REMOVED***
                  ***REMOVED***)
                    .Where(e => e != null) // Filter out errored employees.
                    .ToList();

                // Step 2. Get telkeys.
                var createSurveyResults = new List<EmployeeResult>();
                try
                ***REMOVED***
                    createSurveyResults = await callWeb.CreateSurveys(preparedEmployees);
              ***REMOVED***
                catch (Exception exception)
                ***REMOVED***
                    exceptionList.Add(
                        $"Could not create surveys in CallWeb for the following employees. Error: ***REMOVED***exception.Message***REMOVED***"
                    );
                    processedEmployeesList.AddRange(
                        preparedEmployees.Select(
                            e =>
                                new EmployeeResult(
                                    e,
                                    new CallWebCreateFailedException(
                                        "Telkey not created because CreateSurveys failed."
                                    )
                                )
                        )
                    );
                    continue; // Nothing more to do.
              ***REMOVED***

                foreach (var employeeResult in createSurveyResults)
                ***REMOVED***
                    processedEmployeesList.Add(employeeResult);

                    // If no exceptions, save the employee.
                    if (!employeeResult.HasExceptions)
                    ***REMOVED***
                        context.Add(employeeResult.Employee);
                  ***REMOVED***
              ***REMOVED***

                // Step 3. Save context.
                await context.SaveChangesAsync();
          ***REMOVED***

            var insertedEmployeesList = new List<Employee>();
            foreach (var employeeResult in processedEmployeesList)
            ***REMOVED***
                if (employeeResult.HasExceptions)
                ***REMOVED***
                    exceptionList.Add(employeeResult.Message);
              ***REMOVED***
                else
                ***REMOVED***
                    insertedEmployeesList.Add(employeeResult.Employee);
              ***REMOVED***
          ***REMOVED***

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employees.Count,
                insertedEmployeesList,
                exceptionList
            );
      ***REMOVED***

        private Employee PrepareEmployee(Employee employee)
        ***REMOVED***
            // Set the status code for a new employee.
            var newStatusCode = EmployeeStatusEnum.Exiting.Code;
            employee.CurrentEmployeeStatusCode = newStatusCode;

            // Set the email.
            employee.UpdateEmail(infoLookupService);

            // Set other preferred fields. This only runs the first time
            // the employee is created.
            employee.InstantiateFields();

            // Set timeline entries. Note that Ids are auto-generated.
            employee.TimelineEntries = new List<EmployeeTimelineEntry>();
            employee.TimelineEntries.Add(
                new EmployeeTimelineEntry
                ***REMOVED***
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = newStatusCode,
                    Comment = "Created automatically by script."
              ***REMOVED***
            );

            return employee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
