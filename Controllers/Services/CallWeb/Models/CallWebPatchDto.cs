using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
{
    // The data transfer object to use when sending a PATCH request.
    public class CallWebPatchDto
    {
        public string Telkey { get; set; }
        public string PreferredEmail { get; set; }
        public string Ministry { get; set; }
        public string PositionTitle { get; set; }
        public string AppointmentStatus { get; set; }
        public string PreferredFirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveReason { get; set; }
        public string LeaveCode { get; set; }
        public string EffectiveDate { get; set; }
        public string CurrentStatus { get; set; }

        public static CallWebPatchDto FromEmployee(Employee employee)
        {
            return new CallWebPatchDto()
            {
                Telkey = employee.Telkey,
                PreferredEmail = employee.PreferredEmail,
                Ministry = employee.Ministry,
                PositionTitle = employee.PositionTitle,
                AppointmentStatus = employee.AppointmentStatus,
                PreferredFirstName = employee.PreferredFirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                LeaveCode = employee.LeaveCode,
                EffectiveDate = employee.EffectiveDate.ToString("yyyy-MM-dd"),
                CurrentStatus = employee.CurrentEmployeeStatusCode
            };
        }
    }
}