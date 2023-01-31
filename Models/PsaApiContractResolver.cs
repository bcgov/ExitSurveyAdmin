using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

// Map JSON keys from the PSA API to fields on an Employee. Adapted from
// https://stackoverflow.com/a/31484563/715870
public class PsaApiContractResolver : DefaultContractResolver
{
    private Dictionary<string, string> PropertyMappings { get; set; }

    public PsaApiContractResolver()
    {
        this.PropertyMappings = new Dictionary<string, string>
        {
            { "Age", "AGE" },
            { "AppointmentStatus", "APPOINTMENT STATUS" },
            { "BirthDate", "BIRTHDATE" },
            { "ChipsEmail", "CHIPS EMAIL" },
            { "ChipsCity", "CITY" },
            { "Classification", "CLASSIFICATION" },
            { "DepartmentId", "DEPTID" },
            { "DepartmentIdDescription", "DEPTID DESCR" },
            { "DevelopmentRegion", "DEVELOPMENT REGION" },
            { "RecordCount", "EMPL_RCD" },
            { "GovernmentEmployeeId", "EMPLID" },
            { "ChipsFirstName", "FIRST NAME" },
            { "Gender", "GENDER" },
            { "StaffingAction", "HIRE STAFFING ACTION" },
            { "EffectiveDate", "HIRE STAFFING EFFDT" },
            { "StaffingReason", "HIRE STAFFING REASON" },
            { "JobClassificationGroup", "JOBCLASGRP" },
            { "JobCode", "JOBCODE" },
            { "ChipsLastName", "LAST NAME" },
            { "LocationGroup", "LOCATION GROUP" },
            { "MiddleName", "MIDDLE NAME" },
            { "NewHireOrInternalStaffing", "NEW HIRE OR INTERNAL STAFFING" },
            { "NocCode", "NOC CODE" },
            { "NocDescription", "NOC DESCR" },
            { "OrganizationCount", "ORG COUNT" },
            { "Organization", "ORGANIZATION" },
            { "PositionCode", "POSITION" },
            { "PositionTitle", "POSITION TITLE" },
            { "PriorAppointmentStatus", "PRIOR APPOINTMENT STATUS" },
            { "PriorClassification", "PRIOR CLASSIFICATION" },
            { "PriorDepartmentId", "PRIOR DEPTID" },
            { "PriorDepartmentIdDescription", "PRIOR DEPTID DESCR" },
            { "PriorEffectiveDate", "PRIOR EFFDT" },
            { "PriorEmployeeStatus", "PRIOR EMPL STATUS" },
            { "PriorJobClassificationGroup", "PRIOR JOBCLASGRP" },
            { "PriorJobCode", "PRIOR JOBCODE" },
            { "PriorNocCode", "PRIOR NOC CODE" },
            { "PriorNocDescription", "PRIOR NOC DESCR" },
            { "PriorOrganization", "PRIOR ORGANIZATION" },
            { "PriorPositionCode", "PRIOR POSITION" },
            { "PriorPositionTitle", "PRIOR POSITION TITLE" },
            { "PriorUnionCode", "PRIOR UNION CODE" },
            { "RegionalDistrict", "REGIONAL DISTRICT" },
            { "ServiceYears", "SERVICE" },
            { "TaToPermanent", "TA TO PERMANENT" },
            { "UnionCode", "UNION CODE" },
        };
    }

    protected override string ResolvePropertyName(string propertyName)
    {
        string resolvedName = null;
        var resolved = this.PropertyMappings.TryGetValue(propertyName, out resolvedName);
        return (resolved) ? resolvedName : base.ResolvePropertyName(propertyName);
    }
}
