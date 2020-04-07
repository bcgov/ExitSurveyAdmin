using CsvHelper.Configuration;
using ExitSurveyAdmin.Models;

public class PSACSVMap : ClassMap<Employee>
***REMOVED***
    public PSACSVMap()
    ***REMOVED***
        Map(m => m.GovernmentEmployeeId).Name("EmplID");
  ***REMOVED***
***REMOVED***