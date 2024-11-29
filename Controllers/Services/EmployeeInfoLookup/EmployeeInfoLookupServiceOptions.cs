namespace ExitSurveyAdmin.Services
{
    public class EmployeeInfoLookupServiceOptions
    {
        public string Host { get; set; }
        public string TrustedIssuers { get; set; }
        public int Port { get; set; }
        public string Base { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string OverrideEmail { get; set; }
    }
}
