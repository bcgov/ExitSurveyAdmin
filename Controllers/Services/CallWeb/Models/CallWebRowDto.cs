namespace ExitSurveyAdmin.Services.CallWeb
{
    public partial class CallWebRowDto
    {
        public string Telkey { get; set; }
        public string Email { get; set; }
        public string Ministry { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveReason { get; set; }
        public string LeaveCode { get; set; }
        public string EffectiveDate { get; set; }
        public string CurrentStatus { get; set; }
        public string IsSurveyComplete { get; set; }
    }
}
