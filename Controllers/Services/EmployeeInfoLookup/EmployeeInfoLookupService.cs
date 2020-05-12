using Microsoft.Extensions.Options;
using Novell.Directory.Ldap;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeInfoLookupService
    ***REMOVED***
        private string Host ***REMOVED*** get; set; ***REMOVED***
        private int Port ***REMOVED*** get; set; ***REMOVED***
        private string Base ***REMOVED*** get; set; ***REMOVED***
        private string Username ***REMOVED*** get; set; ***REMOVED***
        private string Password ***REMOVED*** get; set; ***REMOVED***
        private string OverrideEmail ***REMOVED*** get; set; ***REMOVED***

        public EmployeeInfoLookupService(IOptions<EmployeeInfoLookupServiceOptions> options)
        ***REMOVED***
            Host = options.Value.Host;
            Port = options.Value.Port;
            Base = options.Value.Base;
            Username = options.Value.Username;
            Password = options.Value.Password;
            OverrideEmail = options.Value.OverrideEmail;
      ***REMOVED***

        // Obtains an email address, given an employee ID.
        public string EmailByEmployeeId(string employeeId)
        ***REMOVED***
            // If the OverrideEmail config setting is set to a string, then
            // we just return it. It will be the user email instead of looking
            // up their email.
            if (!string.IsNullOrWhiteSpace(OverrideEmail))
            ***REMOVED***
                return OverrideEmail;
          ***REMOVED***

            // Otherwise, continue on, using the LDAP connection to filter by
            // the employee ID and find the user's mail (email) attribute.
            using (var ldapConnection = new LdapConnection())
            ***REMOVED***
                ldapConnection.Connect(Host, Port);
                ldapConnection.Bind(Username, Password);

                ILdapSearchResults results = ldapConnection.Search(
                    Base,
                    LdapConnection.ScopeSub,
                    $"(employeeID=***REMOVED***employeeId***REMOVED***)",
                    new string[] ***REMOVED*** "mail" ***REMOVED***,
                    false
                );

                while (results.HasMore())
                ***REMOVED***
                    LdapEntry nextEntry = results.Next();
                    LdapAttributeSet attributes = nextEntry.GetAttributeSet();
                    System.Collections.IEnumerator ienum = attributes.GetEnumerator();

                    // Parse through the attribute set to get the attributes and the
                    // corresponding values
                    while (ienum.MoveNext())
                    ***REMOVED***
                        LdapAttribute attribute = (LdapAttribute)ienum.Current;
                        string attributeName = attribute.Name;
                        string attributeVal = attribute.StringValue;

                        if (attributeName == "mail")
                        ***REMOVED***
                            // Success. Return the mail attribute value, which
                            // is the user's email address.
                            return attributeVal;
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***

                // Return null if we don't find a user with that employeeId.
                return null;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
