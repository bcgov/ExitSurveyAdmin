using System.Globalization;
using System.Text;
using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System.Net.Http;
using Microsoft.VisualBasic.FileIO;
using CsvHelper;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeReconciliationService
    ***REMOVED***
        // NB. Existence is determined by the combination of EmployeeId and
        // ExitCount.
        private static Employee EmployeeExists(ExitSurveyAdminContext context, Employee candidate)
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

        public async static Task<Employee> ReconcileEmployee(ExitSurveyAdminContext context, Employee employee)
        ***REMOVED***
            // Get the existing employee, if it exists.
            var existingEmployee = EmployeeExists(context, employee);

            if (existingEmployee == null)
            ***REMOVED***
                // Case A. The employee does not exist in the database.

                // Insert the employee into the database.
                context.Employees.Add(employee);
                await context.SaveChangesAsync();

                // Reload to get the automatically-created ID.
                await context.Entry(employee).ReloadAsync();

                // Create and save a new timeline entry.
                context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                ***REMOVED***
                    EmployeeId = employee.Id,
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = EmployeeStatusEnum.New.Code,
                    Comment = "Created automatically by script."
              ***REMOVED***);
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
                    // Return the existing employee.
                    return existingEmployee;
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
                        var newValue = pv.PropertyInfo.GetValue(employee);
                        pv.PropertyInfo.SetValue(existingEmployee, newValue);
                        fieldsUpdatedList
                            .Add($"***REMOVED***pv.PropertyInfo.Name***REMOVED***: ***REMOVED***pv.ValueA***REMOVED*** -> ***REMOVED***pv.ValueB***REMOVED***");
                  ***REMOVED***
                    context.Entry(existingEmployee).State = EntityState.Modified;

                    // Create a string out of the list.
                    string fieldsUpdated = String.Join(", ", fieldsUpdatedList);

                    // Create a new timeline entry.
                    context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                    ***REMOVED***
                        EmployeeId = existingEmployee.Id,
                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                        EmployeeStatusCode = employee.CurrentEmployeeStatusCode,
                        Comment = $"Fields updated by script: ***REMOVED***fieldsUpdated***REMOVED***."
                  ***REMOVED***);

                    // Save changes to employee and the new timeline entry.
                    await context.SaveChangesAsync();

                    // Return the employee.
                    return existingEmployee;
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
