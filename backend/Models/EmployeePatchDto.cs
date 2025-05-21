using System;
using System.Collections.Generic;
using System.Linq;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeePatchDto
    ***REMOVED***
        public string PreferredEmail ***REMOVED*** get; set; ***REMOVED***
        public string PreferredFirstName ***REMOVED*** get; set; ***REMOVED***
        public string PreferredAddress1 ***REMOVED*** get; set; ***REMOVED***
        public string PreferredAddress2 ***REMOVED*** get; set; ***REMOVED***
        public string PreferredAddressCity ***REMOVED*** get; set; ***REMOVED***
        public string PreferredAddressProvince ***REMOVED*** get; set; ***REMOVED***
        public string PreferredAddressPostCode ***REMOVED*** get; set; ***REMOVED***
        public string CurrentEmployeeStatusCode ***REMOVED*** get; set; ***REMOVED***
        public string AdminUserName ***REMOVED*** get; set; ***REMOVED***


        // TODO: Very similar code exists in EmployeeReconciliationService.
        // Factor it out.
        public Employee ApplyPatch(Employee existingEmployee)
        ***REMOVED***
            var existingProperties = existingEmployee.GetType().GetProperties();
            var newProperties = this.GetType().GetProperties();

            List<string> fieldsUpdatedList = new List<string>();

            foreach (var newProperty in newProperties)
            ***REMOVED***
                // Skip the AdminUserName.
                if (newProperty.Name == "AdminUserName")
                ***REMOVED***
                    continue;
              ***REMOVED***

                // Get the new value from the new property.
                var patchedValue = newProperty.GetValue(this);

                // Get the PropertyInfo on the existing object whose name
                // matches this new property.
                var existingProperty = existingProperties
                    .First(p => p.Name == newProperty.Name);

                if (existingProperty != null)
                ***REMOVED***
                    var existingValue = existingProperty.GetValue(existingEmployee);
                    if (patchedValue != null && !existingValue.Equals(patchedValue))
                    ***REMOVED***
                        // Only set the value if it's not null and if it's not
                        // equal to the existing value.
                        existingProperty
                            .SetValue(existingEmployee, patchedValue);
                        fieldsUpdatedList
                            .Add($"***REMOVED***newProperty.Name***REMOVED***: `***REMOVED***existingValue***REMOVED***` → `***REMOVED***patchedValue***REMOVED***`");

                        // Also, set the flag if the property starts with
                        // "Preferred".
                        if (existingProperty.Name.StartsWith("Preferred"))
                        ***REMOVED***
                            var preferredPropertyFlag = existingProperties
                                .First(p => p.Name == $"***REMOVED***existingProperty.Name***REMOVED***Flag");

                            preferredPropertyFlag.SetValue(existingEmployee, true);
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***
                else
                ***REMOVED***
                    throw new System.InvalidOperationException(
                        $"Property ***REMOVED***newProperty.Name***REMOVED*** not found on existing" +
                        "Employee object."
                    );
              ***REMOVED***
          ***REMOVED***

            string fieldsUpdated = String.Join(", ", fieldsUpdatedList);

            // Create a new timeline entry.
            existingEmployee.TimelineEntries.Add(new EmployeeTimelineEntry
            ***REMOVED***
                EmployeeId = existingEmployee.Id,
                EmployeeActionCode = EmployeeActionEnum.UpdateByAdmin.Code,
                EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                Comment = $"Fields updated by admin: ***REMOVED***fieldsUpdated***REMOVED***.",
                AdminUserName = AdminUserName
          ***REMOVED***);


            return existingEmployee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***