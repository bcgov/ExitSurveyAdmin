using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmailService
    ***REMOVED***
        private string FromName ***REMOVED*** get; set; ***REMOVED***
        private string FromAddress ***REMOVED*** get; set; ***REMOVED***
        private string ToName ***REMOVED*** get; set; ***REMOVED***
        private string ToAddress ***REMOVED*** get; set; ***REMOVED***
        private string SmtpServer ***REMOVED*** get; set; ***REMOVED***
        private int SmtpPort ***REMOVED*** get; set; ***REMOVED***

        // Sends an email.
        public EmailService(IOptions<EmailServiceOptions> options)
        ***REMOVED***
            FromName = options.Value.FromName;
            FromAddress = options.Value.FromAddress;
            ToName = options.Value.ToName;
            ToAddress = options.Value.ToAddress;
            SmtpServer = options.Value.SmtpServer;
            SmtpPort = options.Value.SmtpPort;
      ***REMOVED***

        public void SendTaskResultEmail(EmployeeTaskResult taskResult)
        ***REMOVED***
            try
            ***REMOVED***
                SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(
                        taskResult.Task,
                        taskResult.TaskOutcome
                    ),
                    taskResult.Message
                );
          ***REMOVED***
            catch
            ***REMOVED***
                // Fail silently; this is currently offered on a best-effort
                // basis.
          ***REMOVED***
      ***REMOVED***

        public void SendFailureEmail(TaskEnum task, Exception e)
        ***REMOVED***
            try
            ***REMOVED***
                SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(task, TaskOutcomeEnum.Fail),
                    MessageHelper.MessageFromException(e)
                );
          ***REMOVED***
            catch
            ***REMOVED***
                // Fail silently; this is currently offered on a best-effort
                // basis.
          ***REMOVED***
      ***REMOVED***

        protected void SendEmail(string subject, string text)
        ***REMOVED***
            // This is a no-op if either ToName and ToAddress are null or blank
            if (ToName == null || ToName.Equals("") || ToAddress == null || ToAddress.Equals(""))
            ***REMOVED***
                return;
          ***REMOVED***

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(FromName, FromAddress));
            message.To.Add(new MailboxAddress(ToName, ToAddress));
            message.Subject = $"[ESA] ***REMOVED***subject***REMOVED***";

            message.Body = new TextPart("plain") ***REMOVED*** Text = text ***REMOVED***;

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
