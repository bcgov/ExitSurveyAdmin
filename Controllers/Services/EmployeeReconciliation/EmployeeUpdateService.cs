using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeUpdateService
    ***REMOVED***
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeInfoLookupService infoLookupService;
        private LoggingService logger;

        public EmployeeUpdateService(
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

        public async Task<EmployeeTaskResult> UpdateExistingEmployees(
            IEnumerable<Tuple<Employee, Employee>> candidateEmployees
        )
        ***REMOVED***
            var updatedEmployeesList = new List<Employee>();
            var exceptionList = new List<string>();

            foreach (var tuple in candidateEmployees)
            ***REMOVED***
                var existingEmployee = tuple.Item1;
                var newEmployee = tuple.Item2;

                // Case B. The unique user DOES exist in the database.

                // If the employee is marked as "survey complete," skip them.
                if (
                    existingEmployee.CurrentEmployeeStatusCode
                    == EmployeeStatusEnum.SurveyComplete.Code
                )
                ***REMOVED***
                    updatedEmployeesList.Add(existingEmployee);
                    continue;
              ***REMOVED***

                // If the employee is marked as "not exiting," update their
                // status back to "exiting".
                if (
                    existingEmployee.CurrentEmployeeStatusCode == EmployeeStatusEnum.NotExiting.Code
                )
                ***REMOVED***
                    existingEmployee.CurrentEmployeeStatusCode = EmployeeStatusEnum.Exiting.Code;
                    context.EmployeeTimelineEntries.Add(
                        new EmployeeTimelineEntry
                        ***REMOVED***
                            EmployeeId = existingEmployee.Id,
                            EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                            EmployeeStatusCode = EmployeeStatusEnum.Exiting.Code,
                            Comment =
                                "Re-opening `Not Exiting` employee and setting to `Exiting`, as they re-appeared in the source data."
                      ***REMOVED***
                    );
                    context.Entry(existingEmployee).State = EntityState.Modified;
              ***REMOVED***

                // Now compare properties.
                var differentProperties = existingEmployee.PropertyCompare(newEmployee);

                if (differentProperties.Count() == 0)
                ***REMOVED***
                    // Case B1. No changes on any fields. Don't do anything.
              ***REMOVED***
                else
                ***REMOVED***
                    // Case B2. Changes on some fields. Update the user.
                    // TODO: This lets us have very discrete control over exactly
                    // which property values get copied in. However, it is a bit
                    // complicated. We could also explore using something like
                    // entry.SetValues().

                    // While updating fields, also keep track of which fields
                    // were updated from old to new values.
                    List<string> fieldsUpdatedList = new List<string>();
                    foreach (PropertyVariance pv in differentProperties)
                    ***REMOVED***
                        // Note: we don't log if the email address was set to
                        // empty, because if it is empty, it will automatically
                        // be reset when the user is saved.
                        if (
                            string.Equals(pv.PropertyInfo.Name, nameof(Employee.GovernmentEmail))
                            && string.IsNullOrWhiteSpace(pv.ValueB as string)
                        )
                        ***REMOVED***
                            continue;
                      ***REMOVED***

                        var newValue = pv.PropertyInfo.GetValue(newEmployee);

                        if (newValue == null)
                            continue;

                        if (existingEmployee.IsActive())
                        ***REMOVED***
                            // Only actually set the field if the employee is
                            // active. Otherwise, we still want to log that the
                            // field would have been updated, so we can report
                            // on it (see below).
                            pv.PropertyInfo.SetValue(existingEmployee, newValue);
                      ***REMOVED***
                        fieldsUpdatedList.Add(
                            $"***REMOVED***pv.PropertyInfo.Name***REMOVED***: `***REMOVED***pv.ValueA***REMOVED***` → `***REMOVED***pv.ValueB***REMOVED***`"
                        );
                  ***REMOVED***

                    // Now update the preferred fields when they've not already
                    // been overwritten by the admin. See the definition of
                    // the UpdatePreferredFields method for logic.
                    existingEmployee.UpdatePreferredFields();

                    // If there is > 1 field updated, update the object (note
                    // that if just email was set to ``, we might have no
                    // updated fields).
                    if (fieldsUpdatedList.Count > 0)
                    ***REMOVED***
                        var fieldsUpdated = String.Join(", ", fieldsUpdatedList);
                        var comment = $"Fields updated by script: ***REMOVED***fieldsUpdated***REMOVED***.";

                        // If the user is in a final state, log this as a
                        // mistake instead.
                        if (
                            !existingEmployee.IsActive()
                            && !existingEmployee.TriedToUpdateInFinalState
                        )
                        ***REMOVED***
                            comment =
                                $"These fields would have been updated, "
                                + $"but they were not as this user is in a "
                                + $"final state: ***REMOVED***fieldsUpdated***REMOVED***. The "
                                + $"TriedToUpdateInFinalState flag was set. "
                                + "No more updates of this kind will be logged.";

                            existingEmployee.TriedToUpdateInFinalState = true;
                            // Create a new timeline entry.
                            context.EmployeeTimelineEntries.Add(
                                new EmployeeTimelineEntry
                                ***REMOVED***
                                    EmployeeId = existingEmployee.Id,
                                    EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                                    EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                                    Comment = comment
                              ***REMOVED***
                            );

                            context.Entry(existingEmployee).State = EntityState.Modified;
                      ***REMOVED***

                        // Save changes to employee and the new timeline entry.
                        if (
                            existingEmployee.IsActive()
                            || !existingEmployee.TriedToUpdateInFinalState
                        )
                        ***REMOVED***
                            // Create a new timeline entry.
                            context.EmployeeTimelineEntries.Add(
                                new EmployeeTimelineEntry
                                ***REMOVED***
                                    EmployeeId = existingEmployee.Id,
                                    EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                                    EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                                    Comment = comment
                              ***REMOVED***
                            );

                            context.Entry(existingEmployee).State = EntityState.Modified;
                            await context.SaveChangesAsync();
                      ***REMOVED***
                        else
                        ***REMOVED***
                            continue;
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***

                // Regardless, update the survey.
                updatedEmployeesList.Add(existingEmployee);
          ***REMOVED***

            if (updatedEmployeesList.Count() > 0)
            ***REMOVED***
                // Update surveys.
                var result = await callWeb.UpdateSurveys(updatedEmployeesList);

                // Save context.
                await context.SaveChangesAsync();
          ***REMOVED***

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                candidateEmployees.Count(),
                updatedEmployeesList,
                exceptionList
            );
      ***REMOVED***

        private async Task<List<Employee>> SaveStatusesAndAddTimelineEntries(
            IEnumerable<Tuple<Employee, EmployeeStatusEnum>> employeesWithStatuses
        )
        ***REMOVED***
            var employees = new List<Employee>();

            foreach (var tuple in employeesWithStatuses)
            ***REMOVED***
                var employee = tuple.Item1;
                var newStatus = tuple.Item2;

                var newStatusCode = newStatus.Code;
                var oldStatusCode = employee.CurrentEmployeeStatusCode;

                // Update employee status.
                employee.CurrentEmployeeStatusCode = newStatusCode;

                // Create a new timeline entry.
                employee.TimelineEntries.Add(
                    new EmployeeTimelineEntry
                    ***REMOVED***
                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                        EmployeeStatusCode = newStatusCode,
                        Comment =
                            $"Status updated by script: " + $"***REMOVED***oldStatusCode***REMOVED*** → ***REMOVED***newStatusCode***REMOVED***."
                  ***REMOVED***
                );
                context.Entry(employee).State = EntityState.Modified;

                employees.Add(employee);
          ***REMOVED***

            if (employees.Count() > 0)
            ***REMOVED***
                // Update in CallWeb.
                await callWeb.UpdateSurveys(employees);

                // Save.
                await context.SaveChangesAsync();
          ***REMOVED***

            return employees;
      ***REMOVED***

        private async Task<List<Employee>> UpdateEmployeeStatuses(
            List<Tuple<Employee, string>> surveyStatusCodes
        )
        ***REMOVED***
            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            foreach (var tuple in surveyStatusCodes)
            ***REMOVED***
                var employee = tuple.Item1;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                ***REMOVED***
                    throw new NullCallWebStatusCodeException(
                        $"Received a null CallWeb status code for employee $***REMOVED***employee.FullName***REMOVED*** ($***REMOVED***employee.GovernmentEmployeeId***REMOVED***)"
                    );
              ***REMOVED***

                // First, check if the employee has completed the survey.
                if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                ***REMOVED***
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
                    continue;
              ***REMOVED***

                if (
                    employee.EffectiveDate.AddDays(thresholdInDays) < DateTime.UtcNow
                    && employee.CurrentEmployeeStatusCode != EmployeeStatusEnum.Expired.Code
                )
                ***REMOVED***
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
                    continue;
              ***REMOVED***

                // Conversely, re-open expired users if they are now inside the
                // threshold, for instance if the threshold was extended.
                if (
                    employee.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code
                    && employee.EffectiveDate.AddDays(thresholdInDays) > DateTime.UtcNow
                )
                ***REMOVED***
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
                    continue;
              ***REMOVED***
          ***REMOVED***

            var employees = await SaveStatusesAndAddTimelineEntries(employeesToSave);

            return employees;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateEmployeeStatuses()
        ***REMOVED***
            var updatedEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            // For all non-final employees employees, update.
            var candidateEmployees = context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(
                    e =>
                        (e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                        // TODO: We are still investigating if this should be removed.
                        // See https://github.com/bcgov/ExitSurveyAdmin/issues/208
                        || (e.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code)
                )
                .ToList();

            var BATCH_SIZE = 100;
            var NUM_BATCHES = (int)Math.Ceiling((double)candidateEmployees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = candidateEmployees
                    .Skip(i * BATCH_SIZE)
                    .Take(BATCH_SIZE)
                    .ToList();

                var surveyStatusCodes = await callWeb.GetSurveyStatusCodes(employeesInBatch);
                var updateResult = await UpdateEmployeeStatuses(surveyStatusCodes);

                updatedEmployeeList.AddRange(updateResult);

                // foreach (var tuple in updateResult)
                // ***REMOVED***
                //     var e = tuple.Item1;
                //     var status = tuple.Item2;

                //     try
                //     ***REMOVED***
                //         var employee = await UpdateEmployeeStatus(e, status);
                //         updatedEmployeeList.Add(employee);
                //   ***REMOVED***
                //     catch (Exception exception)
                //     ***REMOVED***
                //         exceptionList.Add(
                //             $"Exception updating status of employee ***REMOVED***e.FullName***REMOVED*** "
                //                 + $"(ID: ***REMOVED***e.GovernmentEmployeeId***REMOVED***): ***REMOVED***exception.GetType()***REMOVED***: ***REMOVED***exception.Message***REMOVED*** "
                //         );
                //   ***REMOVED***
                // ***REMOVED***
          ***REMOVED***

            return new EmployeeTaskResult(
                TaskEnum.RefreshStatuses,
                candidateEmployees.Count,
                candidateEmployees,
                exceptionList
            );
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateNotExiting(
            List<Employee> reconciledEmployeeList
        )
        ***REMOVED***
            var updatedEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            var activeDBEmployeesNotInCsv = context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                .ToList()
                .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                .ToList();

            var employeesWithStatuses = activeDBEmployeesNotInCsv.Select(
                e => Tuple.Create(e, EmployeeStatusEnum.NotExiting)
            );

            await SaveStatusesAndAddTimelineEntries(employeesWithStatuses);

            // foreach (Employee e in activeDBEmployeesNotInCsv)
            // ***REMOVED***
            //     try
            //     ***REMOVED***
            //         var employee = await SaveStatusAndAddTimelineEntry(
            //             e,
            //             EmployeeStatusEnum.NotExiting
            //         );
            //         updatedEmployeeList.Add(employee);
            //   ***REMOVED***
            //     catch (Exception exception)
            //     ***REMOVED***
            //         exceptionList.Add(
            //             $"Exception updating non-exiting employee ***REMOVED***e.FullName***REMOVED*** "
            //                 + $"(ID: ***REMOVED***e.GovernmentEmployeeId***REMOVED***): ***REMOVED***exception.GetType()***REMOVED***: ***REMOVED***exception.Message***REMOVED*** "
            //         );
            //   ***REMOVED***
            // ***REMOVED***

            return new EmployeeTaskResult(
                TaskEnum.UpdateNotExiting,
                activeDBEmployeesNotInCsv.Count,
                updatedEmployeeList,
                exceptionList
            );
      ***REMOVED***
  ***REMOVED***
***REMOVED***
