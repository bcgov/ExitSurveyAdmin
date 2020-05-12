namespace CallWebApi.Models
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
    }
}