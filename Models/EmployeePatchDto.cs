using ExitSurveyAdmin.Services;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ExitSurveyAdmin.Models
{
    public class EmployeePatchDto : BaseEntity
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


        public Employee ApplyPatch(Employee existingEmployee)
        {
            var existingProperties = existingEmployee.GetType().GetProperties();
            var newProperties = this.GetType().GetProperties();

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
                    if (patchedValue != null)
                    {
                        // Only set the value if it's not null.
                        existingProperty
                            .SetValue(existingEmployee, patchedValue);
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

            return existingEmployee;
        }
    }
}