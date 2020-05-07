using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeReconciliationService
    ***REMOVED***
        // NB. Existence is determined by the combination of EmployeeId and
        // ExitCount.
        private static Employee EmployeeExists(
            ExitSurveyAdminContext context, Employee candidate
        )
        ***REMOVED***
            var query = context.Employees
                .Where(e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
                );

            if (query.Count() > 0)
            ***REMOVED***
                return query.First();
          ***REMOVED***
            else
            ***REMOVED***
                return null;
          ***REMOVED***
      ***REMOVED***

        public async static Task<Employee> SaveStatusAndAddTimelineEntry(
            ExitSurveyAdminContext context, Employee employee,
            EmployeeStatusEnum newStatus
        )
        ***REMOVED***
            var newStatusCode = newStatus.Code;
            var oldStatusCode = employee.CurrentEmployeeStatusCode;

            // Update employee status.
            employee.CurrentEmployeeStatusCode = newStatusCode;

            // Create a new timeline entry.
            employee.TimelineEntries.Add(new EmployeeTimelineEntry
            ***REMOVED***
                EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                EmployeeStatusCode = newStatusCode,
                Comment = $"Status updated by script: " +
                    $"***REMOVED***oldStatusCode***REMOVED*** → ***REMOVED***newStatusCode***REMOVED***."
          ***REMOVED***);
            context.Entry(employee).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return employee;
      ***REMOVED***

        public async static Task<List<Employee>> ReconcileEmployees(
            ExitSurveyAdminContext context, List<Employee> employees
        )
        ***REMOVED***
            var reconciledEmployeeList = new List<Employee>();

            // Step 1. Insert and update employees from the CSV.
            foreach (Employee e in employees)
            ***REMOVED***
                var employee = await ReconcileWithDatabase(context, e);
                reconciledEmployeeList.Add(employee);
          ***REMOVED***

            return reconciledEmployeeList;
      ***REMOVED***

        /*** Reconcile a single employee. NB! By default, this will NOT invoke
        other methods (such as status updating) that affect multiple other
        employees, unlike ReconcileEmployees which does so by default.
        */
        public async static Task<Employee> ReconcileEmployee(
            ExitSurveyAdminContext context, Employee employee
        )
        ***REMOVED***
            // Simply call the main ReconcileEmployees function, with this
            // single employee as the sole element of a list; then get the
            // employee from the resulting list.
            var reconciledEmployee = (await ReconcileEmployees(
                context, new List<Employee>() ***REMOVED*** employee ***REMOVED***
            )).ElementAt(0);

            return reconciledEmployee;
      ***REMOVED***

        private async static Task<Employee> ReconcileWithDatabase(
            ExitSurveyAdminContext context, Employee employee
        )
        ***REMOVED***
            // Get the existing employee, if it exists.
            var existingEmployee = EmployeeExists(context, employee);

            if (existingEmployee == null)
            ***REMOVED***
                // Case A. The employee does not exist in the database.

                // Insert the employee into the database, along with an
                // appropriate timeline entry. Note that Ids are auto-generated.
                employee.CurrentEmployeeStatusCode = EmployeeStatusEnum.New.Code;

                employee.TimelineEntries = new List<EmployeeTimelineEntry>();
                employee.TimelineEntries.Add(new EmployeeTimelineEntry
                ***REMOVED***
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = EmployeeStatusEnum.New.Code,
                    Comment = "Created automatically by script."
              ***REMOVED***);

                context.Employees.Add(employee);

                await context.SaveChangesAsync();

                // End Case A. Return the employee.
                return employee;
          ***REMOVED***
            else
            ***REMOVED***
                // Case B. The unique user DOES exist in the database.
                var differentProperties = existingEmployee.PropertyCompare(employee);

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
                        if (string.Equals(pv.PropertyInfo.Name, nameof(Employee.GovernmentEmail))
                            && string.IsNullOrWhiteSpace(pv.ValueB as string)
                        )
                        ***REMOVED***
                            continue;
                      ***REMOVED***

                        var newValue = pv.PropertyInfo.GetValue(employee);
                        pv.PropertyInfo.SetValue(existingEmployee, newValue);
                        fieldsUpdatedList
                            .Add($"***REMOVED***pv.PropertyInfo.Name***REMOVED***: `***REMOVED***pv.ValueA***REMOVED***` → `***REMOVED***pv.ValueB***REMOVED***`");
                  ***REMOVED***

                    // If there is > 1 field updated, update the object (note
                    // that if just email was set to ``, we might have no
                    // updated fields).
                    if (fieldsUpdatedList.Count > 0)
                    ***REMOVED***
                        string fieldsUpdated = String.Join(", ", fieldsUpdatedList);

                        // Create a new timeline entry.
                        context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                        ***REMOVED***
                            EmployeeId = existingEmployee.Id,
                            EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                            EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                            Comment = $"Fields updated by script: ***REMOVED***fieldsUpdated***REMOVED***."
                      ***REMOVED***);

                        // Save changes to employee and the new timeline entry.
                        context.Entry(existingEmployee).State = EntityState.Modified;

                        await context.SaveChangesAsync();
                  ***REMOVED***
              ***REMOVED***

                return existingEmployee;
          ***REMOVED***
      ***REMOVED***


        public async static Task<Employee> UpdateEmployeeStatus(
            ExitSurveyAdminContext context, Employee employee
        )
        ***REMOVED***
            // First, check if the employee has completed the survey.
            if (CallWebService.IsSurveyComplete(employee.GovernmentEmployeeId))
            ***REMOVED***
                return await SaveStatusAndAddTimelineEntry(context, employee,
                    EmployeeStatusEnum.SurveyComplete);
          ***REMOVED***

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            // TODO: What is the appropriate amount of time to wait for a user?
            if (employee.EffectiveDate.AddMonths(6) < DateTime.UtcNow)
            ***REMOVED***
                return await SaveStatusAndAddTimelineEntry(context, employee,
                    EmployeeStatusEnum.Expired);
          ***REMOVED***

            return employee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
