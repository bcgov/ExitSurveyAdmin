using ExitSurveyAdmin.Services;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

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
                    d.PropertyInfo.Name != nameof(ModifiedTs) &&
                    d.PropertyInfo.Name != nameof(PreferredFirstName) &&
                    d.PropertyInfo.Name != nameof(PreferredEmail) &&
                    d.PropertyInfo.Name != nameof(PreferredAddress1) &&
                    d.PropertyInfo.Name != nameof(PreferredAddress2) &&
                    d.PropertyInfo.Name != nameof(PreferredAddressCity) &&
                    d.PropertyInfo.Name != nameof(PreferredAddressProvince) &&
                    d.PropertyInfo.Name != nameof(PreferredAddressPostCode) &&
                    d.PropertyInfo.Name != nameof(PreferredFirstNameFlag) &&
                    d.PropertyInfo.Name != nameof(PreferredEmailFlag) &&
                    d.PropertyInfo.Name != nameof(PreferredAddress1Flag) &&
                    d.PropertyInfo.Name != nameof(PreferredAddress2Flag) &&
                    d.PropertyInfo.Name != nameof(PreferredAddressCityFlag) &&
                    d.PropertyInfo.Name != nameof(PreferredAddressProvinceFlag) &&
                    d.PropertyInfo.Name != nameof(PreferredAddressPostCodeFlag) &&
                    d.PropertyInfo.Name != nameof(TriedToUpdateInFinalState)
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

        [Sieve(CanFilter = true, CanSort = true)]
        public virtual string Telkey { get; set; }

        [Sieve(CanFilter = true)]
        [Required]
        public string GovernmentEmployeeId { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string FirstName { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string PreferredFirstName { get; set; }

        [Required]
        public Boolean PreferredFirstNameFlag { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string LastName { get; set; }

        [Sieve(CanFilter = true)]
        [Required]
        public string RecordCount { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Gender { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        public string GovernmentEmail { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        public string PreferredEmail { get; set; }

        [Required]
        public Boolean PreferredEmailFlag { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
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

        [Sieve(CanFilter = true, CanSort = true)]
        [DataType(DataType.Date)]
        [Required]
        public DateTime EffectiveDate { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
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
        public string PreferredAddress1 { get; set; }

        [Required]
        public Boolean PreferredAddress1Flag { get; set; }

        public string PreferredAddress2 { get; set; }

        [Required]
        public Boolean PreferredAddress2Flag { get; set; }

        [Required]
        public string PreferredAddressCity { get; set; }

        public Boolean PreferredAddressCityFlag { get; set; }

        [Required]
        public string PreferredAddressProvince { get; set; }

        [Required]
        public Boolean PreferredAddressProvinceFlag { get; set; }

        [Required]
        public string PreferredAddressPostCode { get; set; }

        [Required]
        public Boolean PreferredAddressPostCodeFlag { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        [Sieve(CanFilter = true, CanSort = true)]
        public string AppointmentStatus { get; set; }

        [Required]
        public string PositionCode { get; set; }

        [Required]
        public string PositionTitle { get; set; }

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
        [Sieve(CanFilter = true)]
        public string ExitCount { get; set; }

        [Required]
        public string AgeGroup { get; set; }

        [Required]
        public string ClassificationGroup { get; set; }

        [Required]
        public string ServiceGroup { get; set; }

        [Required]
        public string LocationGroup { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string CurrentEmployeeStatusCode { get; set; }

        public virtual EmployeeStatusEnum CurrentEmployeeStatus { get; set; }

        public virtual List<EmployeeTimelineEntry> TimelineEntries { get; set; }

        public Boolean TriedToUpdateInFinalState { get; set; }

        public void UpdateEmail(
            EmployeeInfoLookupService infoLookupService
        )
        {
            GovernmentEmail = infoLookupService
                .EmailByEmployeeId(GovernmentEmployeeId);
        }

        // Initialize all Preferred fields to be the equivalent of the base
        // field. This should only be run when the Employee is created.
        public void InstantiateFields()
        {
            PreferredFirstName = FirstName;
            PreferredFirstNameFlag = false;
            PreferredEmail = GovernmentEmail;
            PreferredEmailFlag = false;
            PreferredAddress1 = Address1;
            PreferredAddress1Flag = false;
            PreferredAddress2 = Address2;
            PreferredAddress2Flag = false;
            PreferredAddressCity = AddressCity;
            PreferredAddressCityFlag = false;
            PreferredAddressProvince = AddressProvince;
            PreferredAddressProvinceFlag = false;
            PreferredAddressPostCode = AddressPostCode;
            PreferredAddressPostCodeFlag = false;
            TriedToUpdateInFinalState = false;
        }

        // Update all Preferred fields to be the equivalent of the base field,
        // so long as the Preferred field has never been overwritten (i.e. the
        // corresponding `Flag` is false).
        public void UpdatePreferredFields()
        {
            if (!PreferredFirstNameFlag) PreferredFirstName = FirstName;
            if (!PreferredEmailFlag) PreferredEmail = GovernmentEmail;
            if (!PreferredAddress1Flag) PreferredAddress1 = Address1;
            if (!PreferredAddress2Flag) PreferredAddress2 = Address2;
            if (!PreferredAddressCityFlag) PreferredAddressCity = AddressCity;
            if (!PreferredAddressProvinceFlag) PreferredAddressProvince = AddressProvince;
            if (!PreferredAddressPostCodeFlag) PreferredAddressPostCode = AddressPostCode;
        }

        public string LeaveCode
        {
            get
            {
                switch (this.Reason)
                {
                    case "Just Cause":
                    case "Redundant":
                    case "Rejection on Probation":
                        return "3";
                    case "Layoff (With Recall)":
                    case "Job Ends/End of Recall Limit":
                        return "2";
                    default: // All other cases; no need to enumerate here
                        return "1";
                }
            }
        }

        public string SurveyWindowFlag()
        {
            return IsActive() ? "0" : "1";
        }

        public Boolean IsActive()
        {
            return EmployeeStatusEnum.IsActiveStatus(CurrentEmployeeStatusCode);
        }
    }
}