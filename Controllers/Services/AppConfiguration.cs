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
    }
}