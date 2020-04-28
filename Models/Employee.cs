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
        private static int Encode(int employeeIdAsInt)
        ***REMOVED***
            return employeeIdAsInt * 18 + 7222483;
      ***REMOVED***

        private static int Decode(int encodedEmployeeIdAsInt)
        ***REMOVED***
            return (encodedEmployeeIdAsInt - 7222483) / 18;
      ***REMOVED***

        // The telkey encoding function. Adapted directly from the previous
        // codebase.
        public static string GenerateTelkey(Employee e)
        ***REMOVED***
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

            return $"***REMOVED***paddedExitCount***REMOVED******REMOVED***reversedEncodedEmployeeId***REMOVED******REMOVED***effectiveDateMonth***REMOVED***";
      ***REMOVED***


        // The telkey decoding function. Adapted directly from the previous
        // codebase. We want to get the employee ID from the telkey.
        public static string EmployeeIdFromTelkey(string telkey)
        ***REMOVED***
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
            return $"***REMOVED***employeeIdAsInt***REMOVED***";
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

        public string FullName
        ***REMOVED***
            get ***REMOVED*** return $"***REMOVED***this.FirstName***REMOVED*** ***REMOVED***this.LastName***REMOVED***"; ***REMOVED***
      ***REMOVED***

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id ***REMOVED*** get; set; ***REMOVED***

        public string Telkey ***REMOVED*** get; set; ***REMOVED***

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
        public DateTime? LastDayWorkedDate ***REMOVED*** get; set; ***REMOVED***

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
        public DateTime? LeaveDate ***REMOVED*** get; set; ***REMOVED***

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