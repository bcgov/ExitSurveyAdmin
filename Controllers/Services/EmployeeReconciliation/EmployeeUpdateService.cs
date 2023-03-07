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
            var taskResult = new TaskResult<Employee>();

            var employeesNeedingSurveyUpdate = new List<Employee>();

            foreach (var tuple in employees)
            ***REMOVED***
                var existingEmployee = tuple.Item1;
                var newEmployee = tuple.Item2;

                var needsSurveyUpdate = false;

                try
                ***REMOVED***
                    // If the employee is marked as "survey complete," skip them.
                    if (
                        existingEmployee.CurrentEmployeeStatusCode
                        == EmployeeStatusEnum.SurveyComplete.Code
                    )
                    ***REMOVED***
                        // However, they are still successful.
                        taskResult.Succeeded.Add(existingEmployee);
                        continue;
                  ***REMOVED***

                    // If the employee is marked as "not exiting," update their
                    // status back to "exiting".
                    if (
                        existingEmployee.CurrentEmployeeStatusCode
                        == EmployeeStatusEnum.NotExiting.Code
                    )
                    ***REMOVED***
                        existingEmployee.CurrentEmployeeStatusCode = EmployeeStatusEnum
                            .Exiting
                            .Code;
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
                        await context.SaveChangesAsync();

                        // They also need their survey updated.
                        needsSurveyUpdate = true;
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
                                string.Equals(
                                    pv.PropertyInfo.Name,
                                    nameof(Employee.GovernmentEmail)
                                ) && string.IsNullOrWhiteSpace(pv.ValueB as string)
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
                                        EmployeeStatusCode =
                                            existingEmployee.CurrentEmployeeStatusCode,
                                        Comment = comment
                                  ***REMOVED***
                                );
                                await context.SaveChangesAsync();
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
                                        EmployeeStatusCode =
                                            existingEmployee.CurrentEmployeeStatusCode,
                                        Comment = comment
                                  ***REMOVED***
                                );
                                await context.SaveChangesAsync();
                          ***REMOVED***
                            else
                            ***REMOVED***
                                continue;
                          ***REMOVED***
                      ***REMOVED***

                        // We'll need to update the survey, too.
                        // TODO: Does this need to be done for *everyone*?
                        needsSurveyUpdate = true;
                  ***REMOVED***
              ***REMOVED***
                catch (Exception exception)
                ***REMOVED***
                    taskResult.AddFailedWithException(
                        existingEmployee,
                        new Exception(
                            $"Exception while updating survey status for ***REMOVED***existingEmployee***REMOVED***: ***REMOVED***exception.Message***REMOVED***"
                        )
                    );
              ***REMOVED***

                if (needsSurveyUpdate)
                ***REMOVED***
                    employeesNeedingSurveyUpdate.Add(existingEmployee);
              ***REMOVED***
                else
                ***REMOVED***
                    taskResult.Succeeded.Add(existingEmployee);
              ***REMOVED***
          ***REMOVED***

            // Update surveys.
            if (employeesNeedingSurveyUpdate.Count() > 0)
            ***REMOVED***
                taskResult.AddFinal(
                    await callWeb.UpdateSurveys(employeesNeedingSurveyUpdate.ToList())
                );
                // TODO: Can we just add incremental step here...? Do we need
                // to worry about other employees...?
          ***REMOVED***

            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ReconcileEmployees);
            employeeTaskResult.AddTaskResult(taskResult);
            return employeeTaskResult;
      ***REMOVED***

        public async Task<TaskResult<Employee>> UpdateEmployeeSurveyStatuses(
            List<Tuple<Employee, string>> employeeResultsWithSurveyStatusCodes
        )
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var tuple in employeeResultsWithSurveyStatusCodes)
            ***REMOVED***
                var employee = tuple.Item1;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                ***REMOVED***
                    // The employee does not have a valid status code.
                    taskResult.AddFailedWithException(
                        employee,
                        new NullCallWebStatusCodeException($"No status code for $***REMOVED***employee***REMOVED***")
                    );
                    continue;
              ***REMOVED***
                if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                ***REMOVED***
                    // First, check if the employee has completed the survey.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
                    continue;
              ***REMOVED***
                if (employee.IsPastExpiryThreshold(thresholdInDays))
                ***REMOVED***
                    // If their effective date is past the expiry threshold, expire.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
                    continue;
              ***REMOVED***
                if (employee.IsNowInsideExpiryThreshold(thresholdInDays))
                ***REMOVED***
                    // Conversely, re-open expired users if they are now inside the
                    // threshold, for instance if the threshold was extended.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
                    continue;
              ***REMOVED***
          ***REMOVED***

            taskResult.AddFinal(await SaveStatusesAndAddTimelineEntries(employeesToSave));

            return taskResult;
      ***REMOVED***

        public async Task<TaskResult<Employee>> SaveStatusesAndAddTimelineEntries(
            List<Tuple<Employee, EmployeeStatusEnum>> employeesWithStatuses
        )
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            var employeesToUpdate = new List<Employee>();

            // First, update the status and add a timeline entry.
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

                employeesToUpdate.Add(employee);
          ***REMOVED***

            // Update in CallWeb.
            var employeesToSave = taskResult.AddIncremental(
                await callWeb.UpdateSurveys(employeesToUpdate)
            );

            taskResult.AddFinal(await SaveExistingEmployees(employeesToSave));

            return taskResult;
      ***REMOVED***

        private async Task<int> ExpiryThresholdInDays()
        ***REMOVED***
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            return thresholdInDays;
      ***REMOVED***

        public async Task<TaskResult<Employee>> SaveExistingEmployees(List<Employee> employees)
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            try
            ***REMOVED***
                employees.Select(e => context.Entry(e).State = EntityState.Modified);
                await context.SaveChangesAsync();
                taskResult.AddSucceeded(employees);
          ***REMOVED***
            catch (Exception exception)
            ***REMOVED***
                // Assume saving all employees failed.
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
