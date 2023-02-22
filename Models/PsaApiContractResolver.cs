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
            // Check if this maps all required fields
            ***REMOVED*** "ServiceGroup", "Service%20Group%20BCSTATS" ***REMOVED***,
            ***REMOVED*** "Address2", "Address2" ***REMOVED***,
            ***REMOVED*** "Age", "Age" ***REMOVED***,
            ***REMOVED*** "AgeGroup", "Age%20Group%202" ***REMOVED***,
            ***REMOVED*** "AppointmentStatus", "Appointment%20Status" ***REMOVED***,
            ***REMOVED*** "BackDated", "Back%20Dated" ***REMOVED***,
            ***REMOVED*** "BirthDate", "Birthdate" ***REMOVED***,
            ***REMOVED*** "AddressCity", "City" ***REMOVED***,
            ***REMOVED*** "Classification", "Classification" ***REMOVED***,
            ***REMOVED*** "ClassificationGroup", "Classification%20Group" ***REMOVED***,
            ***REMOVED*** "DepartmentId", "DeptID%20Desc" ***REMOVED***, // Check this
            ***REMOVED*** "EffectiveDate", "Effdt" ***REMOVED***,
            ***REMOVED*** "RecordCount", "Empl%20Rcd" ***REMOVED***, // Check this
            ***REMOVED*** "GovernmentEmployeeId", "EmplID" ***REMOVED***,
            ***REMOVED*** "ExitCount", "Exit%20Count" ***REMOVED***,
            ***REMOVED*** "FirstName", "First%20Name" ***REMOVED***,
            ***REMOVED*** "Gender", "Gender" ***REMOVED***,
            ***REMOVED*** "JobCode", "Job_Code" ***REMOVED***,
            ***REMOVED*** "JobFunctionCode", "Job_Function" ***REMOVED***, // Check
            ***REMOVED*** "LastDayWorkedDate", "Last%20Day%20Worked" ***REMOVED***,
            ***REMOVED*** "LastName", "Last%20Name" ***REMOVED***,
            ***REMOVED*** "LeaveDate", "Leave%20Date" ***REMOVED***,
            ***REMOVED*** "LocationCity", "Location%20City" ***REMOVED***,
            ***REMOVED*** "LocationGroup", "Location%20Group" ***REMOVED***,
            ***REMOVED*** "Ministry", "Ministry" ***REMOVED***,
            ***REMOVED*** "OriginalHireDate", "Orig%20Hire%20Date" ***REMOVED***,
            ***REMOVED*** "Phone", "Phone" ***REMOVED***,
            ***REMOVED*** "PositionCode", "Position" ***REMOVED***, // Check
            ***REMOVED*** "PositionTitle", "Position%20Title" ***REMOVED***,
            ***REMOVED*** "AddressPostCode", "Post%20Code" ***REMOVED***,
            ***REMOVED*** "AddressProvince", "Prov" ***REMOVED***,
            ***REMOVED*** "Reason", "Reason" ***REMOVED***,
            ***REMOVED*** "ServiceYears", "Service" ***REMOVED***, // Check
            ***REMOVED*** "Address1", "Address1" ***REMOVED***,
      ***REMOVED***;
  ***REMOVED***

    protected override string ResolvePropertyName(string propertyName)
    ***REMOVED***
        string resolvedName = null;
        var resolved = this.PropertyMappings.TryGetValue(propertyName, out resolvedName);
        return (resolved) ? resolvedName : base.ResolvePropertyName(propertyName);
  ***REMOVED***
***REMOVED***
