using System;
using Microsoft.Extensions.Options;
using Novell.Directory.Ldap;
using System.Security.Cryptography.X509Certificates;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class EmployeeInfoLookupService
    ***REMOVED***
        private string Host ***REMOVED*** get; set; ***REMOVED***
        private string TrustedIssuers ***REMOVED*** get; set; ***REMOVED***
        private int Port ***REMOVED*** get; set; ***REMOVED***
        private string Base ***REMOVED*** get; set; ***REMOVED***
        private string Username ***REMOVED*** get; set; ***REMOVED***
        private string Password ***REMOVED*** get; set; ***REMOVED***
        private string OverrideEmail ***REMOVED*** get; set; ***REMOVED***

        public EmployeeInfoLookupService(IOptions<EmployeeInfoLookupServiceOptions> options)
        ***REMOVED***
            Host = options.Value.Host;
            TrustedIssuers = options.Value.TrustedIssuers;
            Port = options.Value.Port;
            Base = options.Value.Base;
            Username = options.Value.Username;
            Password = options.Value.Password;
            OverrideEmail = options.Value.OverrideEmail;
      ***REMOVED***

        // Obtains employee info from the LDAP system, given an employee ID.
        public EmployeeInfo GetEmployeeInfoFromLdap(string employeeId)
        ***REMOVED***
            EmployeeInfo infoModel = new EmployeeInfo();

            try
            ***REMOVED***
                // Use the LDAP connection to filter by the employee ID and find the
                // user's attributes, setting as necessary.
                using (var ldapConnection = new LdapConnection())
                ***REMOVED***
                    ldapConnection.SecureSocketLayer = true;

                    // this will allow all errors to be accepted
                    //ldapConnection.UserDefinedServerCertValidationDelegate += (sender, cert, chain, sslPolicyErrors) => true;

                    ldapConnection.UserDefinedServerCertValidationDelegate += (sender, certificate, chain, sslPolicyErrors) =>
                    ***REMOVED***
                        // Handle Remote Certificate Chain Errors (e.g. untrusted root)
                        // Our Root CA is issued by an internal CA, so we need to check
                        // that the certificate is signed by one of our trusted issuers.
                        if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.RemoteCertificateChainErrors && chain != null)
                        ***REMOVED***
                            foreach (var chainElement in chain.ChainElements)
                            ***REMOVED***
                                var issuer = chainElement.Certificate.Issuer;

                                if (!TrustedIssuers.Contains(issuer))
                                ***REMOVED***
                                    Console.WriteLine($"Certificate issuer not found in trusted issuers list: ***REMOVED***issuer***REMOVED***");
                                    return false;
                              ***REMOVED***
                          ***REMOVED***
                      ***REMOVED***
                        // all other errors are not trusted
                        else if (sslPolicyErrors != System.Net.Security.SslPolicyErrors.None)
                        ***REMOVED***
                            Console.WriteLine($"SSL Policy Errors: ***REMOVED***sslPolicyErrors***REMOVED***");
                            return false; // Reject the certificate
                      ***REMOVED***

                        // Check for the expected host name
                        var serverCertificate = (X509Certificate2)certificate;
                        var dnsName = serverCertificate.GetNameInfo(X509NameType.DnsName, false);
                        // we're expecting dnsName to be <servername>.<Host>
                        if (!dnsName.ToLower().Contains(Host.ToLower()))
                        ***REMOVED***
                            Console.WriteLine($"Certificate DNS Name Mismatch: ***REMOVED***dnsName***REMOVED*** -- Expected: ***REMOVED***Host***REMOVED***");
                            return false; // Reject if the certificate's DNS Name doesn't match the expected value
                      ***REMOVED***

                        // If all checks pass, accept the certificate
                        return true;
                  ***REMOVED***;


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
                        $"(employeeID=***REMOVED***employeeId***REMOVED***)",
                        new string[] ***REMOVED*** "mail", "company", "sn", "givenName", "l" ***REMOVED***,
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
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***

                // If the OverrideEmail config setting is set to a string, then
                // we set it.
                if (!string.IsNullOrWhiteSpace(OverrideEmail))
                ***REMOVED***
                    infoModel.EmailOverride = OverrideEmail;
              ***REMOVED***

                return infoModel;
          ***REMOVED***
            catch (Exception exception)
            ***REMOVED***
                throw new LdapConnectionException(
                    "Could not connect to LDAP server; check login info and network status.",
                    exception
                );
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
