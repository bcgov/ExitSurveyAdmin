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
            { "ServiceGroup", "Service_Group_BCSTATS" },
            { "Address2", "Address2" },
            { "Age", "Age" },
            { "AgeGroup", "Age_Group_2" },
            { "AppointmentStatus", "Appointment_Status" },
            { "BackDated", "Back_Dated" },
            { "BirthDate", "Birthdate" },
            { "AddressCity", "City" },
            { "Classification", "Classification" },
            { "ClassificationGroup", "Classification_Group" },
            { "DepartmentId", "DeptID_Desc" },
            { "EffectiveDate", "Effdt" },
            { "RecordCount", "Empl_Rcd" },
            { "GovernmentEmployeeId", "EmplID" },
            { "ExitCount", "Exit_Count" },
            { "FirstName", "First_Name" },
            { "Gender", "Gender" },
            { "JobCode", "Job_Code" },
            { "JobFunctionCode", "Job_Function" },
            { "LastDayWorkedDate", "Last_Day_Worked" },
            { "LastName", "Last_Name" },
            { "LeaveDate", "Leave_Date" },
            { "LocationCity", "Location_City" },
            { "LocationGroup", "Location_Group" },
            { "Ministry", "Ministry" },
            { "OriginalHireDate", "Orig_Hire_Date" },
            { "Phone", "Phone" },
            { "PositionCode", "Position" },
            { "PositionTitle", "Position_Title" },
            { "AddressPostCode", "Post_Code" },
            { "AddressProvince", "Prov" },
            { "Reason", "Reason" },
            { "ServiceYears", "Service" },
            { "Address1", "Address1" },
        };
    }

    protected override string ResolvePropertyName(string propertyName)
    {
        string resolvedName = null;
        var resolved = this.PropertyMappings.TryGetValue(propertyName, out resolvedName);
        return (resolved) ? resolvedName : base.ResolvePropertyName(propertyName);
    }
}
