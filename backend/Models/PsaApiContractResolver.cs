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
            ***REMOVED*** "ServiceGroup", "Service_Group_BCSTATS" ***REMOVED***,
            ***REMOVED*** "Address2", "Address2" ***REMOVED***,
            ***REMOVED*** "Age", "Age" ***REMOVED***,
            ***REMOVED*** "AgeGroup", "Age_Group_2" ***REMOVED***,
            ***REMOVED*** "AppointmentStatus", "Appointment_Status" ***REMOVED***,
            ***REMOVED*** "BackDated", "Back_Dated" ***REMOVED***,
            ***REMOVED*** "BirthDate", "Birthdate" ***REMOVED***,
            ***REMOVED*** "AddressCity", "City" ***REMOVED***,
            ***REMOVED*** "Classification", "Classification" ***REMOVED***,
            ***REMOVED*** "ClassificationGroup", "Classification_Group" ***REMOVED***,
            ***REMOVED*** "DepartmentId", "DeptID_Desc" ***REMOVED***,
            ***REMOVED*** "EffectiveDate", "Effdt" ***REMOVED***,
            ***REMOVED*** "RecordCount", "Empl_Rcd" ***REMOVED***,
            ***REMOVED*** "GovernmentEmployeeId", "EmplID" ***REMOVED***,
            ***REMOVED*** "ExitCount", "Exit_Count" ***REMOVED***,
            ***REMOVED*** "FirstName", "First_Name" ***REMOVED***,
            ***REMOVED*** "Gender", "Gender" ***REMOVED***,
            ***REMOVED*** "JobCode", "Job_Code" ***REMOVED***,
            ***REMOVED*** "JobFunctionCode", "Job_Function" ***REMOVED***,
            ***REMOVED*** "LastDayWorkedDate", "Last_Day_Worked" ***REMOVED***,
            ***REMOVED*** "LastName", "Last_Name" ***REMOVED***,
            ***REMOVED*** "LeaveDate", "Leave_Date" ***REMOVED***,
            ***REMOVED*** "LocationCity", "Location_City" ***REMOVED***,
            ***REMOVED*** "LocationGroup", "Location_Group" ***REMOVED***,
            ***REMOVED*** "Ministry", "Ministry" ***REMOVED***,
            ***REMOVED*** "OriginalHireDate", "Orig_Hire_Date" ***REMOVED***,
            ***REMOVED*** "Phone", "Phone" ***REMOVED***,
            ***REMOVED*** "PositionCode", "Position" ***REMOVED***,
            ***REMOVED*** "PositionTitle", "Position_Title" ***REMOVED***,
            ***REMOVED*** "AddressPostCode", "Post_Code" ***REMOVED***,
            ***REMOVED*** "AddressProvince", "Prov" ***REMOVED***,
            ***REMOVED*** "Reason", "Reason" ***REMOVED***,
            ***REMOVED*** "ServiceYears", "Service" ***REMOVED***,
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
