using Microsoft.Extensions.Configuration;

namespace ExitSurveyAdmin.Services
{
    public class AppConfiguration
    {
        public string SamplePSACSVFilePath { get; set; }
        public string SampleCallWebCSVFilePath { get; set; }
        public string EmailFromName { get; set; }
        public string EmailFromAddress { get; set; }
        public string SMTPServer { get; set; }
        public int SMTPPort { get; set; }
        public int TelkeyAddFactor { get; set; }
        public int TelkeyMultiplicationFactor { get; set; }
        public string LDAPHost { get; set; }
        public int LDAPPort { get; set; }
        public string LDAPBase { get; set; }
        public string LDAPUsername { get; set; }
        public string LDAPPassword { get; set; }
        public string LDAPOverrideEmail { get; set; }

        public string CallWebApiBaseUrl { get; set; }

        // public static AppConfiguration MyAppConfiguration { get; set; }
    }
}