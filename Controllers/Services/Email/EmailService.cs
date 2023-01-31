using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services
{
    public class EmailService
    {
        private string FromName { get; set; }
        private string FromAddress { get; set; }
        private string ToName { get; set; }
        private string ToAddress { get; set; }
        private string SmtpServer { get; set; }
        private int SmtpPort { get; set; }

        // Sends an email.
        public EmailService(IOptions<EmailServiceOptions> options)
        {
            FromName = options.Value.FromName;
            FromAddress = options.Value.FromAddress;
            ToName = options.Value.ToName;
            ToAddress = options.Value.ToAddress;
            SmtpServer = options.Value.SmtpServer;
            SmtpPort = options.Value.SmtpPort;
        }

        public void SendTaskResultEmail(EmployeeTaskResult taskResult)
        {
            try
            {
                SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(
                        taskResult.Task,
                        taskResult.TaskOutcome
                    ),
                    taskResult.Message
                );
            }
            catch
            {
                // Fail silently; this is currently offered on a best-effort
                // basis.
            }
        }

        public void SendFailureEmail(TaskEnum task, Exception e)
        {
            try
            {
                SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(task, TaskOutcomeEnum.Fail),
                    MessageHelper.MessageFromException(e)
                );
            }
            catch
            {
                // Fail silently; this is currently offered on a best-effort
                // basis.
            }
        }

        protected void SendEmail(string subject, string text)
        {
            // This is a no-op if either ToName and ToAddress are null or blank
            if (ToName == null || ToName.Equals("") || ToAddress == null || ToAddress.Equals(""))
            {
                return;
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(FromName, FromAddress));
            message.To.Add(new MailboxAddress(ToName, ToAddress));
            message.Subject = $"[ESA] {subject}";

            message.Body = new TextPart("plain") { Text = text };

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
