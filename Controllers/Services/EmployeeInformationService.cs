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
using Novell.Directory.Ldap;

namespace ExitSurveyAdmin.Services
{


    public class EmployeeInformationService
    {
        // Obtains an email address, given an employee ID.
        public static string EmailByEmployeeId(string employeeId)
        {
            var config = AppConfiguration.MyAppConfiguration;

            // If the LDAPOverrideEmail config setting is set to a string, then
            // we just return it. It will be the user email instead of looking
            // up their email.
            if (!string.IsNullOrWhiteSpace(config.LDAPOverrideEmail))
            {
                return config.LDAPOverrideEmail;
            }

            // Otherwise, continue on, using the LDAP connection to filter by
            // the employee ID and find the user's mail (email) attribute.
            using (var ldapConnection = new LdapConnection())
            {
                ldapConnection.Connect(config.LDAPHost, config.LDAPPort);
                ldapConnection.Bind(config.LDAPUsername, config.LDAPPassword);

                ILdapSearchResults results = ldapConnection.Search(
                    config.LDAPBase,
                    LdapConnection.ScopeSub,
                    $"(employeeID={employeeId})",
                    new string[] { "mail" },
                    false
                );

                while (results.HasMore())
                {
                    LdapEntry nextEntry = results.Next();
                    LdapAttributeSet attributes = nextEntry.GetAttributeSet();
                    System.Collections.IEnumerator ienum = attributes.GetEnumerator();

                    // Parse through the attribute set to get the attributes and the
                    // corresponding values
                    while (ienum.MoveNext())
                    {
                        LdapAttribute attribute = (LdapAttribute)ienum.Current;
                        string attributeName = attribute.Name;
                        string attributeVal = attribute.StringValue;

                        if (attributeName == "mail")
                        {
                            // Success. Return the mail attribute value, which
                            // is the user's email address.
                            return attributeVal;
                        }
                    }
                }

                // Return null if we don't find a user with that employeeId.
                return null;
            }
        }
    }
}
