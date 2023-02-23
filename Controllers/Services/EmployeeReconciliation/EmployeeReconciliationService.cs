using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeReconciliationService
    {
        private LoggingService logger;
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;
        private EmployeeInfoLookupService infoLookupService;

        public EmployeeReconciliationService(
            LoggingService logger,
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService
        )
        {
            this.context = context;
            this.callWeb = callWeb;
            this.logger = logger;
            this.infoLookupService = infoLookupService;
        }

        // NB. For reconciliation purposes, existence is determined by the
        // combination of EmployeeId, ExitCount, and record count.
        private Employee EmployeeExists(Employee candidate)
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

        public async Task<Employee> SaveStatusAndAddTimelineEntry(
            Employee employee,
            EmployeeStatusEnum newStatus
        )
        {
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
                    Comment = $"Status updated by script: " + $"{oldStatusCode} → {newStatusCode}."
                }
            );
            context.Entry(employee).State = EntityState.Modified;

            // Update in CallWeb.
            await callWeb.UpdateSurvey(employee);

            // Save.
            await context.SaveChangesAsync();

            return employee;
        }

        public async Task<EmployeeTaskResult> ReconcileEmployeesAndLog(
            TaskEnum callingTask,
            List<Employee> candidateEmployees
        )
        {
            var taskResult = await ReconcileEmployees(candidateEmployees);
            taskResult.Task = callingTask;
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        public async Task<EmployeeTaskResult> ReconcileEmployees(List<Employee> employees)
        {
            var reconciledEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            // Insert and update employees.
            foreach (Employee e in employees)
            {
                try
                {
                    var employee = await ReconcileWithDatabase(e);
                    reconciledEmployeeList.Add(employee);
                }
                catch (Exception exception)
                {
                    exceptionList.Add(
                        $"Exception with candidate employee {e.FullName} "
                            + $"(ID: {e.GovernmentEmployeeId}): {exception} "
                    );
                }
            }

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                employees.Count,
                reconciledEmployeeList,
                exceptionList
            );
        }

        private async Task<Employee> ReconcileWithDatabase(Employee employee)
        {
            // Get the existing employee, if it exists.
            var existingEmployee = EmployeeExists(employee);

            if (existingEmployee == null)
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

                // Try to insert a row into CallWeb, and set the telkey.
                try
                {
                    employee.Telkey = await callWeb.CreateSurvey(employee);
                }
                catch (Exception e)
                {
                    throw new InvalidOperationException("Inserting a row into CallWeb failed.", e);
                }

                // Insert the employee into the database, along with an
                // appropriate timeline entry. Note that Ids are auto-generated.
                employee.TimelineEntries = new List<EmployeeTimelineEntry>();
                employee.TimelineEntries.Add(
                    new EmployeeTimelineEntry
                    {
                        EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                        EmployeeStatusCode = newStatusCode,
                        Comment = "Created automatically by script."
                    }
                );

                context.Employees.Add(employee);

                await context.SaveChangesAsync();

                // End Case A. Return the employee.
                return employee;
            }
            else
            {
                // Case B. The unique user DOES exist in the database.

                // If the employee is marked as "survey complete," skip them.
                if (
                    existingEmployee.CurrentEmployeeStatusCode
                    == EmployeeStatusEnum.SurveyComplete.Code
                )
                {
                    return existingEmployee;
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
                    await context.SaveChangesAsync();
                    await callWeb.UpdateSurvey(existingEmployee);
                }

                // Now compare properties.
                var differentProperties = existingEmployee.PropertyCompare(employee);

                if (differentProperties.Count() == 0)
                {
                    // Case B1. No changes on any fields. Don't do anything.
                }
                else
                {
                    // Case B2. Changes on some fields. Update the user.
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

                        var newValue = pv.PropertyInfo.GetValue(employee);

                        // TODO: Remove this as necessary...?
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
                                    EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                                    Comment = comment
                                }
                            );

                            context.Entry(existingEmployee).State = EntityState.Modified;
                            await context.SaveChangesAsync();
                        }
                        else
                        {
                            return existingEmployee;
                        }

                        await callWeb.UpdateSurvey(existingEmployee);
                    }
                }

                return existingEmployee;
            }
        }

        public async Task<Employee> UpdateEmployeeStatus(Employee employee)
        {
            var callWebStatusCode = await callWeb.GetSurveyStatusCode(employee);

            if (callWebStatusCode == null)
            {
                // TODO: Fix this
                return employee;
            }

            // First, check if the employee has completed the survey.
            if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
            {
                return await SaveStatusAndAddTimelineEntry(
                    employee,
                    EmployeeStatusEnum.SurveyComplete
                );
            }

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                a => a.Key == AdminSetting.EmployeeExpirationThreshold
            );

            var thresholdInDays = System.Convert.ToInt32(employeeExpirationThresholdSetting.Value);

            if (
                employee.EffectiveDate.AddDays(thresholdInDays) < DateTime.UtcNow
                && employee.CurrentEmployeeStatusCode != EmployeeStatusEnum.Expired.Code
            )
            {
                return await SaveStatusAndAddTimelineEntry(employee, EmployeeStatusEnum.Expired);
            }

            // Conversely, re-open expired users if they are now inside the
            // threshold, for instance if the threshold was extended.
            if (
                employee.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code
                && employee.EffectiveDate.AddDays(thresholdInDays) > DateTime.UtcNow
            )
            {
                return await SaveStatusAndAddTimelineEntry(employee, EmployeeStatusEnum.Exiting);
            }

            return employee;
        }

        public async Task UpdateNotExiting(List<Employee> reconciledEmployeeList)
        {
            var activeDBEmployeesNotInCsv = context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                .ToList()
                .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                .ToList();

            foreach (Employee e in activeDBEmployeesNotInCsv)
            {
                var employee = await SaveStatusAndAddTimelineEntry(
                    e,
                    EmployeeStatusEnum.NotExiting
                );
            }
        }

        public async Task<EmployeeTaskResult> UpdateEmployeeStatusesAndLog()
        {
            var taskResult = await UpdateEmployeeStatuses();
            await logger.LogEmployeeTaskResult(taskResult);
            return taskResult;
        }

        public async Task<EmployeeTaskResult> UpdateEmployeeStatuses()
        {
            var updatedEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            // For all non-final employees employees, update.
            var candidateEmployees = context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(
                    e => (e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                // TODO: We are still investigating if this should be removed.
                // See https://github.com/bcgov/ExitSurveyAdmin/issues/208
                // || (e.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code)
                )
                .ToList();

            foreach (Employee e in candidateEmployees)
            {
                try
                {
                    var employee = await UpdateEmployeeStatus(e);
                    updatedEmployeeList.Add(employee);
                }
                catch (Exception exception)
                {
                    exceptionList.Add(
                        $"Exception updating status of employee {e.FullName} "
                            + $"(ID: {e.GovernmentEmployeeId}): {exception.GetType()}: {exception.Message} "
                    );
                }
            }

            return new EmployeeTaskResult(
                TaskEnum.RefreshStatuses,
                candidateEmployees.Count,
                updatedEmployeeList,
                exceptionList
            );
        }
    }
}
