using ExitSurveyAdmin.Services;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ExitSurveyAdmin.Models
{
    public class EmployeePatchDto
    {
        public string GovernmentEmail { get; set; }
        public string FirstName { get; set; }
        public string AppointmentStatus { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string AddressCity { get; set; }
        public string AddressProvince { get; set; }
        public string AddressPostCode { get; set; }
        public string CurrentEmployeeStatusCode { get; set; }
        public string Reason { get; set; }


        // TODO: Very similar code exists in EmployeeReconciliationService.
        // Factor it out.
        public Employee ApplyPatch(Employee existingEmployee)
        {
            var existingProperties = existingEmployee.GetType().GetProperties();
            var newProperties = this.GetType().GetProperties();

            List<string> fieldsUpdatedList = new List<string>();

            foreach (var newProperty in newProperties)
            {
                // Get the new value from the new property.
                var patchedValue = newProperty.GetValue(this);

                // Get the PropertyInfo on the existing object whose name
                // matches this new property.
                var existingProperty = existingProperties
                    .First(p => p.Name == newProperty.Name);

                if (existingProperty != null)
                {
                    var existingValue = existingProperty.GetValue(existingEmployee);
                    if (patchedValue != null)
                    {
                        // Only set the value if it's not null.
                        existingProperty
                            .SetValue(existingEmployee, patchedValue);
                        fieldsUpdatedList
                            .Add($"{newProperty.Name}: `{existingValue}` → `{patchedValue}`");
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
                Comment = $"Fields updated by admin: {fieldsUpdated}."
            });


            return existingEmployee;
        }
    }
}