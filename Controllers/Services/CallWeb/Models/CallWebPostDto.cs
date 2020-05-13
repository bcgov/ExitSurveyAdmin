using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
{
    public class CallWebPostDto
    {
        public string EmployeeId { get; set; }
        public string Email { get; set; }
        public string Ministry { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveReason { get; set; }
        public string EffectiveDate { get; set; }
        public string ExitCount { get; set; }
        public string AdditionalJobCount { get; set; }
        public string CurrentStatus { get; set; }

        public static CallWebPostDto FromEmployee(Employee employee)
        {
            return new CallWebPostDto()
            {
                EmployeeId = employee.GovernmentEmployeeId,
                Email = employee.GovernmentEmail,
                Ministry = employee.Ministry,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                EffectiveDate = employee.EffectiveDate.ToString("yyyy/MM/dd"),
                ExitCount = employee.ExitCount,
                AdditionalJobCount = employee.RecordCount,
                CurrentStatus = employee.CurrentEmployeeStatusCode
            };
        }
    }
}