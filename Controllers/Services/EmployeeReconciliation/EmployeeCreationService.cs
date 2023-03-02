using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeCreationService
    {
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
        {
            this.context = context;
            this.callWeb = callWeb;
            this.infoLookupService = infoLookupService;
            this.logger = logger;
        }

        // NB. For reconciliation purposes, existence is determined by the
        // combination of EmployeeId, ExitCount, and record count.
        public Employee UniqueEmployeeExists(Employee candidate)
        {
            var query = context.Employees
                .Include(e => e.CurrentEmployeeStatus)
                .Where(
                    e =>
                        e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                        && e.ExitCount == candidate.ExitCount
                        && e.RecordCount == candidate.RecordCount
                );

            if (query.Count() > 0)
            {
                return query.First();
            }
            else
            {
                return null;
            }
        }

        public async Task<EmployeeTaskResult> InsertEmployees(List<Employee> employees)
        {
            var insertedEmployeesList = new List<Employee>();
            var exceptionList = new List<string>();

            // Do this in a batch, working with 50 employees at a time.
            var BATCH_SIZE = 50;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            {
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Prepare employees.
                var preparedEmployees = new List<Employee>();
                var tasks = employeesInBatch.Select(e => Task.Run(() => PrepareEmployee(e)));

                try
                {
                    var results = await Task.WhenAll(tasks);
                    preparedEmployees.AddRange(results);
                }
                catch (Exception)
                {
                    var exceptions = tasks.Where(t => t.Exception != null).Select(t => t.Exception);
                }

                // foreach (Employee e in employeesInBatch)
                // {
                //     try
                //     {
                //         var employee = PrepareEmployee(e);
                //         preparedEmployees.Add(employee);
                //     }
                //     catch (Exception exception)
                //     {
                //         exceptionList.Add(
                //             $"Exception with preparing candidate employee {e.FullName} "
                //                 + $"(ID: {e.GovernmentEmployeeId}): {exception.GetType()}: {exception.Message} "
                //         );
                //     }
                // }

                // Step 2. Get telkeys.

                var createSurveyResults = new CallWebRowDto[0];
                try
                {
                    createSurveyResults = await callWeb.CreateSurveys(preparedEmployees);
                }
                catch (Exception)
                {
                    exceptionList.Add($"GIANT EXCEPTION! DEAL WITH ME LATER!");
                    continue;
                }

                foreach (var callWebRowDto in createSurveyResults)
                {
                    var telkey = callWebRowDto.Telkey;
                    var employee = preparedEmployees.Find(
                        e =>
                            e.PreferredFirstName.Equals(callWebRowDto.PreferredFirstName)
                            && e.LastName.Equals(callWebRowDto.LastName)
                            && e.Ministry.Equals(callWebRowDto.Ministry)
                    );
                    if (employee == null)
                    {
                        exceptionList.Add(
                            $"Could not find prepared employee {callWebRowDto.PreferredFirstName} {callWebRowDto.LastName}"
                        );
                    }
                    else
                    {
                        employee.Telkey = telkey;
                        context.Add(employee);
                        insertedEmployeesList.Add(employee);
                    }
                }

                // Step 3. Save context.
                await context.SaveChangesAsync();
            }

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employees.Count,
                insertedEmployeesList,
                exceptionList
            );
        }

        private Employee PrepareEmployee(Employee employee)
        {
            // Case A. The employee does not exist in the database.

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
                {
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = newStatusCode,
                    Comment = "Created automatically by script."
                }
            );

            // End Case A. Return the employee.
            return employee;
        }
    }
}
