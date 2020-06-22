using System;
using Microsoft.Extensions.Options;
using Novell.Directory.Ldap;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeInfoLookupService
    {
        private string Host { get; set; }
        private int Port { get; set; }
        private string Base { get; set; }
        private string Username { get; set; }
        private string Password { get; set; }
        private string OverrideEmail { get; set; }

        public EmployeeInfoLookupService(IOptions<EmployeeInfoLookupServiceOptions> options)
        {
            Host = options.Value.Host;
            Port = options.Value.Port;
            Base = options.Value.Base;
            Username = options.Value.Username;
            Password = options.Value.Password;
            OverrideEmail = options.Value.OverrideEmail;
        }

        // Obtains an email address, given an employee ID.
        public string EmailByEmployeeId(string employeeId)
        {
            // If the OverrideEmail config setting is set to a string, then
            // we just return it. It will be the user email instead of looking
            // up their email.
            if (!string.IsNullOrWhiteSpace(OverrideEmail))
            {
                return OverrideEmail;
            }

            // Otherwise, continue on, using the LDAP connection to filter by
            // the employee ID and find the user's mail (email) attribute.
            using (var ldapConnection = new LdapConnection())
            {
                ldapConnection.Connect(Host, Port);
                ldapConnection.Bind(Username, Password);

                ILdapSearchResults results = ldapConnection.Search(
                    Base,
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

                // Throw an exception if we don't find a user with that employeeId.
                throw new InvalidOperationException(
                    $"User with id {employeeId} has no email address in LDAP."
                );
            }
        }
    }
}
