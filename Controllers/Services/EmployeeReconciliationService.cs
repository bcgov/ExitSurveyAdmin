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
            // The possible states of an employee.

            // How do we determine uniqueness?
            //      EmployeeId + ExitCount.

            // We need to check two things.
            //   One, is THEIR employee in OUR database.
            //   Two, is OUR *active* employee in THEIR CSV.

            var existingEmployee = EmployeeExists(context, employee);

            if (existingEmployee == null)
            ***REMOVED***
                // A. The unique user does not exist in the database.
                //      --> Insert into the database.
                context.Employees.Add(employee);
                await context.SaveChangesAsync();

                await context.Entry(employee).ReloadAsync();

                context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                ***REMOVED***
                    EmployeeId = employee.Id,
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = EmployeeStatusEnum.New.Code,
                    Comment = "Created automatically by script."
              ***REMOVED***);
                await context.SaveChangesAsync();

                return employee;
          ***REMOVED***
            else
            ***REMOVED***
                // B. The unique user DOES exist in the database.
                // B10. No changes on any fields. Don't bother to update.
                if (existingEmployee.FieldsAllEqual(employee))
                ***REMOVED***
                    // No-op.
              ***REMOVED***
                else
                ***REMOVED***
                    context.Entry(employee).State = EntityState.Modified;
                    context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                    ***REMOVED***
                        EmployeeId = existingEmployee.Id,
                        EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                        EmployeeStatusCode = employee.CurrentEmployeeStatusCode,
                        Comment = "Updated automatically by script."
                  ***REMOVED***);
                    await context.SaveChangesAsync();
              ***REMOVED***

                // B20. Changes on a "major" field. Update and log the change.
                return existingEmployee;
          ***REMOVED***


            // C. The non-final-state employee exists in our database, but not
            // in their CSV.
            //      --> Set status to Not Exiting.

      ***REMOVED***
  ***REMOVED***
***REMOVED***
