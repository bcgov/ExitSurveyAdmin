using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ExitSurveyAdmin.Services
{
    public class EmailService
    {
        private string FromName { get; set; }
        private string FromAddress { get; set; }
        private string SmtpServer { get; set; }
        private int SmtpPort { get; set; }

        // Sends an email.
        public EmailService(IOptions<EmailServiceOptions> options)
        {
            FromName = options.Value.FromName;
            FromAddress = options.Value.FromAddress;
            SmtpServer = options.Value.SmtpServer;
            SmtpPort = options.Value.SmtpPort;
        }

        public void SendEmail(
            string toName, string toAddress,
            string subject, string text
        )
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(FromName, FromAddress));
            message.To.Add(new MailboxAddress(toName, toAddress));
            message.Subject = subject;

            message.Body = new TextPart("plain")
            {
                Text = text
            };

            using (var client = new SmtpClient())
            {
                client.CheckCertificateRevocation = false;
                client.Connect(SmtpServer, SmtpPort, MailKit.Security.SecureSocketOptions.None);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
