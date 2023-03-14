using ExitSurveyAdmin.Services;
using Sieve.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class Employee : BaseEntity
    ***REMOVED***
        public IEnumerable<PropertyVariance> PropertyCompare(Employee candidate)
        ***REMOVED***
            // Compare properties. Note the intentionally excluded properties.
            return this.DetailedCompare(candidate)
                .Where(
                    d =>
                        d.PropertyInfo.Name != nameof(Id)
                        && d.PropertyInfo.Name != nameof(Telkey)
                        && d.PropertyInfo.Name != nameof(CurrentEmployeeStatusCode)
                        && d.PropertyInfo.Name != nameof(CurrentEmployeeStatus)
                        && d.PropertyInfo.Name != nameof(TimelineEntries)
                        && d.PropertyInfo.Name != nameof(CreatedTs)
                        && d.PropertyInfo.Name != nameof(ModifiedTs)
                        && d.PropertyInfo.Name != nameof(PreferredFirstName)
                        && d.PropertyInfo.Name != nameof(PreferredEmail)
                        && d.PropertyInfo.Name != nameof(PreferredAddress1)
                        && d.PropertyInfo.Name != nameof(PreferredAddress2)
                        && d.PropertyInfo.Name != nameof(PreferredAddressCity)
                        && d.PropertyInfo.Name != nameof(PreferredAddressProvince)
                        && d.PropertyInfo.Name != nameof(PreferredAddressPostCode)
                        && d.PropertyInfo.Name != nameof(PreferredFirstNameFlag)
                        && d.PropertyInfo.Name != nameof(PreferredEmailFlag)
                        && d.PropertyInfo.Name != nameof(PreferredAddress1Flag)
                        && d.PropertyInfo.Name != nameof(PreferredAddress2Flag)
                        && d.PropertyInfo.Name != nameof(PreferredAddressCityFlag)
                        && d.PropertyInfo.Name != nameof(PreferredAddressProvinceFlag)
                        && d.PropertyInfo.Name != nameof(PreferredAddressPostCodeFlag)
                        && d.PropertyInfo.Name != nameof(TriedToUpdateInFinalState)
                        && d.PropertyInfo.Name != nameof(LdapFirstName)
                        && d.PropertyInfo.Name != nameof(LdapLastName)
                        && d.PropertyInfo.Name != nameof(LdapCity)
                        && d.PropertyInfo.Name != nameof(LdapEmail)
                        && d.PropertyInfo.Name != nameof(GovernmentEmail)
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

        [Sieve(CanFilter = true, CanSort = true)]
        public virtual string Telkey ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true)]
        [Required]
        public string GovernmentEmployeeId ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string FirstName ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string PreferredFirstName ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Boolean PreferredFirstNameFlag ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string LastName ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true)]
        [Required]
        public string RecordCount ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.Date)]
        [Required]
        public DateTime BirthDate ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Gender ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        public string GovernmentEmail ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        public string PreferredEmail ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Boolean PreferredEmailFlag ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
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

        [Sieve(CanFilter = true, CanSort = true)]
        [DataType(DataType.Date)]
        [Required]
        public DateTime EffectiveDate ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
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
        public string PreferredAddress1 ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Boolean PreferredAddress1Flag ***REMOVED*** get; set; ***REMOVED***

        public string PreferredAddress2 ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Boolean PreferredAddress2Flag ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string PreferredAddressCity ***REMOVED*** get; set; ***REMOVED***

        public Boolean PreferredAddressCityFlag ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string PreferredAddressProvince ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Boolean PreferredAddressProvinceFlag ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string PreferredAddressPostCode ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Boolean PreferredAddressPostCodeFlag ***REMOVED*** get; set; ***REMOVED***

        // Ldap information (from the LDAP lookup)
        [Sieve(CanFilter = true, CanSort = true)]
        public string LdapEmail ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        public string LdapFirstName ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        public string LdapLastName ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        public string LdapCity ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Phone ***REMOVED*** get; set; ***REMOVED***

        [Required]
        [Sieve(CanFilter = true, CanSort = true)]
        public string AppointmentStatus ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string PositionCode ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string PositionTitle ***REMOVED*** get; set; ***REMOVED***

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
        [Sieve(CanFilter = true)]
        public string ExitCount ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string AgeGroup ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string ClassificationGroup ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string ServiceGroup ***REMOVED*** get; set; ***REMOVED***

        public string LocationGroup ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string CurrentEmployeeStatusCode ***REMOVED*** get; set; ***REMOVED***

        public virtual EmployeeStatusEnum CurrentEmployeeStatus ***REMOVED*** get; set; ***REMOVED***

        public virtual List<EmployeeTimelineEntry> TimelineEntries ***REMOVED*** get; set; ***REMOVED***

        public Boolean TriedToUpdateInFinalState ***REMOVED*** get; set; ***REMOVED***

        // Initialize all Preferred fields to be the equivalent of the base
        // field. This should only be run when the Employee is created.
        public void InstantiateFields()
        ***REMOVED***
            PreferredFirstName = FirstName;
            PreferredFirstNameFlag = false;
            PreferredEmail = GovernmentEmail ??= "";
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
      ***REMOVED***

        // Update all Preferred fields to be the equivalent of the base field,
        // so long as the Preferred field has never been overwritten (i.e. the
        // corresponding `Flag` is false).
        public void UpdatePreferredFields()
        ***REMOVED***
            if (!PreferredFirstNameFlag)
                PreferredFirstName = FirstName;
            if (!PreferredEmailFlag)
                PreferredEmail = GovernmentEmail;
            if (!PreferredAddress1Flag)
                PreferredAddress1 = Address1;
            if (!PreferredAddress2Flag)
                PreferredAddress2 = Address2;
            if (!PreferredAddressCityFlag)
                PreferredAddressCity = AddressCity;
            if (!PreferredAddressProvinceFlag)
                PreferredAddressProvince = AddressProvince;
            if (!PreferredAddressPostCodeFlag)
                PreferredAddressPostCode = AddressPostCode;
      ***REMOVED***

        public string LeaveCode
        ***REMOVED***
            get
            ***REMOVED***
                switch (this.Reason)
                ***REMOVED***
                    case "Just Cause":
                    case "Redundant":
                    case "Rejection on Probation":
                        return "3";
                    case "Layoff (With Recall)":
                    case "Job Ends/End of Recall Limit":
                        return "2";
                    default: // All other cases; no need to enumerate here
                        return "1";
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***

        public string SurveyWindowFlag()
        ***REMOVED***
            return IsActive() ? "0" : "1";
      ***REMOVED***

        public Boolean IsActive()
        ***REMOVED***
            return EmployeeStatusEnum.IsActiveStatus(CurrentEmployeeStatusCode);
      ***REMOVED***

        public Boolean IsFinal()
        ***REMOVED***
            return !IsActive();
      ***REMOVED***

        public Boolean IsPastExpiryThreshold(int thresholdInDays)
        ***REMOVED***
            return EffectiveDate.AddDays(thresholdInDays) < DateTime.UtcNow && IsStatusExpired();
      ***REMOVED***

        public Boolean IsNowInsideExpiryThreshold(int thresholdInDays)
        ***REMOVED***
            return IsStatusExpired() && EffectiveDate.AddDays(thresholdInDays) > DateTime.UtcNow;
      ***REMOVED***

        public Boolean IsStatusExpired()
        ***REMOVED***
            return CurrentEmployeeStatusCode == EmployeeStatusEnum.Expired.Code;
      ***REMOVED***

        public Boolean IsStatusSurveyComplete()
        ***REMOVED***
            return CurrentEmployeeStatusCode == EmployeeStatusEnum.SurveyComplete.Code;
      ***REMOVED***

        public Boolean IsStatusNotExiting()
        ***REMOVED***
            return CurrentEmployeeStatusCode == EmployeeStatusEnum.NotExiting.Code;
      ***REMOVED***

        public override string ToString()
        ***REMOVED***
            return $"***REMOVED***FullName***REMOVED*** (***REMOVED***GovernmentEmployeeId***REMOVED***)";
      ***REMOVED***

        /// <summary>
        /// Retrieve an employee's first name, last name, and email from LDAP,
        /// as they may have been updated since the PSA data extract.
        ///
        /// If the LDAP lookup finds a person with the employee's employee ID
        /// who works at BC Assessment, we must ignore the LDAP values. This is
        /// because there is a clash between employee IDs — they are not unique.
        /// </summary>
        /// <param name="infoLookupService">The <see cref="NewJobSurveyAdmin.Services.EmployeeInfoLookupService" /> to be used to look up the info.</param>
        public void UpdateInfoFromLdap(EmployeeInfoLookupService infoLookupService)
        ***REMOVED***
            var ldapInfo = infoLookupService.GetEmployeeInfoFromLdap(GovernmentEmployeeId);

            LdapFirstName = ldapInfo.FirstName;
            LdapLastName = ldapInfo.LastName;
            LdapEmail = ldapInfo.Email;
            LdapCity = ldapInfo.City;

            if (ldapInfo.Organization != null && ldapInfo.Organization.Equals("BC Assessment"))
            ***REMOVED***
                // If the organization is "BC Assessment", we need to use the
                // already-set values regardless. This is due to an ID clash.
                GovernmentEmail = ldapInfo.EmailOverride ?? null;
          ***REMOVED***
            else
            ***REMOVED***
                // Otherwise we can use the LDAP info, defaulting back to what
                // was set in the PSA extract if anything is null.
                FirstName = ldapInfo.FirstName ?? FirstName;
                LastName = ldapInfo.LastName ?? LastName;
                GovernmentEmail = ldapInfo.EmailOverride ?? ldapInfo.Email ?? null;
                LocationCity = ldapInfo.City ?? LocationCity;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
