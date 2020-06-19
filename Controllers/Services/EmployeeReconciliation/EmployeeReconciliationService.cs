using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeReconciliationService
    ***REMOVED***
        private CallWebService callWeb;
        private ExitSurveyAdminContext context;

        private EmployeeInfoLookupService infoLookupService;

        public EmployeeReconciliationService(
            ExitSurveyAdminContext context,
            CallWebService callWeb,
            EmployeeInfoLookupService infoLookupService
        )
        ***REMOVED***
            this.context = context;
            this.callWeb = callWeb;
            this.infoLookupService = infoLookupService;
      ***REMOVED***

        // NB. Existence is determined by the combination of EmployeeId,
        // ExitCount, and record count.
        private Employee EmployeeExists(
            Employee candidate
        )
        ***REMOVED***
            var query = context.Employees
                .Include(e => e.CurrentEmployeeStatus)
                .Where(e =>
                    e.GovernmentEmployeeId == candidate.GovernmentEmployeeId
                    && e.ExitCount == candidate.ExitCount
                    && e.RecordCount == candidate.RecordCount
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

        public async Task<Employee> SaveStatusAndAddTimelineEntry(
            Employee employee,
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

        public async Task<Tuple<List<Employee>, List<string>>> ReconcileEmployees(
            List<Employee> employees
        )
        ***REMOVED***
            var reconciledEmployeeList = new List<Employee>();
            var exceptionList = new List<string>();

            // Step 1. Insert and update employees from the CSV.
            foreach (Employee e in employees)
            ***REMOVED***
                try
                ***REMOVED***
                    var employee = await ReconcileWithDatabase(e);
                    reconciledEmployeeList.Add(employee);
              ***REMOVED***
                catch (Exception exception)
                ***REMOVED***
                    exceptionList.Add(
                        $"Exception with candidate employee ***REMOVED***e.FullName***REMOVED*** " +
                        $"(ID: ***REMOVED***e.GovernmentEmployeeId***REMOVED***): ***REMOVED***exception***REMOVED*** "
                    );
              ***REMOVED***
          ***REMOVED***

            return Tuple.Create(reconciledEmployeeList, exceptionList);
      ***REMOVED***

        /*** Reconcile a single employee. NB! By default, this will NOT invoke
        other methods (such as status updating) that affect multiple other
        employees, unlike ReconcileEmployees which does so by default.
        */
        public async Task<Employee> ReconcileEmployee(Employee employee)
        ***REMOVED***
            // Simply call the main ReconcileEmployees function, with this
            // single employee as the sole element of a list; then get the
            // employee from the resulting list.
            var result = await ReconcileEmployees(
                new List<Employee>() ***REMOVED*** employee ***REMOVED***
            );
            var reconciledEmployee = result.Item1.ElementAt(0);

            return reconciledEmployee;
      ***REMOVED***

        private async Task<Employee> ReconcileWithDatabase(Employee employee)
        ***REMOVED***
            // Get the existing employee, if it exists.
            var existingEmployee = EmployeeExists(employee);

            if (existingEmployee == null)
            ***REMOVED***
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
                ***REMOVED***
                    employee.Telkey = await callWeb.CreateSurvey(employee);
              ***REMOVED***
                catch (Exception e)
                ***REMOVED***
                    throw new InvalidOperationException(
                        "Inserting a row into CallWeb failed.", e
                    );
              ***REMOVED***

                // Insert the employee into the database, along with an
                // appropriate timeline entry. Note that Ids are auto-generated.
                employee.TimelineEntries = new List<EmployeeTimelineEntry>();
                employee.TimelineEntries.Add(new EmployeeTimelineEntry
                ***REMOVED***
                    EmployeeActionCode = EmployeeActionEnum.CreateFromCSV.Code,
                    EmployeeStatusCode = newStatusCode,
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
                        if (existingEmployee.IsActive())
                        ***REMOVED***
                            // Only actually set the field if the employee is
                            // active. Otherwise, we still want to log that the
                            // field would have been updated, so we can report
                            // on it (see below).
                            pv.PropertyInfo.SetValue(existingEmployee, newValue);
                      ***REMOVED***
                        fieldsUpdatedList
                            .Add($"***REMOVED***pv.PropertyInfo.Name***REMOVED***: `***REMOVED***pv.ValueA***REMOVED***` → `***REMOVED***pv.ValueB***REMOVED***`");
                  ***REMOVED***

                    // If there is > 1 field updated, update the object (note
                    // that if just email was set to ``, we might have no
                    // updated fields).
                    if (fieldsUpdatedList.Count > 0)
                    ***REMOVED***
                        var fieldsUpdated = String.Join(", ", fieldsUpdatedList);
                        var comment = $"Fields updated by script: ***REMOVED***fieldsUpdated***REMOVED***.";

                        // If the user is in a final state, log this as a
                        // mistake instead.
                        if (!existingEmployee.IsActive())
                        ***REMOVED***
                            comment =
                                $"These fields would have been updated, " +
                                $"but they were not as this user is in a " +
                                $"final state: ***REMOVED***fieldsUpdated***REMOVED***. The " +
                                $"TriedToUpdateInFinalState flag was set. " +
                                "No more updates of this kind will be logged.";

                            existingEmployee.TriedToUpdateInFinalState = true;
                      ***REMOVED***

                        // Save changes to employee and the new timeline entry.
                        if (existingEmployee.IsActive() ||
                            !existingEmployee.TriedToUpdateInFinalState)
                        ***REMOVED***
                            // Create a new timeline entry.
                            context.EmployeeTimelineEntries.Add(new EmployeeTimelineEntry
                            ***REMOVED***
                                EmployeeId = existingEmployee.Id,
                                EmployeeActionCode = EmployeeActionEnum.UpdateByTask.Code,
                                EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                                Comment = comment
                          ***REMOVED***);

                            context.Entry(existingEmployee).State = EntityState.Modified;
                            await context.SaveChangesAsync();
                      ***REMOVED***
                        else
                        ***REMOVED***
                            return existingEmployee;
                      ***REMOVED***

                        // Patch the row in CallWeb.
                        await callWeb.UpdateSurvey(existingEmployee);
                  ***REMOVED***
              ***REMOVED***

                return existingEmployee;
          ***REMOVED***
      ***REMOVED***


        public async Task<Employee> UpdateEmployeeStatus(
            Employee employee
        )
        ***REMOVED***
            var callWebStatusCode = await callWeb
                .GetSurveyStatusCode(employee);

            // First, check if the employee has completed the survey.
            if (callWebStatusCode.Equals(EmployeeStatusEnum.SurveyComplete.Code))
            ***REMOVED***
                return await SaveStatusAndAddTimelineEntry(employee,
                    EmployeeStatusEnum.SurveyComplete);
          ***REMOVED***

            // An employee only has a set amount of time to complete a survey.
            // If that time has expired, then expire the user.
            // TODO: What is the appropriate amount of time to wait for a user?
            if (employee.EffectiveDate.AddMonths(6) < DateTime.UtcNow)
            ***REMOVED***
                return await SaveStatusAndAddTimelineEntry(employee,
                    EmployeeStatusEnum.Expired);
          ***REMOVED***

            return employee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
