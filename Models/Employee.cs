using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class Employee : BaseEntity
    ***REMOVED***

        public bool FieldsAllEqual(Employee candidate)
        ***REMOVED***
            // Compare properties. Note the intentionally excluded properties
            // commented out.
            return (
                // candidate.Id: Doesn't need to be equal
                // candidate.CurrentEmployeeStatusCode: Doesn't need to be equal
                candidate.GovernmentEmployeeId == GovernmentEmployeeId &&
                candidate.FirstName == FirstName &&
                candidate.LastName == LastName &&
                candidate.BirthDate == BirthDate &&
                candidate.Gender == Gender &&
                candidate.GovernmentEmail == GovernmentEmail &&
                candidate.Classification == Classification &&
                candidate.Ministry == Ministry &&
                candidate.DepartmentId == DepartmentId &&
                candidate.JobFunctionCode == JobFunctionCode &&
                candidate.LocationCity == LocationCity &&
                candidate.OriginalHireDate == OriginalHireDate &&
                candidate.LastDayWorkedDate == LastDayWorkedDate &&
                candidate.EffectiveDate == EffectiveDate &&
                candidate.Reason == Reason &&
                candidate.Address1 == Address1 &&
                candidate.Address2 == Address2 &&
                candidate.AddressCity == AddressCity &&
                candidate.AddressProvince == AddressProvince &&
                candidate.AddressPostCode == AddressPostCode &&
                candidate.Phone == Phone &&
                candidate.AppointmentStatus == AppointmentStatus &&
                candidate.PositionCode == PositionCode &&
                candidate.Age == Age &&
                candidate.LeaveDate == LeaveDate &&
                candidate.ServiceYears == ServiceYears &&
                candidate.JobCode == JobCode &&
                candidate.BackDated == BackDated &&
                candidate.ExitCount == ExitCount &&
                candidate.AgeGroup == AgeGroup &&
                candidate.ClassificationGroup == ClassificationGroup &&
                candidate.ServiceGroup == ServiceGroup &&
                candidate.LocationGroup == LocationGroup
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