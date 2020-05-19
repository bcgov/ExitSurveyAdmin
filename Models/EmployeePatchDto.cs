using ExitSurveyAdmin.Services;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeePatchDto : BaseEntity
    ***REMOVED***
        public string GovernmentEmail ***REMOVED*** get; set; ***REMOVED***
        public string FirstName ***REMOVED*** get; set; ***REMOVED***
        public string AppointmentStatus ***REMOVED*** get; set; ***REMOVED***
        public string Address1 ***REMOVED*** get; set; ***REMOVED***
        public string Address2 ***REMOVED*** get; set; ***REMOVED***
        public string AddressCity ***REMOVED*** get; set; ***REMOVED***
        public string AddressProvince ***REMOVED*** get; set; ***REMOVED***
        public string AddressPostCode ***REMOVED*** get; set; ***REMOVED***
        public string CurrentEmployeeStatusCode ***REMOVED*** get; set; ***REMOVED***
        public string Reason ***REMOVED*** get; set; ***REMOVED***


        public Employee ApplyPatch(Employee existingEmployee)
        ***REMOVED***
            var existingProperties = existingEmployee.GetType().GetProperties();
            var newProperties = this.GetType().GetProperties();

            foreach (var newProperty in newProperties)
            ***REMOVED***
                // Get the new value from the new property.
                var patchedValue = newProperty.GetValue(this);

                // Get the PropertyInfo on the existing object whose name
                // matches this new property.
                var existingProperty = existingProperties
                    .First(p => p.Name == newProperty.Name);

                if (existingProperty != null)
                ***REMOVED***
                    if (patchedValue != null)
                    ***REMOVED***
                        // Only set the value if it's not null.
                        existingProperty
                            .SetValue(existingEmployee, patchedValue);
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

            return existingEmployee;
      ***REMOVED***
  ***REMOVED***
***REMOVED***