using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ExitSurveyAdmin.Services.CallWeb;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeUpdateService
    {
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;

        public EmployeeUpdateService(ExitSurveyAdminContext context, CallWebService callWeb)
        {
            this.context = context;
            this.callWeb = callWeb;
        }

        // Update existing employees. The first Employee in the tuple is an
        // existing employee; the second is that same Employee, but with
        // possibly-updated fields (as from e.g. a JSON or CSV load).
        public async Task<EmployeeTaskResult> UpdateExistingEmployees(
            List<Tuple<Employee, Employee>> employees
        )
        {
            var taskResult = new TaskResult<Employee>();

            var employeesNeedingSurveyUpdate = new List<Employee>();

            foreach (var tuple in employees)
            {
                var existingEmployee = tuple.Item1;
                var newEmployee = tuple.Item2;

                var needsSurveyUpdate = false;

                try
                {
                    // If the employee is marked as "survey complete," skip them.
                    if (
                        existingEmployee.CurrentEmployeeStatusCode
                        == EmployeeStatusEnum.SurveyComplete.Code
                    )
                    {
                        // However, they are still successful.
                        taskResult.Succeeded.Add(existingEmployee);
                        continue;
                    }

                    // If the employee is marked as "not exiting," update their
                    // status back to "exiting".
                    if (
                        existingEmployee.CurrentEmployeeStatusCode
                        == EmployeeStatusEnum.NotExiting.Code
                    )
                    {
                        existingEmployee.CurrentEmployeeStatusCode = EmployeeStatusEnum
                            .Exiting
                            .Code;
                        context.EmployeeTimelineEntries.Add(
                            new EmployeeTimelineEntry
                            {
                                EmployeeId = existingEmployee.Id,
                                EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                                EmployeeStatusCode = EmployeeStatusEnum.Exiting.Code,
                                Comment =
                                    "Re-opening `Not Exiting` employee and setting to `Exiting`, as they re-appeared in the source data."
                            }
                        );
                        context.Entry(existingEmployee).State = EntityState.Modified;
                        await context.SaveChangesAsync();

                        // They also need their survey updated.
                        needsSurveyUpdate = true;
                    }

                    // Now compare properties.
                    var differentProperties = existingEmployee.PropertyCompare(newEmployee);

                    if (differentProperties.Count() == 0)
                    {
                        // Case 1. No changes on any fields. Don't do anything.
                    }
                    else
                    {
                        // Case 2. Changes on some fields. Update the user.
                        // TODO: This lets us have very discrete control over exactly
                        // which property values get copied in. However, it is a bit
                        // complicated. We could also explore using something like
                        // entry.SetValues().

                        // While updating fields, also keep track of which fields
                        // were updated from old to new values.
                        List<string> fieldsUpdatedList = new List<string>();
                        foreach (PropertyVariance pv in differentProperties)
                        {
                            // Note: we don't log if the email address was set to
                            // empty, because if it is empty, it will automatically
                            // be reset when the user is saved.
                            if (
                                string.Equals(
                                    pv.PropertyInfo.Name,
                                    nameof(Employee.GovernmentEmail)
                                ) && string.IsNullOrWhiteSpace(pv.ValueB as string)
                            )
                            {
                                continue;
                            }

                            var newValue = pv.PropertyInfo.GetValue(newEmployee);

                            if (newValue == null)
                                continue;

                            if (existingEmployee.IsActive())
                            {
                                // Only actually set the field if the employee is
                                // active. Otherwise, we still want to log that the
                                // field would have been updated, so we can report
                                // on it (see below).
                                pv.PropertyInfo.SetValue(existingEmployee, newValue);
                            }
                            fieldsUpdatedList.Add(
                                $"{pv.PropertyInfo.Name}: `{pv.ValueA}` → `{pv.ValueB}`"
                            );
                        }

                        // Now update the preferred fields when they've not already
                        // been overwritten by the admin. See the definition of
                        // the UpdatePreferredFields method for logic.
                        existingEmployee.UpdatePreferredFields();

                        // If there is > 1 field updated, update the object (note
                        // that if just email was set to ``, we might have no
                        // updated fields).
                        if (fieldsUpdatedList.Count > 0)
                        {
                            var fieldsUpdated = String.Join(", ", fieldsUpdatedList);
                            var comment = $"Fields updated by script: {fieldsUpdated}.";

                            // If the user is in a final state, log this as a
                            // mistake instead.
                            if (
                                !existingEmployee.IsActive()
                                && !existingEmployee.TriedToUpdateInFinalState
                            )
                            {
                                comment =
                                    $"These fields would have been updated, "
                                    + $"but they were not as this user is in a "
                                    + $"final state: {fieldsUpdated}. The "
                                    + $"TriedToUpdateInFinalState flag was set. "
                                    + "No more updates of this kind will be logged.";

                                existingEmployee.TriedToUpdateInFinalState = true;
                                // Create a new timeline entry.
                                context.EmployeeTimelineEntries.Add(
                                    new EmployeeTimelineEntry
                                    {
                                        EmployeeId = existingEmployee.Id,
                                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                                        EmployeeStatusCode =
                                            existingEmployee.CurrentEmployeeStatusCode,
                                        Comment = comment
                                    }
                                );
                                await context.SaveChangesAsync();
                            }

                            // Save changes to employee and the new timeline entry.
                            if (
                                existingEmployee.IsActive()
                                || !existingEmployee.TriedToUpdateInFinalState
                            )
                            {
                                // Create a new timeline entry.
                                context.EmployeeTimelineEntries.Add(
                                    new EmployeeTimelineEntry
                                    {
                                        EmployeeId = existingEmployee.Id,
                                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                                        EmployeeStatusCode =
                                            existingEmployee.CurrentEmployeeStatusCode,
                                        Comment = comment
                                    }
                                );
                                await context.SaveChangesAsync();
                            }
                            else
                            {
                                continue;
                            }
                        }

                        // We'll need to update the survey, too.
                        needsSurveyUpdate = true;
                    }
                }
                catch (Exception exception)
                {
                    taskResult.AddFailedWithException(
                        existingEmployee,
                        new Exception(
                            $"Exception while updating survey status for {existingEmployee}: {exception.Message}"
                        )
                    );
                }

                if (needsSurveyUpdate)
                {
                    employeesNeedingSurveyUpdate.Add(existingEmployee);
                }
                else
                {
                    taskResult.Succeeded.Add(existingEmployee);
                }
            }

            // Update surveys.
            if (employeesNeedingSurveyUpdate.Count() > 0)
            {
                taskResult.AddFinal(
                    await callWeb.UpdateSurveys(employeesNeedingSurveyUpdate.ToList())
                );
            }

            var employeeTaskResult = new EmployeeTaskResult(TaskEnum.ReconcileEmployees);
            employeeTaskResult.AddTaskResult(taskResult);
            return employeeTaskResult;
        }

        public async Task<TaskResult<Employee>> UpdateEmployeeSurveyStatuses(
            List<Tuple<Employee, string>> employeeResultsWithSurveyStatusCodes
        )
        {
            var taskResult = new TaskResult<Employee>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var tuple in employeeResultsWithSurveyStatusCodes)
            {
                var employee = tuple.Item1;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                {
                    // The employee does not have a valid status code.
                    taskResult.AddFailedWithException(
                        employee,
                        new NullCallWebStatusCodeException($"No status code for ${employee}")
                    );
                    continue;
                }
                if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                {
                    // First, check if the employee has completed the survey.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
                    continue;
                }
                if (employee.IsPastExpiryThreshold(thresholdInDays))
                {
                    // If their effective date is past the expiry threshold, expire.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
                    continue;
                }
                if (employee.IsNowInsideExpiryThreshold(thresholdInDays))
                {
                    // Conversely, re-open expired users if they are now inside the
                    // threshold, for instance if the threshold was extended.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
                    continue;
                }
            }

            taskResult.AddFinal(await SaveStatusesAndAddTimelineEntries(employeesToSave));

            return taskResult;
        }

        public async Task<TaskResult<Employee>> SaveStatusesAndAddTimelineEntries(
            List<Tuple<Employee, EmployeeStatusEnum>> employeesWithStatuses
        )
        {
            var taskResult = new TaskResult<Employee>();

            var employeesToUpdate = new List<Employee>();

            // First, update the status and add a timeline entry.
            foreach (var tuple in employeesWithStatuses)
            {
                var employee = tuple.Item1;
                var newStatus = tuple.Item2;

                var newStatusCode = newStatus.Code;
                var oldStatusCode = employee.CurrentEmployeeStatusCode;

                // Update employee status.
                employee.CurrentEmployeeStatusCode = newStatusCode;

                // Create a new timeline entry.
                employee.TimelineEntries.Add(
                    new EmployeeTimelineEntry
                    {
                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                        EmployeeStatusCode = newStatusCode,
                        Comment =
                            $"Status updated by script: " + $"{oldStatusCode} → {newStatusCode}."
                    }
                );

                employeesToUpdate.Add(employee);
            }

            // Update in CallWeb.
            var employeesToSave = taskResult.AddIncremental(
                await callWeb.UpdateSurveys(employeesToUpdate)
            );

            taskResult.AddFinal(await SaveExistingEmployees(employeesToSave));

            return taskResult;
        }

        private async Task<int> ExpiryThresholdInDays()
        {
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            return thresholdInDays;
        }

        public async Task<TaskResult<Employee>> SaveExistingEmployees(List<Employee> employees)
        {
            var taskResult = new TaskResult<Employee>();

            try
            {
                employees.Select(e => context.Entry(e).State = EntityState.Modified);
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
