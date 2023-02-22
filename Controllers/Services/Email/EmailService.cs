using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using ExitSurveyAdmin.Models;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class EmailService
    {
        private LoggingService logger;

        private string FromName { get; set; }
        private string FromAddress { get; set; }
        private string ToName { get; set; }
        private string ToAddress { get; set; }
        private string SmtpServer { get; set; }
        private int SmtpPort { get; set; }

        // Sends an email.
        public EmailService(IOptions<EmailServiceOptions> options, LoggingService logger)
        {
            this.logger = logger;

            FromName = options.Value.FromName;
            FromAddress = options.Value.FromAddress;
            ToName = options.Value.ToName;
            ToAddress = options.Value.ToAddress;
            SmtpServer = options.Value.SmtpServer;
            SmtpPort = options.Value.SmtpPort;
        }

        public async void SendTaskResultEmail(EmployeeTaskResult taskResult)
        {
            try
            {
                await SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(
                        taskResult.Task,
                        taskResult.TaskOutcome
                    ),
                    taskResult.Message
                );
            }
            catch (Exception emailSendingException)
            {
                await logger.Log(
                    TaskEnum.EmailAdmins,
                    TaskOutcomeEnum.Fail,
                    $"Failed to send email: {emailSendingException.Message}"
                );
            }
        }

        public async void SendFailureEmail(TaskEnum task, Exception e)
        {
            try
            {
                await SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(task, TaskOutcomeEnum.Fail),
                    MessageHelper.MessageFromException(e)
                );
            }
            catch (Exception emailSendingException)
            {
                await logger.Log(
                    TaskEnum.EmailAdmins,
                    TaskOutcomeEnum.Fail,
                    $"Failed to send email: {emailSendingException.Message}"
                );
            }
        }

        protected async Task SendEmail(string subject, string text)
        {
            var isValid = await this.ValidateConfig();
            if (!isValid)
                return;

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

        protected async Task<Boolean> ValidateConfig()
        {
            // TODO: validate email config. If/when we update the project to
            // .NET 6+, we can instead use the ValidateOnStart method.

            var missingVars = "";

            if (string.IsNullOrEmpty(FromName))
                missingVars += "FromName ";

            if (string.IsNullOrEmpty(FromAddress))
                missingVars += "FromAddress ";

            if (string.IsNullOrEmpty(ToName))
                missingVars += "ToName ";

            if (string.IsNullOrEmpty(ToAddress))
                missingVars += "ToAddress ";

            if (string.IsNullOrEmpty(SmtpServer))
                missingVars += "SmtpServer ";

            if (SmtpPort == 0)
                missingVars += "SmtpPort ";

            if (missingVars.Length > 0)
            {
                await logger.Log(
                    TaskEnum.EmailAdmins,
                    TaskOutcomeEnum.Fail,
                    $"Failed to send email. Missing config vars: {missingVars}"
                );
                return false;
            }

            return true;
        }
    }
}
