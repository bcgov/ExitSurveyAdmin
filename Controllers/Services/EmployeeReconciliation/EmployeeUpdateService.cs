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
        private EmployeeInfoLookupService infoLookupService;
        private LoggingService logger;

        public EmployeeUpdateService(
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

        public async Task<EmployeeTaskResult> UpdateExistingEmployees(
            IEnumerable<Tuple<Employee, Employee>> candidateEmployees
        )
        {
            var updatedEmployeesList = new List<Employee>();
            var exceptionList = new List<string>();

            foreach (var tuple in candidateEmployees)
            {
                var existingEmployee = tuple.Item1;
                var newEmployee = tuple.Item2;

                // Case B. The unique user DOES exist in the database.

                // If the employee is marked as "survey complete," skip them.
                if (
                    existingEmployee.CurrentEmployeeStatusCode
                    == EmployeeStatusEnum.SurveyComplete.Code
                )
                {
                    updatedEmployeesList.Add(existingEmployee);
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
                }

                // Now compare properties.
                var differentProperties = existingEmployee.PropertyCompare(newEmployee);

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
                }

                // Regardless, update the survey.
                updatedEmployeesList.Add(existingEmployee);
            }

            if (updatedEmployeesList.Count() > 0)
            {
                // Update surveys.
                var result = await callWeb.UpdateSurveys(updatedEmployeesList);

                // Save context.
                await context.SaveChangesAsync();
            }

            return new EmployeeTaskResult(
                TaskEnum.ReconcileEmployees,
                candidateEmployees.Count(),
                updatedEmployeesList,
                exceptionList
            );
        }

        private async Task<List<Employee>> SaveStatusesAndAddTimelineEntries(
            IEnumerable<Tuple<Employee, EmployeeStatusEnum>> employeesWithStatuses
        )
        {
            var employees = new List<Employee>();

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

                employees.Add(employee);
            }

            if (employees.Count() > 0)
            {
                // Update in CallWeb.
                await callWeb.UpdateSurveys(employees);

                // Save.
                await context.SaveChangesAsync();
            }

            return employees;
        }

        private async Task<List<Employee>> UpdateEmployeeStatuses(
            List<Tuple<Employee, string>> surveyStatusCodes
        )
        {
            var employeesToSave = new List<Tuple<Employee, EmployeeStatusEnum>>();

            foreach (var tuple in surveyStatusCodes)
            {
                var employee = tuple.Item1;
                var callWebStatusCode = tuple.Item2;

                if (callWebStatusCode == null)
                {
                    throw new NullCallWebStatusCodeException(
                        $"Received a null CallWeb status code for employee ${employee.FullName} (${employee.GovernmentEmployeeId})"
                    );
                }

                // First, check if the employee has completed the survey.
                if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
                {
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.SurveyComplete));
                    continue;
                }

                // An employee only has a set amount of time to complete a survey.
                // If that time has expired, then expire the user.
                var employeeExpirationThresholdSetting = await context.AdminSettings.FirstAsync(
                    a => a.Key == AdminSetting.EmployeeExpirationThreshold
                );

                var thresholdInDays = System.Convert.ToInt32(
                    employeeExpirationThresholdSetting.Value
                );

                if (
                    employee.EffectiveDate.AddDays(thresholdInDays) < DateTime.UtcNow
                    && employee.CurrentEmployeeStatusCode != EmployeeStatusEnum.Expired.Code
                )
                {
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Expired));
                    continue;
                }

                // Conversely, re-open expired users if they are now inside the
                // threshold, for instance if the threshold was extended.
                if (
                    employee.CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code
                    && employee.EffectiveDate.AddDays(thresholdInDays) > DateTime.UtcNow
                )
                {
                    employeesToSave.Add(Tuple.Create(employee, EmployeeStatusEnum.Exiting));
                    continue;
                }
            }

            var employees = await SaveStatusesAndAddTimelineEntries(employeesToSave);

            return employees;
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
            {
                var employeesInBatch = candidateEmployees
                    .Skip(i * BATCH_SIZE)
                    .Take(BATCH_SIZE)
                    .ToList();

                var surveyStatusCodes = await callWeb.GetSurveyStatusCodes(employeesInBatch);
                var updateResult = await UpdateEmployeeStatuses(surveyStatusCodes);

                updatedEmployeeList.AddRange(updateResult);

                // foreach (var tuple in updateResult)
                // {
                //     var e = tuple.Item1;
                //     var status = tuple.Item2;

                //     try
                //     {
                //         var employee = await UpdateEmployeeStatus(e, status);
                //         updatedEmployeeList.Add(employee);
                //     }
                //     catch (Exception exception)
                //     {
                //         exceptionList.Add(
                //             $"Exception updating status of employee {e.FullName} "
                //                 + $"(ID: {e.GovernmentEmployeeId}): {exception.GetType()}: {exception.Message} "
                //         );
                //     }
                // }
            }

            return new EmployeeTaskResult(
                TaskEnum.RefreshStatuses,
                candidateEmployees.Count,
                candidateEmployees,
                exceptionList
            );
        }

        public async Task<EmployeeTaskResult> UpdateNotExiting(
            List<Employee> reconciledEmployeeList
        )
        {
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
            // {
            //     try
            //     {
            //         var employee = await SaveStatusAndAddTimelineEntry(
            //             e,
            //             EmployeeStatusEnum.NotExiting
            //         );
            //         updatedEmployeeList.Add(employee);
            //     }
            //     catch (Exception exception)
            //     {
            //         exceptionList.Add(
            //             $"Exception updating non-exiting employee {e.FullName} "
            //                 + $"(ID: {e.GovernmentEmployeeId}): {exception.GetType()}: {exception.Message} "
            //         );
            //     }
            // }

            return new EmployeeTaskResult(
                TaskEnum.UpdateNotExiting,
                activeDBEmployeesNotInCsv.Count,
                updatedEmployeeList,
                exceptionList
            );
        }
    }
}
