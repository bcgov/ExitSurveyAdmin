namespace CallWebApi.Models
{
    // The data transfer object to use when sending a PATCH request.
    public class CallWebPatchDto
    {
        public string Email { get; set; }
        public string Ministry { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LeaveReason { get; set; }
        public int? LeaveCode { get; set; }
        public string EffectiveDate { get; set; }
        public string CurrentStatus { get; set; }
    }
}