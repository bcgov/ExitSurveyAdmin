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

        // Obtains employee info from the LDAP system, given an employee ID.
        public EmployeeInfo GetEmployeeInfoFromLdap(string employeeId)
        {
            EmployeeInfo infoModel = new EmployeeInfo();

            try
            {
                // Use the LDAP connection to filter by the employee ID and find the
                // user's attributes, setting as necessary.
                using (var ldapConnection = new LdapConnection())
                {
                    ldapConnection.Connect(Host, Port);
                    ldapConnection.Bind(Username, Password);

                    // In LDAP:
                    //   `mail`      is the email
                    //   `company`   is the organization
                    //   `sn`        is the surname / last name
                    //   `givenName` is the given name / first name
                    //   `l`         is the location / city
                    ILdapSearchResults results = ldapConnection.Search(
                        Base,
                        LdapConnection.ScopeSub,
                        $"(employeeID={employeeId})",
                        new string[] { "mail", "company", "sn", "givenName", "l" },
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

                            if (attributeName.Equals("mail"))
                                infoModel.Email = attributeVal;
                            if (attributeName.Equals("company"))
                                infoModel.Organization = attributeVal;
                            if (attributeName.Equals("sn"))
                                infoModel.LastName = attributeVal;
                            if (attributeName.Equals("givenName"))
                                infoModel.FirstName = attributeVal;
                            if (attributeName.Equals("l"))
                                infoModel.City = attributeVal;
                        }
                    }
                }

                // If the OverrideEmail config setting is set to a string, then
                // we set it.
                if (!string.IsNullOrWhiteSpace(OverrideEmail))
                {
                    infoModel.EmailOverride = OverrideEmail;
                }

                return infoModel;
            }
            catch (Exception exception)
            {
                throw new LdapConnectionException(
                    "Could not connect to LDAP server; check login info and network status.",
                    exception
                );
            }
        }
    }
}
