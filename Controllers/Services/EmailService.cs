using System.Globalization;
using System.Text;
using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System.Net.Http;
using Microsoft.VisualBasic.FileIO;
using CsvHelper;
using MailKit;
using MailKit.Net.Smtp;
using MimeKit;

namespace ExitSurveyAdmin.Services
{


    public static class EmailService
    {
        // Sends an email.
        public static void SendEmail(
            AppConfiguration appConfiguration,
            string toName, string toAddress,
            string subject, string text
        )
        {
            var fromName = appConfiguration.EmailFromName;
            var fromAddress = appConfiguration.EmailFromAddress;
            var smtpServer = appConfiguration.SMTPServer;
            var smtpPort = appConfiguration.SMTPPort;

            Console.WriteLine($"{fromName}, {fromAddress}, {smtpServer}, {smtpPort}");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromName, fromAddress));
            message.To.Add(new MailboxAddress(toName, toAddress));
            message.Subject = subject;

            message.Body = new TextPart("plain")
            {
                Text = text
            };

            Console.WriteLine("Sending", subject, text);

            using (var client = new SmtpClient())
            {
                client.CheckCertificateRevocation = false;
                client.Connect(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.None);
                client.Send(message);
                client.Disconnect(true);
            }

            Console.WriteLine("Done sending.");
        }
    }
}
