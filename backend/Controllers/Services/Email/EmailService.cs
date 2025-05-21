using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using ExitSurveyAdmin.Models;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmailService
    ***REMOVED***
        private LoggingService logger;

        private string FromName ***REMOVED*** get; set; ***REMOVED***
        private string FromAddress ***REMOVED*** get; set; ***REMOVED***
        private string ToName ***REMOVED*** get; set; ***REMOVED***
        private string ToAddress ***REMOVED*** get; set; ***REMOVED***
        private string SmtpServer ***REMOVED*** get; set; ***REMOVED***
        private int SmtpPort ***REMOVED*** get; set; ***REMOVED***

        // Sends an email.
        public EmailService(IOptions<EmailServiceOptions> options, LoggingService logger)
        ***REMOVED***
            this.logger = logger;

            FromName = options.Value.FromName;
            FromAddress = options.Value.FromAddress;
            ToName = options.Value.ToName;
            ToAddress = options.Value.ToAddress;
            SmtpServer = options.Value.SmtpServer;
            SmtpPort = options.Value.SmtpPort;
      ***REMOVED***

        public async void SendTaskResultEmail(EmployeeTaskResult taskResult)
        ***REMOVED***
            try
            ***REMOVED***
                await SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(
                        taskResult.Task,
                        taskResult.TaskOutcome
                    ),
                    taskResult.Message
                );
          ***REMOVED***
            catch (Exception emailSendingException)
            ***REMOVED***
                await logger.Log(
                    TaskEnum.EmailAdmins,
                    TaskOutcomeEnum.Fail,
                    $"Failed to send email: ***REMOVED***emailSendingException.Message***REMOVED***"
                );
          ***REMOVED***
      ***REMOVED***

        public async void SendFailureEmail(TaskEnum task, Exception e)
        ***REMOVED***
            try
            ***REMOVED***
                await SendEmail(
                    MessageHelper.EmailSubjectFromTaskAndOutcome(task, TaskOutcomeEnum.Fail),
                    MessageHelper.MessageFromException(e)
                );
          ***REMOVED***
            catch (Exception emailSendingException)
            ***REMOVED***
                await logger.Log(
                    TaskEnum.EmailAdmins,
                    TaskOutcomeEnum.Fail,
                    $"Failed to send email: ***REMOVED***emailSendingException.Message***REMOVED***"
                );
          ***REMOVED***
      ***REMOVED***

        protected async Task SendEmail(string subject, string text)
        ***REMOVED***
            var isValid = await this.ValidateConfig();
            if (!isValid)
                return;

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

        protected async Task<Boolean> ValidateConfig()
        ***REMOVED***
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
            ***REMOVED***
                await logger.Log(
                    TaskEnum.EmailAdmins,
                    TaskOutcomeEnum.Fail,
                    $"Failed to send email. Missing config vars: ***REMOVED***missingVars***REMOVED***"
                );
                return false;
          ***REMOVED***

            return true;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
