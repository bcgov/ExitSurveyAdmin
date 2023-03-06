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

        public EmployeeUpdateService(ExitSurveyAdminContext context, CallWebService callWeb)
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
      ***REMOVED***

        // Update existing employees. The first Employee in the tuple is an
        // existing employee; the second is that same Employee, but with
        // possibly-updated fields (as from e.g. a JSON or CSV load).
        public async Task<EmployeeTaskResult> UpdateExistingEmployees(
            List<Tuple<Employee, Employee>> employees
        )
        ***REMOVED***
            var employeesNeedingSurveyUpdate = new List<Employee>();
            var exceptionList = new List<string>();

            foreach (var tuple in employees)
            ***REMOVED***
                var existingEmployee = tuple.Item1;
                var newEmployee = tuple.Item2;

                // If the employee is marked as "survey complete," skip them.
                if (
                    existingEmployee.CurrentEmployeeStatusCode
                    == EmployeeStatusEnum.SurveyComplete.Code
                )
                ***REMOVED***
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

                    // They also need their survey updated.
                    employeesNeedingSurveyUpdate.Add(existingEmployee);
              ***REMOVED***

                // Now compare properties.
                var differentProperties = existingEmployee.PropertyCompare(newEmployee);

                if (differentProperties.Count() == 0)
                ***REMOVED***
                    // Case 1. No changes on any fields. Don't do anything.
              ***REMOVED***
                else
                ***REMOVED***
                    // Case 2. Changes on some fields. Update the user.
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

                    // We'll need to update the survey, too.
                    employeesNeedingSurveyUpdate.Add(existingEmployee);
              ***REMOVED***
          ***REMOVED***

            // Update surveys.
            var updatedEmployeesList = new List<Employee>();
            if (employeesNeedingSurveyUpdate.Count() > 0)
            ***REMOVED***
                var results = await callWeb.UpdateSurveys(employeesNeedingSurveyUpdate);
                foreach (var employeeResult in results)
                ***REMOVED***
                    if (employeeResult.HasExceptions)
                    ***REMOVED***
                        exceptionList.Add(employeeResult.Message);
                  ***REMOVED***
                    else
                    ***REMOVED***
                        updatedEmployeesList.Add(employeeResult.Employee);
                  ***REMOVED***
              ***REMOVED***
          ***REMOVED***

            // Save the context.
            await context.SaveChangesAsync();

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employeesNeedingSurveyUpdate.Count(),
                updatedEmployeesList,
                exceptionList
            );
      ***REMOVED***

        public async Task<EmployeeTaskResult> RefreshCallWebStatus()
        ***REMOVED***
            var processedEmployeesList = new List<EmployeeResult>();
            var exceptionList = new List<string>();

            // For all non-final employees, update.
            var employees = EmployeesNeedingCallWebRefresh();

            // Do this in a batch, working with 100 employees at a time.
            var BATCH_SIZE = 100;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            ***REMOVED***
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Get the status codes for the employees.
                var employeesWithSurveyStatusCodes = new List<Tuple<EmployeeResult, string>>();
                try
                ***REMOVED***
                    employeesWithSurveyStatusCodes = await callWeb.GetSurveyStatusCodes(
                        employeesInBatch
                    );
              ***REMOVED***
                catch (Exception exception)
                ***REMOVED***
                    exceptionList.Add(
                        $"Could not update surveys from CallWeb for the following employees. Error: ***REMOVED***exception.Message***REMOVED***"
                    );
                    processedEmployeesList.AddRange(
                        employeesInBatch.Select(
                            e =>
                                new EmployeeResult(
                                    e,
                                    new CallWebUpdateFailedException("UpdateSurveys call failed.")
                                )
                        )
                    );
                    continue; // Nothing more to do.
              ***REMOVED***

                // Step 2. Update the statuses.
                var updateResult = await UpdateEmployeeSurveyStatuses(
                    employeesWithSurveyStatusCodes
                );

                processedEmployeesList.AddRange(updateResult);
          ***REMOVED***

            var updatedEmployeesList = new List<Employee>();
            foreach (var employeeResult in processedEmployeesList)
            ***REMOVED***
                if (employeeResult.HasExceptions)
                ***REMOVED***
                    exceptionList.Add(employeeResult.Message);
              ***REMOVED***
                else
                ***REMOVED***
                    updatedEmployeesList.Add(employeeResult.Employee);
              ***REMOVED***
          ***REMOVED***

            return new EmployeeTaskResult(
                TaskEnum.RefreshStatuses,
                employees.Count,
                updatedEmployeesList,
                exceptionList
            );
      ***REMOVED***

        private async Task<List<EmployeeResult>> UpdateEmployeeSurveyStatuses(
            List<Tuple<EmployeeResult, string>> employeeResultsWithSurveyStatusCodes
        )
        ***REMOVED***
            var processedEmployees = new List<EmployeeResult>();
            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            foreach (var tuple in employeeResultsWithSurveyStatusCodes)
            ***REMOVED***
                var employeeResult = tuple.Item1;
                var employee = employeeResult.Employee;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                ***REMOVED***
                    // The employee does not have a valid status code.
                    processedEmployees.Add(employeeResult);
              ***REMOVED***
                else if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                ***REMOVED***
                    // First, check if the employee has completed the survey.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
              ***REMOVED***
                else if (employee.IsPastExpiryThreshold(thresholdInDays))
                ***REMOVED***
                    // If their effective date is past the expiry threshold, expire.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
              ***REMOVED***
                else if (employee.IsNowInsideExpiryThreshold(thresholdInDays))
                ***REMOVED***
                    // Conversely, re-open expired users if they are now inside the
                    // threshold, for instance if the threshold was extended.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
              ***REMOVED***
                else
                ***REMOVED***
                    // We don't need to do anything with this employee, but we have
                    // still processed them.
                    processedEmployees.Add(employeeResult);
              ***REMOVED***
          ***REMOVED***

            var employeeResults = await SaveStatusesAndAddTimelineEntries(employeesToSave);
            processedEmployees.AddRange(employeeResults);

            return processedEmployees;
      ***REMOVED***

        public async Task<EmployeeTaskResult> UpdateNotExiting(
            List<Employee> reconciledEmployeeList
        )
        ***REMOVED***
            var activeEmployeesNotInList = NotExitingEmployees(reconciledEmployeeList);

            var employeesWithStatuses = activeEmployeesNotInList
                .Select(e => Tuple.Create(e, EmployeeStatusEnum.NotExiting))
                .ToList();

            var updatedEmployees = await SaveStatusesAndAddTimelineEntries(employeesWithStatuses);

            var updatedEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            foreach (var employeeResult in updatedEmployees)
            ***REMOVED***
                if (employeeResult.HasExceptions)
                ***REMOVED***
                    exceptionList.Add(employeeResult.Message);
              ***REMOVED***
                else
                ***REMOVED***
                    updatedEmployeeList.Add(employeeResult.Employee);
              ***REMOVED***
          ***REMOVED***

            return new EmployeeTaskResult(
                TaskEnum.UpdateNotExiting,
                activeEmployeesNotInList.Count,
                updatedEmployeeList,
                exceptionList
            );
      ***REMOVED***

        private async Task<List<EmployeeResult>> SaveStatusesAndAddTimelineEntries(
            List<Tuple<Employee, EmployeeStatusEnum>> employeesWithStatuses
        )
        ***REMOVED***
            var employeesToUpdate = new List<Employee>();

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
                employeesToUpdate.Add(employee);
          ***REMOVED***

            // Update in CallWeb. We will use these EmployeeResults.
            var results = await callWeb.UpdateSurveys(employeesToUpdate);

            // Save.
            await context.SaveChangesAsync();

            return results;
      ***REMOVED***

        private async Task<int> ExpiryThresholdInDays()
        ***REMOVED***
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            return thresholdInDays;
      ***REMOVED***

        private List<Employee> EmployeesNeedingCallWebRefresh()
        ***REMOVED***
            return context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(
                    e => (e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                // TODO: We are still investigating if this should be removed.
                // See https://github.com/bcgov/ExitSurveyAdmin/issues/208
                // || (e.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code)
                )
                .ToList();
      ***REMOVED***

        private List<Employee> NotExitingEmployees(List<Employee> reconciledEmployeeList)
        ***REMOVED***
            return context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                .ToList()
                .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                .ToList();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
