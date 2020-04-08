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
{
    public class EmployeeReconciliationService
    {
        // NB. Existence is determined by the combination of EmployeeId and
        // ExitCount.
        private static Employee EmployeeExists(ExitSurveyAdminContext context, Employee candidate)
        {
            var query = context.Employees
                .Where(e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
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

        public async static Task<Employee> ReconcileEmployee(ExitSurveyAdminContext context, Employee employee)
        {
            // Get the existing employee, if it exists.
            var existingEmployee = EmployeeExists(context, employee);

            if (existingEmployee == null)
            {
                // Case A. The employee does not exist in the database.

                // Insert the employee into the database.
                context.Employees.Add(employee);
                await context.SaveChangesAsync();

                // Reload to get the automatically-created ID.
                await context.Entry(employee).ReloadAsync();

                // Create and save a new timeline entry.
                context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                {
                    EmployeeId = employee.Id,
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = EmployeeStatusEnum.New.Code,
                    Comment = "Created automatically by script."
                });
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
                    // Return the existing employee.
                    return existingEmployee;
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
                        var newValue = pv.PropertyInfo.GetValue(employee);
                        pv.PropertyInfo.SetValue(existingEmployee, newValue);
                        fieldsUpdatedList
                            .Add($"{pv.PropertyInfo.Name}: {pv.ValueA} -> {pv.ValueB}");
                    }
                    context.Entry(existingEmployee).State = EntityState.Modified;

                    // Create a string out of the list.
                    string fieldsUpdated = String.Join(", ", fieldsUpdatedList);

                    // Create a new timeline entry.
                    context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                    {
                        EmployeeId = existingEmployee.Id,
                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                        EmployeeStatusCode = employee.CurrentEmployeeStatusCode,
                        Comment = $"Fields updated by script: {fieldsUpdated}."
                    });

                    // Save changes to employee and the new timeline entry.
                    await context.SaveChangesAsync();

                    // Return the employee.
                    return existingEmployee;
                }
            }
        }
    }
}
