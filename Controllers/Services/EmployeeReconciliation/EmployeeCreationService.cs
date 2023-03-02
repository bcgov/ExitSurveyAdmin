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
        private LoggingService logger;

        public EmployeeCreationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService,
            LoggingService logger
        )
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.infoLookupService = infoLookupService;
            this.logger = logger;
      ***REMOVED***

        // NB. For reconciliation purposes, existence is determined by the
        // combination of EmployeeId, ExitCount, and record count.
        public Employee UniqueEmployeeExists(Employee candidate)
        ***REMOVED***
            var query = context.Employees
                .Include(e => e.CurrentEmployeeStatus)
                .Where(
                    e =>
                        e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                        && e.ExitCount == candidate.ExitCount
                        && e.RecordCount == candidate.RecordCount
                );

            if (query.Count() > 0)
            ***REMOVED***
                return query.First();
          ***REMOVED***
            else
            ***REMOVED***
                return null;
          ***REMOVED***
      ***REMOVED***

        public Employee FindExisting(Employee candidate, List<Employee> employees)
        ***REMOVED***
            var employee = employees.Find(
                e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
                    && e.RecordCount == candidate.RecordCount
            );

            return employee;
      ***REMOVED***

        public List<Employee> RelevantEmployees(string[] candidateGovernmentEmployeeIds)
        ***REMOVED***
            return context.Employees
                .Where(e => candidateGovernmentEmployeeIds.Contains(e.GovernmentEmployeeId))
                .Include(e => e.CurrentEmployeeStatus)
                .ToList();
      ***REMOVED***

        public async Task<EmployeeTaskResult> InsertEmployees(List<Employee> employees)
        ***REMOVED***
            var insertedEmployeesList = new List<Employee>();
            var exceptionList = new List<string>();

            // Do this in a batch, working with 50 employees at a time.
            var BATCH_SIZE = 50;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Prepare employees.
                var preparedEmployees = new List<Employee>();

                foreach (Employee e in employeesInBatch)
                ***REMOVED***
                    try
                    ***REMOVED***
                        var employee = PrepareEmployee(e);
                        preparedEmployees.Add(employee);
                  ***REMOVED***
                    catch (Exception exception)
                    ***REMOVED***
                        exceptionList.Add(
                            $"Exception with preparing candidate employee ***REMOVED***e.FullName***REMOVED*** "
                                + $"(ID: ***REMOVED***e.GovernmentEmployeeId***REMOVED***): ***REMOVED***exception.GetType()***REMOVED***: ***REMOVED***exception.Message***REMOVED*** "
                        );
                  ***REMOVED***
              ***REMOVED***

                // Step 2. Get telkeys.

                var createSurveyResults = new CallWebRowDto[0];
                try
                ***REMOVED***
                    createSurveyResults = await callWeb.CreateSurveys(preparedEmployees);
              ***REMOVED***
                catch (Exception e)
                ***REMOVED***
                    exceptionList.Add($"Could not create survey results. ***REMOVED***e.Message***REMOVED***");
                    continue;
              ***REMOVED***

                foreach (var callWebRowDto in createSurveyResults)
                ***REMOVED***
                    var telkey = callWebRowDto.Telkey;
                    var employee = preparedEmployees.Find(
                        e =>
                            e.PreferredFirstName.Equals(callWebRowDto.PreferredFirstName)
                            && e.LastName.Equals(callWebRowDto.LastName)
                            && e.Ministry.Equals(callWebRowDto.Ministry)
                    );
                    if (employee == null)
                    ***REMOVED***
                        exceptionList.Add(
                            $"Could not find prepared employee ***REMOVED***callWebRowDto.PreferredFirstName***REMOVED*** ***REMOVED***callWebRowDto.LastName***REMOVED*** in created survey results list."
                        );
                  ***REMOVED***
                    else
                    ***REMOVED***
                        employee.Telkey = telkey;
                        context.Add(employee);
                        insertedEmployeesList.Add(employee);
                  ***REMOVED***
              ***REMOVED***

                // Step 3. Save context.
                await context.SaveChangesAsync();
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
