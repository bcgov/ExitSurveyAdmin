using System.IO;
using CsvHelper.Configuration;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;

public class PSACSVMap : ClassMap<Employee>
{
    public PSACSVMap()
    {
        // Ordered as they appear in the CSV extract.
        Map(m => m.GovernmentEmployeeId).Name("EmplID");
        Map(m => m.LastName).Name("Last Name");
        Map(m => m.FirstName).Name("First Name");
        Map(m => m.BirthDate).Name("Birthdate");
        Map(m => m.Gender).Name("Gender");
        Map(m => m.Classification).Name("Classification");
        Map(m => m.Ministry).Name("Ministry");
        Map(m => m.DepartmentId).Name("DeptID Desc");
        Map(m => m.JobFunctionCode).Name("Job Function");
        Map(m => m.LocationCity).Name("Location City");
        Map(m => m.OriginalHireDate).Name("Orig Hire Date");
        Map(m => m.LastDayWorkedDate).Name("Last Day Worked");
        Map(m => m.EffectiveDate).Name("Effdt");
        Map(m => m.Reason).Name("Reason");
        Map(m => m.Address1).Name("Address1");
        Map(m => m.Address2).Name("Address2");
        Map(m => m.AddressCity).Name("City");
        Map(m => m.AddressProvince).Name("Prov");
        Map(m => m.AddressPostCode).Name("Post Code");
        Map(m => m.Phone).Name("Phone");
        Map(m => m.AppointmentStatus).Name("Appointment Status");
        Map(m => m.PositionCode).Name("Position");
        Map(m => m.Age).Name("Age");
        Map(m => m.LeaveDate).Name("Leave Date");
        Map(m => m.ServiceYears).Name("Service");
        Map(m => m.JobCode).Name("Job Code");
        Map(m => m.BackDated).Name("Back Dated");
        Map(m => m.ExitCount).Name("Exit Count");
        Map(m => m.AgeGroup).Name("Age Group 2");
        Map(m => m.ClassificationGroup).Name("Classification Group");
        Map(m => m.ServiceGroup).Name("Service Group BCSTATS");
        Map(m => m.LocationGroup).Name("Location Group");
    }
}