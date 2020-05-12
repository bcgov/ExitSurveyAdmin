namespace CallWebApi.Models
{
    public partial class CallWebRowDto
    {
        public int Id { get; set; }
        public string Telkey { get; set; }
        public string Email { get; set; }
        public string Ministry { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveReason { get; set; }
        public int? LeaveCode { get; set; }
        public string EffectiveDate { get; set; }
        public string CurrentStatus { get; set; }
        public bool IsSurveyComplete { get; set; }
    }
}
