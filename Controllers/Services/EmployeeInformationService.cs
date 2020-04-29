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
***REMOVED***


    public class EmployeeInformationService
    ***REMOVED***
        // Obtains an email address, given an employee ID.
        public static string EmailByEmployeeId(string employeeId)
        ***REMOVED***
            // For now, just set the email to the email specified as the 'from'
            // address.
            var fromAddress = AppConfiguration.MyAppConfiguration.EmailFromAddress;
            return fromAddress;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
