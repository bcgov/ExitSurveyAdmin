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
            // Check if this maps all required fields
            { "ServiceGroup", "Service%20Group%20BCSTATS" },
            { "Address2", "Address2" },
            { "Age", "Age" },
            { "AgeGroup", "Age%20Group%202" },
            { "AppointmentStatus", "Appointment%20Status" },
            { "BackDated", "Back%20Dated" },
            { "BirthDate", "Birthdate" },
            { "AddressCity", "City" },
            { "Classification", "Classification" },
            { "ClassificationGroup", "Classification%20Group" },
            { "DepartmentId", "DeptID%20Desc" }, // Check this
            { "EffectiveDate", "Effdt" },
            { "RecordCount", "Empl%20Rcd" }, // Check this
            { "GovernmentEmployeeId", "EmplID" },
            { "ExitCount", "Exit%20Count" },
            { "FirstName", "First%20Name" },
            { "Gender", "Gender" },
            { "JobCode", "Job_Code" },
            { "JobFunctionCode", "Job_Function" }, // Check
            { "LastDayWorkedDate", "Last%20Day%20Worked" },
            { "LastName", "Last%20Name" },
            { "LeaveDate", "Leave%20Date" },
            { "LocationCity", "Location%20City" },
            { "LocationGroup", "Location%20Group" },
            { "Ministry", "Ministry" },
            { "OriginalHireDate", "Orig%20Hire%20Date" },
            { "Phone", "Phone" },
            { "PositionCode", "Position" }, // Check
            { "PositionTitle", "Position%20Title" },
            { "AddressPostCode", "Post%20Code" },
            { "AddressProvince", "Prov" },
            { "Reason", "Reason" },
            { "ServiceYears", "Service" }, // Check
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
