using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using static ObjectExtensions;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class Employee : BaseEntity
    ***REMOVED***

        public IEnumerable<PropertyVariance> PropertyCompare(Employee candidate)
        ***REMOVED***
            // Compare properties. Note the intentionally excluded properties.
            return this.DetailedCompare(candidate)
                .Where(d =>
                    d.PropertyInfo.Name != nameof(Id) &&
                    d.PropertyInfo.Name != nameof(CurrentEmployeeStatusCode) &&
                    d.PropertyInfo.Name != nameof(CurrentEmployeeStatus) &&
                    d.PropertyInfo.Name != nameof(TimelineEntries) &&
                    d.PropertyInfo.Name != nameof(CreatedTs) &&
                    d.PropertyInfo.Name != nameof(ModifiedTs)
                );
      ***REMOVED***

        public override int GetHashCode()
        ***REMOVED***
            return base.GetHashCode();
      ***REMOVED***


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string GovernmentEmployeeId ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string FirstName ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string LastName ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.Date)]
        [Required]
        public DateTime BirthDate ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Gender ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string GovernmentEmail ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Classification ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Ministry ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string DepartmentId ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string JobFunctionCode ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string LocationCity ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.Date)]
        [Required]
        public DateTime OriginalHireDate ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.Date)]
        [Required]
        public DateTime LastDayWorkedDate ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.Date)]
        [Required]
        public DateTime EffectiveDate ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Reason ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Address1 ***REMOVED*** get; set; ***REMOVED***

        public string Address2 ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string AddressCity ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string AddressProvince ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string AddressPostCode ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Phone ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string AppointmentStatus ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string PositionCode ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Age ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.Date)]
        [Required]
        public DateTime LeaveDate ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string ServiceYears ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string JobCode ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string BackDated ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string ExitCount ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string AgeGroup ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string ClassificationGroup ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string ServiceGroup ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string LocationGroup ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string CurrentEmployeeStatusCode ***REMOVED*** get; set; ***REMOVED***

        public virtual EmployeeStatusEnum CurrentEmployeeStatus ***REMOVED*** get; set; ***REMOVED***

        public virtual List<EmployeeTimelineEntry> TimelineEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***