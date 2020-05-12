using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmailService
    ***REMOVED***
        private string FromName ***REMOVED*** get; set; ***REMOVED***
        private string FromAddress ***REMOVED*** get; set; ***REMOVED***
        private string SmtpServer ***REMOVED*** get; set; ***REMOVED***
        private int SmtpPort ***REMOVED*** get; set; ***REMOVED***

        // Sends an email.
        public EmailService(IOptions<EmailServiceOptions> options)
        ***REMOVED***
            FromName = options.Value.FromName;
            FromAddress = options.Value.FromAddress;
            SmtpServer = options.Value.SmtpServer;
            SmtpPort = options.Value.SmtpPort;
      ***REMOVED***

        public void SendEmail(
            string toName, string toAddress,
            string subject, string text
        )
        ***REMOVED***
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(FromName, FromAddress));
            message.To.Add(new MailboxAddress(toName, toAddress));
            message.Subject = subject;

            message.Body = new TextPart("plain")
            ***REMOVED***
                Text = text
          ***REMOVED***;

            using (var client = new SmtpClient())
            ***REMOVED***
                client.CheckCertificateRevocation = false;
                client.Connect(SmtpServer, SmtpPort, MailKit.Security.SecureSocketOptions.None);
                client.Send(message);
                client.Disconnect(true);
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
