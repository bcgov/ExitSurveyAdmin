using CsvHelper.Configuration;
using ExitSurveyAdmin.Models;

public class PSACSVMap : ClassMap<Employee>
{
    public PSACSVMap()
    {
        Map(m => m.GovernmentEmployeeId).Name("EmplID");
    }
}