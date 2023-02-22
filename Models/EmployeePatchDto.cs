using System;
using System.Collections.Generic;
using System.Linq;

namespace ExitSurveyAdmin.Models
{
    public class EmployeePatchDto
    {
        public string PreferredEmail { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredAddress1 { get; set; }
        public string PreferredAddress2 { get; set; }
        public string PreferredAddressCity { get; set; }
        public string PreferredAddressProvince { get; set; }
        public string PreferredAddressPostCode { get; set; }
        public string CurrentEmployeeStatusCode { get; set; }
        public string AdminUserName { get; set; }


        // TODO: Very similar code exists in EmployeeReconciliationService.
        // Factor it out.
        public Employee ApplyPatch(Employee existingEmployee)
        {
            var existingProperties = existingEmployee.GetType().GetProperties();
            var newProperties = this.GetType().GetProperties();

            List<string> fieldsUpdatedList = new List<string>();

            foreach (var newProperty in newProperties)
            {
                // Skip the AdminUserName.
                if (newProperty.Name == "AdminUserName")
                {
                    continue;
                }

                // Get the new value from the new property.
                var patchedValue = newProperty.GetValue(this);

                // Get the PropertyInfo on the existing object whose name
                // matches this new property.
                var existingProperty = existingProperties
                    .First(p => p.Name == newProperty.Name);

                if (existingProperty != null)
                {
                    var existingValue = existingProperty.GetValue(existingEmployee);
                    if (patchedValue != null && !existingValue.Equals(patchedValue))
                    {
                        // Only set the value if it's not null and if it's not
                        // equal to the existing value.
                        existingProperty
                            .SetValue(existingEmployee, patchedValue);
                        fieldsUpdatedList
                            .Add($"{newProperty.Name}: `{existingValue}` → `{patchedValue}`");

                        // Also, set the flag if the property starts with
                        // "Preferred".
                        if (existingProperty.Name.StartsWith("Preferred"))
                        {
                            var preferredPropertyFlag = existingProperties
                                .First(p => p.Name == $"{existingProperty.Name}Flag");

                            preferredPropertyFlag.SetValue(existingEmployee, true);
                        }
                    }
                }
                else
                {
                    throw new System.InvalidOperationException(
                        $"Property {newProperty.Name} not found on existing" +
                        "Employee object."
                    );
                }
            }

            string fieldsUpdated = String.Join(", ", fieldsUpdatedList);

            // Create a new timeline entry.
            existingEmployee.TimelineEntries.Add(new EmployeeTimelineEntry
            {
                EmployeeId = existingEmployee.Id,
                EmployeeActionCode = EmployeeActionEnum.UpdateByAdmin.Code,
                EmployeeStatusCode = existingEmployee.CurrentEmployeeStatusCode,
                Comment = $"Fields updated by admin: {fieldsUpdated}.",
                AdminUserName = AdminUserName
            });


            return existingEmployee;
        }
    }
}