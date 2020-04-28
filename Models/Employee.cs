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
{
    public class Employee : BaseEntity
    {
        private static int Encode(int employeeIdAsInt)
        {
            return employeeIdAsInt * 18 + 7222483;
        }

        private static int Decode(int encodedEmployeeIdAsInt)
        {
            return (encodedEmployeeIdAsInt - 7222483) / 18;
        }

        // The telkey encoding function. Adapted directly from the previous
        // codebase.
        public static string GenerateTelkey(Employee e)
        {
            // Get the two-digit (zero-padded) month.
            string effectiveDateMonth = e.EffectiveDate.ToString("MM");

            // Get the exit count + 10.
            int exitCountAsInt = System.Convert.ToInt32(e.ExitCount);
            int paddedExitCount = exitCountAsInt + 10;

            // Manipulate the employee ID, and reverse.
            int employeeIdAsInt = System.Convert.ToInt32(e.GovernmentEmployeeId);
            int encodedEmployeeId = Employee.Encode(employeeIdAsInt);
            string reversedEncodedEmployeeId = new string(
                encodedEmployeeId.ToString().Reverse().ToArray()
            );

            return $"{paddedExitCount}{reversedEncodedEmployeeId}{effectiveDateMonth}";
        }


        // The telkey decoding function. Adapted directly from the previous
        // codebase. We want to get the employee ID from the telkey.
        public static string EmployeeIdFromTelkey(string telkey)
        {
            // The first two characters of the telkey are the padded exit
            // count. The last two characters of the telkey are the month. So,
            // strip those out to get the portion of the telkey that is the
            // encoded employee ID.
            string trimmedTelkey = telkey.Trim();
            string encodedEmployeeId = trimmedTelkey
                .Substring(2, trimmedTelkey.Length - 2);

            // Now reverse the above process.
            int encodedEmployeeIdAsInt = System.Convert.ToInt32(encodedEmployeeId);
            int employeeIdAsInt = Employee.Decode(encodedEmployeeIdAsInt);

            // Now to a string.
            return $"{employeeIdAsInt}";
        }

        public IEnumerable<PropertyVariance> PropertyCompare(Employee candidate)
        {
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

        public string Telkey { get; set; }

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