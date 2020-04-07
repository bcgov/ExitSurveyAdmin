using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class Employee : BaseEntity
    {

        public bool FieldsAllEqual(Employee candidate)
        {
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
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }


        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public string GovernmentEmployeeId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string GovernmentEmail { get; set; }

        [Required]
        public string Classification { get; set; }

        [Required]
        public string Ministry { get; set; }

        [Required]
        public string DepartmentId { get; set; }

        [Required]
        public string JobFunctionCode { get; set; }

        [Required]
        public string LocationCity { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime OriginalHireDate { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime LastDayWorkedDate { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime EffectiveDate { get; set; }

        [Required]
        public string Reason { get; set; }

        [Required]
        public string Address1 { get; set; }

        public string Address2 { get; set; }

        [Required]
        public string AddressCity { get; set; }

        [Required]
        public string AddressProvince { get; set; }

        [Required]
        public string AddressPostCode { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string AppointmentStatus { get; set; }

        [Required]
        public string PositionCode { get; set; }

        [Required]
        public string Age { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime LeaveDate { get; set; }

        [Required]
        public string ServiceYears { get; set; }

        [Required]
        public string JobCode { get; set; }

        [Required]
        public string BackDated { get; set; }

        [Required]
        public string ExitCount { get; set; }

        [Required]
        public string AgeGroup { get; set; }

        [Required]
        public string ClassificationGroup { get; set; }

        [Required]
        public string ServiceGroup { get; set; }

        [Required]
        public string LocationGroup { get; set; }

        [Required]
        public string CurrentEmployeeStatusCode { get; set; }

        public virtual EmployeeStatusEnum CurrentEmployeeStatus { get; set; }

        public virtual List<EmployeeTimelineEntry> TimelineEntries { get; set; }
    }
}