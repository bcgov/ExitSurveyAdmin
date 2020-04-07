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
        private static ExitSurveyAdminContext _context;

        public static void SetContext(ExitSurveyAdminContext context)
        ***REMOVED***
            _context = context;
      ***REMOVED***

        public static bool HasContext()
        ***REMOVED***
            return _context != null;
      ***REMOVED***

        // NB. Existence is determined by the combination of EmployeeId and
        // ExitCount.
        private static Employee EmployeeExists(Employee candidate)
        ***REMOVED***
            if (!HasContext())
            ***REMOVED***
                throw new InvalidOperationException("Context has not been set.");
          ***REMOVED***

            var query = _context.Employees
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

        public async static Task<Employee> ReconcileEmployee(Employee employee)
        ***REMOVED***
            if (!HasContext())
            ***REMOVED***
                throw new InvalidOperationException("Context has not been set.");
          ***REMOVED***

            // The possible states of an employee.

            // How do we determine uniqueness?
            //      EmployeeId + ExitCount.

            // We need to check two things.
            //   One, is THEIR employee in OUR database.
            //   Two, is OUR *active* employee in THEIR CSV.

            var existingEmployee = EmployeeExists(employee);

            Console.WriteLine("* * * * *");
            Console.WriteLine(existingEmployee);
            Console.WriteLine("* * * * *");

            if (existingEmployee == null)
            ***REMOVED***
                // A. The unique user does not exist in the database.
                //      --> Insert into the database.
                EmployeeTimelineEntry entry = new EmployeeTimelineEntry
                ***REMOVED***
                    Id = "2",
                    EmployeeId = employee.Id,
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = EmployeeStatusEnum.New.Code,
                    Comment = "Created automatically by script."
              ***REMOVED***;

                // _context.Entry(employee).State = EntityState.Modified;

                _context.Employees.Add(employee);
                _context.EmployeeTimelineEntries.Add(entry);
                await _context.SaveChangesAsync();
          ***REMOVED***
            else
            ***REMOVED***
                // B. The unique user DOES exist in the database.
                // B10. No changes on any fields. Don't bother to update.
                if (existingEmployee.FieldsAllEqual(employee))
                ***REMOVED***
                    Console.WriteLine("A PERFECT MATCH");
              ***REMOVED***
                else
                ***REMOVED***
                    Console.WriteLine("NOT A PERFECT MATCH");
              ***REMOVED***

                // B20. Changes on a "major" field. Update and log the change.
          ***REMOVED***






            // C. The non-final-state employee exists in our database, but not
            // in their CSV.
            //      --> Set status to Not Exiting.

            return employee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
