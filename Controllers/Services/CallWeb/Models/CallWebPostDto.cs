using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
{
    public class CallWebPostDto
    {
        public string EmployeeId { get; set; }
        public string PreferredEmail { get; set; }
        public string Ministry { get; set; }
        public string PositionTitle { get; set; }
        public string AppointmentStatus { get; set; }
        public string PreferredFirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveReason { get; set; }
        public string LeaveCode { get; set; }
        public string EffectiveDate { get; set; }
        public string ExitCount { get; set; }
        public string AdditionalJobCount { get; set; }
        public string CurrentStatus { get; set; }
        public string SurveyWindowFlag { get; set; }

        public static CallWebPostDto FromEmployee(Employee employee)
        {
            return new CallWebPostDto()
            {
                EmployeeId = employee.GovernmentEmployeeId,
                PreferredEmail = employee.PreferredEmail,
                Ministry = employee.Ministry,
                PositionTitle = employee.PositionTitle,
                AppointmentStatus = employee.AppointmentStatus,
                PreferredFirstName = employee.PreferredFirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                LeaveCode = employee.LeaveCode,
                EffectiveDate = employee.EffectiveDate.ToString("yyyy-MM-dd"),
                ExitCount = employee.ExitCount,
                AdditionalJobCount = employee.RecordCount,
                CurrentStatus = employee.CurrentEmployeeStatusCode,
                SurveyWindowFlag = employee.SurveyWindowFlag
            };
        }
    }
}