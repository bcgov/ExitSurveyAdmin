using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using static ObjectExtensions;
using ExitSurveyAdmin.Services;

namespace ExitSurveyAdmin.Models
{
    public class Employee : BaseEntity
    {

        public IEnumerable<PropertyVariance> PropertyCompare(Employee candidate)
        {
            // Compare properties. Note the intentionally excluded properties.
            return this.DetailedCompare(candidate)
                .Where(d =>
                    d.PropertyInfo.Name != nameof(Id) &&
                    d.PropertyInfo.Name != nameof(Telkey) &&
                    d.PropertyInfo.Name != nameof(CurrentEmployeeStatusCode) &&
                    d.PropertyInfo.Name != nameof(CurrentEmployeeStatus) &&
                    d.PropertyInfo.Name != nameof(TimelineEntries) &&
                    d.PropertyInfo.Name != nameof(CreatedTs) &&
                    d.PropertyInfo.Name != nameof(ModifiedTs)
                );
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public string FullName
        {
            get { return $"{this.FirstName} {this.LastName}"; }
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public virtual string Telkey { get; set; }

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
        public DateTime? LastDayWorkedDate { get; set; }

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
        public DateTime? LeaveDate { get; set; }

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