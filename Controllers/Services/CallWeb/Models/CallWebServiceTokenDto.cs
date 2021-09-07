namespace ExitSurveyAdmin.Services.CallWeb
{
    public partial class CallWebServiceTokenDto
    {
        public string access_token { get; set; }
        public long expires_in { get; set; }
        public long ExpiresAtUnix { get; set; }
    }
}
