using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

// Map JSON keys from the PSA API to fields on an Employee. Adapted from
// https://stackoverflow.com/a/31484563/715870
public class PsaApiContractResolver : DefaultContractResolver
***REMOVED***
    private Dictionary<string, string> PropertyMappings ***REMOVED*** get; set; ***REMOVED***

    public PsaApiContractResolver()
    ***REMOVED***
        this.PropertyMappings = new Dictionary<string, string>
        ***REMOVED***
            ***REMOVED*** "Age", "AGE" ***REMOVED***,
            ***REMOVED*** "AppointmentStatus", "APPOINTMENT STATUS" ***REMOVED***,
            ***REMOVED*** "BirthDate", "BIRTHDATE" ***REMOVED***,
            ***REMOVED*** "ChipsEmail", "CHIPS EMAIL" ***REMOVED***,
            ***REMOVED*** "ChipsCity", "CITY" ***REMOVED***,
            ***REMOVED*** "Classification", "CLASSIFICATION" ***REMOVED***,
            ***REMOVED*** "DepartmentId", "DEPTID" ***REMOVED***,
            ***REMOVED*** "DepartmentIdDescription", "DEPTID DESCR" ***REMOVED***,
            ***REMOVED*** "DevelopmentRegion", "DEVELOPMENT REGION" ***REMOVED***,
            ***REMOVED*** "RecordCount", "EMPL_RCD" ***REMOVED***,
            ***REMOVED*** "GovernmentEmployeeId", "EMPLID" ***REMOVED***,
            ***REMOVED*** "ChipsFirstName", "FIRST NAME" ***REMOVED***,
            ***REMOVED*** "Gender", "GENDER" ***REMOVED***,
            ***REMOVED*** "StaffingAction", "HIRE STAFFING ACTION" ***REMOVED***,
            ***REMOVED*** "EffectiveDate", "HIRE STAFFING EFFDT" ***REMOVED***,
            ***REMOVED*** "StaffingReason", "HIRE STAFFING REASON" ***REMOVED***,
            ***REMOVED*** "JobClassificationGroup", "JOBCLASGRP" ***REMOVED***,
            ***REMOVED*** "JobCode", "JOBCODE" ***REMOVED***,
            ***REMOVED*** "ChipsLastName", "LAST NAME" ***REMOVED***,
            ***REMOVED*** "LocationGroup", "LOCATION GROUP" ***REMOVED***,
            ***REMOVED*** "MiddleName", "MIDDLE NAME" ***REMOVED***,
            ***REMOVED*** "NewHireOrInternalStaffing", "NEW HIRE OR INTERNAL STAFFING" ***REMOVED***,
            ***REMOVED*** "NocCode", "NOC CODE" ***REMOVED***,
            ***REMOVED*** "NocDescription", "NOC DESCR" ***REMOVED***,
            ***REMOVED*** "OrganizationCount", "ORG COUNT" ***REMOVED***,
            ***REMOVED*** "Organization", "ORGANIZATION" ***REMOVED***,
            ***REMOVED*** "PositionCode", "POSITION" ***REMOVED***,
            ***REMOVED*** "PositionTitle", "POSITION TITLE" ***REMOVED***,
            ***REMOVED*** "PriorAppointmentStatus", "PRIOR APPOINTMENT STATUS" ***REMOVED***,
            ***REMOVED*** "PriorClassification", "PRIOR CLASSIFICATION" ***REMOVED***,
            ***REMOVED*** "PriorDepartmentId", "PRIOR DEPTID" ***REMOVED***,
            ***REMOVED*** "PriorDepartmentIdDescription", "PRIOR DEPTID DESCR" ***REMOVED***,
            ***REMOVED*** "PriorEffectiveDate", "PRIOR EFFDT" ***REMOVED***,
            ***REMOVED*** "PriorEmployeeStatus", "PRIOR EMPL STATUS" ***REMOVED***,
            ***REMOVED*** "PriorJobClassificationGroup", "PRIOR JOBCLASGRP" ***REMOVED***,
            ***REMOVED*** "PriorJobCode", "PRIOR JOBCODE" ***REMOVED***,
            ***REMOVED*** "PriorNocCode", "PRIOR NOC CODE" ***REMOVED***,
            ***REMOVED*** "PriorNocDescription", "PRIOR NOC DESCR" ***REMOVED***,
            ***REMOVED*** "PriorOrganization", "PRIOR ORGANIZATION" ***REMOVED***,
            ***REMOVED*** "PriorPositionCode", "PRIOR POSITION" ***REMOVED***,
            ***REMOVED*** "PriorPositionTitle", "PRIOR POSITION TITLE" ***REMOVED***,
            ***REMOVED*** "PriorUnionCode", "PRIOR UNION CODE" ***REMOVED***,
            ***REMOVED*** "RegionalDistrict", "REGIONAL DISTRICT" ***REMOVED***,
            ***REMOVED*** "ServiceYears", "SERVICE" ***REMOVED***,
            ***REMOVED*** "TaToPermanent", "TA TO PERMANENT" ***REMOVED***,
            ***REMOVED*** "UnionCode", "UNION CODE" ***REMOVED***,
      ***REMOVED***;
  ***REMOVED***

    protected override string ResolvePropertyName(string propertyName)
    ***REMOVED***
        string resolvedName = null;
        var resolved = this.PropertyMappings.TryGetValue(propertyName, out resolvedName);
        return (resolved) ? resolvedName : base.ResolvePropertyName(propertyName);
  ***REMOVED***
***REMOVED***
