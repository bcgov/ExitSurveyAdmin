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
            var employeesNeedingSurveyUpdate = new List<Employee>();
            var exceptionList = new List<string>();

            foreach (var tuple in employees)
            {
                var existingEmployee = tuple.Item1;
                var newEmployee = tuple.Item2;

                // If the employee is marked as "survey complete," skip them.
                if (
                    existingEmployee.CurrentEmployeeStatusCode
                    == EmployeeStatusEnum.SurveyComplete.Code
                )
                {
                    continue;
                }

                // If the employee is marked as "not exiting," update their
                // status back to "exiting".
                if (
                    existingEmployee.CurrentEmployeeStatusCode == EmployeeStatusEnum.NotExiting.Code
                )
                {
                    existingEmployee.CurrentEmployeeStatusCode = EmployeeStatusEnum.Exiting.Code;
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

                    // They also need their survey updated.
                    employeesNeedingSurveyUpdate.Add(existingEmployee);
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
                            string.Equals(pv.PropertyInfo.Name, nameof(Employee.GovernmentEmail))
                            && string.IsNullOrWhiteSpace(pv.ValueB as string)
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
                                    EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                                    Comment = comment
                                }
                            );

                            context.Entry(existingEmployee).State = EntityState.Modified;
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
                                    EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                                    Comment = comment
                                }
                            );

                            context.Entry(existingEmployee).State = EntityState.Modified;
                            await context.SaveChangesAsync();
                        }
                        else
                        {
                            continue;
                        }
                    }

                    // We'll need to update the survey, too.
                    employeesNeedingSurveyUpdate.Add(existingEmployee);
                }
            }

            // Update surveys.
            var updatedEmployeesList = new List<Employee>();
            if (employeesNeedingSurveyUpdate.Count() > 0)
            {
                var results = await callWeb.UpdateSurveys(employeesNeedingSurveyUpdate);
                foreach (var employeeResult in results)
                {
                    if (employeeResult.HasExceptions)
                    {
                        exceptionList.Add(employeeResult.Message);
                    }
                    else
                    {
                        updatedEmployeesList.Add(employeeResult.Employee);
                    }
                }
            }

            // Save the context.
            await context.SaveChangesAsync();

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employeesNeedingSurveyUpdate.Count(),
                updatedEmployeesList,
                exceptionList
            );
        }

        public async Task<EmployeeTaskResult> RefreshCallWebStatus()
        {
            var processedEmployeesList = new List<EmployeeResult>();
            var exceptionList = new List<string>();

            // For all non-final employees, update.
            var employees = EmployeesNeedingCallWebRefresh();

            // Do this in a batch, working with 100 employees at a time.
            var BATCH_SIZE = 100;
            var NUM_BATCHES = (int)Math.Ceiling((double)employees.Count() / BATCH_SIZE);
            for (var i = 0; i < NUM_BATCHES; i++)
            {
                var employeesInBatch = employees.Skip(i * BATCH_SIZE).Take(BATCH_SIZE).ToList();

                // Step 1. Get the status codes for the employees.
                var employeesWithSurveyStatusCodes = new List<Tuple<EmployeeResult, string>>();
                try
                {
                    employeesWithSurveyStatusCodes = await callWeb.GetSurveyStatusCodes(
                        employeesInBatch
                    );
                }
                catch (Exception exception)
                {
                    exceptionList.Add(
                        $"Could not update surveys from CallWeb for the following employees. Error: {exception.Message}"
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
                }

                // Step 2. Update the statuses.
                var updateResult = await UpdateEmployeeSurveyStatuses(
                    employeesWithSurveyStatusCodes
                );

                processedEmployeesList.AddRange(updateResult);
            }

            var updatedEmployeesList = new List<Employee>();
            foreach (var employeeResult in processedEmployeesList)
            {
                if (employeeResult.HasExceptions)
                {
                    exceptionList.Add(employeeResult.Message);
                }
                else
                {
                    updatedEmployeesList.Add(employeeResult.Employee);
                }
            }

            return new EmployeeTaskResult(
                TaskEnum.RefreshStatuses,
                employees.Count,
                updatedEmployeesList,
                exceptionList
            );
        }

        private async Task<List<EmployeeResult>> UpdateEmployeeSurveyStatuses(
            List<Tuple<EmployeeResult, string>> employeeResultsWithSurveyStatusCodes
        )
        {
            var processedEmployees = new List<EmployeeResult>();
            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var thresholdInDays = await ExpiryThresholdInDays();

            foreach (var tuple in employeeResultsWithSurveyStatusCodes)
            {
                var employeeResult = tuple.Item1;
                var employee = employeeResult.Employee;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                {
                    // The employee does not have a valid status code.
                    processedEmployees.Add(employeeResult);
                }
                else if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                {
                    // First, check if the employee has completed the survey.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
                }
                else if (employee.IsPastExpiryThreshold(thresholdInDays))
                {
                    // If their effective date is past the expiry threshold, expire.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
                }
                else if (employee.IsNowInsideExpiryThreshold(thresholdInDays))
                {
                    // Conversely, re-open expired users if they are now inside the
                    // threshold, for instance if the threshold was extended.
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
                }
                else
                {
                    // We don't need to do anything with this employee, but we have
                    // still processed them.
                    processedEmployees.Add(employeeResult);
                }
            }

            var employeeResults = await SaveStatusesAndAddTimelineEntries(employeesToSave);
            processedEmployees.AddRange(employeeResults);

            return processedEmployees;
        }

        public async Task<EmployeeTaskResult> UpdateNotExiting(
            List<Employee> reconciledEmployeeList
        )
        {
            var activeEmployeesNotInList = NotExitingEmployees(reconciledEmployeeList);

            var employeesWithStatuses = activeEmployeesNotInList
                .Select(e => Tuple.Create(e, EmployeeStatusEnum.NotExiting))
                .ToList();

            var updatedEmployees = await SaveStatusesAndAddTimelineEntries(employeesWithStatuses);

            var updatedEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            foreach (var employeeResult in updatedEmployees)
            {
                if (employeeResult.HasExceptions)
                {
                    exceptionList.Add(employeeResult.Message);
                }
                else
                {
                    updatedEmployeeList.Add(employeeResult.Employee);
                }
            }

            return new EmployeeTaskResult(
                TaskEnum.UpdateNotExiting,
                activeEmployeesNotInList.Count,
                updatedEmployeeList,
                exceptionList
            );
        }

        private async Task<List<EmployeeResult>> SaveStatusesAndAddTimelineEntries(
            List<Tuple<Employee, EmployeeStatusEnum>> employeesWithStatuses
        )
        {
            var employeesToUpdate = new List<Employee>();

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
                context.Entry(employee).State = EntityState.Modified;
                employeesToUpdate.Add(employee);
            }

            // Update in CallWeb. We will use these EmployeeResults.
            var results = await callWeb.UpdateSurveys(employeesToUpdate);

            // Save.
            await context.SaveChangesAsync();

            return results;
        }

        private async Task<int> ExpiryThresholdInDays()
        {
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );
            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            return thresholdInDays;
        }

        private List<Employee> EmployeesNeedingCallWebRefresh()
        {
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
        }

        private List<Employee> NotExitingEmployees(List<Employee> reconciledEmployeeList)
        {
            return context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                .ToList()
                .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                .ToList();
        }
    }
}
