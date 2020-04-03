using CsvHelper.Configuration;
using ExitSurveyAdmin.Models;

public class PSACSVMap : ClassMap<Employee>
{
    public PSACSVMap()
    {
        Map(m => m.EmployeeId).Name("EmplID");
    }
}