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
        private CallWebService CallWeb;
        private ExitSurveyAdminContext Context;

        private EmployeeInfoLookupService InfoLookupService;

        public EmployeeReconciliationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService
        )
        {
            Context = context;
            CallWeb = callWeb;
            InfoLookupService = infoLookupService;
        }

        // NB. Existence is determined by the combination of EmployeeId,
        // ExitCount, and month of the EffectiveDate.
        private Employee EmployeeExists(
            ExitSurveyAdminContext context, Employee candidate
        )
        {
            var query = context.Employees
                .Where(e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
                    && e.EffectiveDate.Month == candidate.EffectiveDate.Month
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
            ExitSurveyAdminContext context, Employee employee,
            EmployeeStatusEnum newStatus
        )
        {
            var newStatusCode = newStatus.Code;
            var oldStatusCode = employee.CurrentEmployeeStatusCode;

            // Update employee status.
            employee.CurrentEmployeeStatusCode = newStatusCode;

            // Create a new timeline entry.
            employee.TimelineEntries.Add(new EmployeeTimelineEntry
            {
                EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                EmployeeStatusCode = newStatusCode,
                Comment = $"Status updated by script: " +
                    $"{oldStatusCode} → {newStatusCode}."
            });
            context.Entry(employee).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return employee;
        }

        public async Task<List<Employee>> ReconcileEmployees(
            ExitSurveyAdminContext context, List<Employee> employees
        )
        {
            var reconciledEmployeeList = new List<Employee>();

            // Step 1. Insert and update employees from the CSV.
            foreach (Employee e in employees)
            {
                var employee = await ReconcileWithDatabase(context, e);
                reconciledEmployeeList.Add(employee);
            }

            return reconciledEmployeeList;
        }

        /*** Reconcile a single employee. NB! By default, this will NOT invoke
        other methods (such as status updating) that affect multiple other
        employees, unlike ReconcileEmployees which does so by default.
        */
        public async Task<Employee> ReconcileEmployee(
            ExitSurveyAdminContext context, Employee employee
        )
        {
            // Simply call the main ReconcileEmployees function, with this
            // single employee as the sole element of a list; then get the
            // employee from the resulting list.
            var reconciledEmployee = (await ReconcileEmployees(
                context, new List<Employee>() { employee }
            )).ElementAt(0);

            return reconciledEmployee;
        }

        private async Task<Employee> ReconcileWithDatabase(
            ExitSurveyAdminContext context, Employee employee
        )
        {
            // Get the existing employee, if it exists.
            var existingEmployee = EmployeeExists(context, employee);

            if (existingEmployee == null)
            {
                // Case A. The employee does not exist in the database.

                // Set the status code for a new employee.
                var newStatusCode = EmployeeStatusEnum.New.Code;
                employee.CurrentEmployeeStatusCode = newStatusCode;

                // Set the email.
                employee.UpdateEmail(InfoLookupService);

                // Try to insert a row into CallWeb, and set the telkey.
                try
                {
                    employee.Telkey = await CallWeb.CreateSurvey(employee);
                }
                catch (Exception e)
                {
                    throw new InvalidOperationException(
                        "Inserting a row into CallWeb failed.", e
                    );
                }

                // Insert the employee into the database, along with an
                // appropriate timeline entry. Note that Ids are auto-generated.
                employee.TimelineEntries = new List<EmployeeTimelineEntry>();
                employee.TimelineEntries.Add(new EmployeeTimelineEntry
                {
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = newStatusCode,
                    Comment = "Created automatically by script."
                });

                context.Employees.Add(employee);

                await context.SaveChangesAsync();

                // End Case A. Return the employee.
                return employee;
            }
            else
            {
                // Case B. The unique user DOES exist in the database.
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
                        if (string.Equals(pv.PropertyInfo.Name, nameof(Employee.GovernmentEmail))
                            && string.IsNullOrWhiteSpace(pv.ValueB as string)
                        )
                        {
                            continue;
                        }

                        var newValue = pv.PropertyInfo.GetValue(employee);
                        pv.PropertyInfo.SetValue(existingEmployee, newValue);
                        fieldsUpdatedList
                            .Add($"{pv.PropertyInfo.Name}: `{pv.ValueA}` → `{pv.ValueB}`");
                    }

                    // If there is > 1 field updated, update the object (note
                    // that if just email was set to ``, we might have no
                    // updated fields).
                    if (fieldsUpdatedList.Count > 0)
                    {
                        string fieldsUpdated = String.Join(", ", fieldsUpdatedList);

                        // Create a new timeline entry.
                        context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                        {
                            EmployeeId = existingEmployee.Id,
                            EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                            EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                            Comment = $"Fields updated by script: {fieldsUpdated}."
                        });

                        // Save changes to employee and the new timeline entry.
                        context.Entry(existingEmployee).State = EntityState.Modified;

                        await context.SaveChangesAsync();
                    }
                }

                return existingEmployee;
            }
        }


        public async Task<Employee> UpdateEmployeeStatus(
            ExitSurveyAdminContext context, Employee employee
        )
        {
            var callWebStatusCode = await CallWeb
                .GetSurveyStatusCode(employee);

            // First, check if the employee has completed the survey.
            if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
            {
                return await SaveStatusAndAddTimelineEntry(context, employee,
                    EmployeeStatusEnum.SurveyComplete);
            }

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            // TODO: What is the appropriate amount of time to wait for a user?
            if (employee.EffectiveDate.AddMonths(6) < DateTime.UtcNow)
            {
                return await SaveStatusAndAddTimelineEntry(context, employee,
                    EmployeeStatusEnum.Expired);
            }

            return employee;
        }
    }
}
