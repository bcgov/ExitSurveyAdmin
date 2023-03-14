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
                    if (existingEmployee.IsStatusSurveyComplete())
                    ***REMOVED***
                        // Add them to the ignored list
                        taskResult.AddIgnored(existingEmployee);
                        continue;
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
                                // We'll need to update the survey, too.
                                needsSurveyUpdate = true;
                          ***REMOVED***
                      ***REMOVED***
                        else
                        ***REMOVED***
                            if (!needsSurveyUpdate)
                            ***REMOVED***
                                taskResult.Ignored.Add(existingEmployee);
                                continue;
                          ***REMOVED***
                      ***REMOVED***
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
                    // Add to ignored list.
                    taskResult.Ignored.Add(existingEmployee);
              ***REMOVED***
          ***REMOVED***

            // Update surveys.
            if (employeesNeedingSurveyUpdate.Count() > 0)
            ***REMOVED***
                taskResult.AddFinal(
                    await callWeb.UpdateSurveys(employeesNeedingSurveyUpdate.ToList())
                );
          ***REMOVED***

            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ReconcileEmployees);
            employeeTaskResult.AddTaskResult(taskResult);
            return employeeTaskResult;
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

        public async Task<TaskResult<Employee>> SaveEmployeeStatusesAndUpdateCallWeb(
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

        public List<Employee> ActiveEmployees()
        ***REMOVED***
            return context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => (e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal))
                .ToList();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
