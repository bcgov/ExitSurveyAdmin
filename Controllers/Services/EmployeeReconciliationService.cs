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

        public async static Task<List<Employee>> ReconcileEmployees(
            ExitSurveyAdminContext context, List<Employee> employees
        )
        ***REMOVED***
            var reconciledEmployeeList = new List<Employee>();

            foreach (Employee e in employees)
            ***REMOVED***
                var employee = await ReconcileEmployee(context, e);
                reconciledEmployeeList.Add(e);
          ***REMOVED***

            var nonFinalEmployees = context.Employees
                .Include(e => e.TimelineEntries)
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                .ToList();

            foreach (Employee e in nonFinalEmployees)
            ***REMOVED***
                var employee = await UpdateEmployeeStatus(context, e);
          ***REMOVED***

            return reconciledEmployeeList;
      ***REMOVED***

        public async static Task<Employee> ReconcileEmployee(
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
            if (employee.EffectiveDate < DateTime.UtcNow)
            ***REMOVED***
                var newStatus = EmployeeStatusEnum.Expired.Code;

                // Update employee status
                employee.CurrentEmployeeStatusCode = newStatus;
                context.Entry(employee).State = EntityState.Modified;

                // Create a new timeline entry.
                employee.TimelineEntries.Add(new EmployeeTimelineEntry
                ***REMOVED***
                    EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                    EmployeeStatusCode = newStatus,
                    Comment = $"Status updated by script: ***REMOVED***employee.CurrentEmployeeStatusCode***REMOVED*** → ***REMOVED***newStatus***REMOVED***."
              ***REMOVED***);

                // Save changes to employee and the new timeline entry.
                await context.SaveChangesAsync();
          ***REMOVED***

            return employee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
