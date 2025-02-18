using System;
using System.Linq;
using Microsoft.Extensions.Options;
using Novell.Directory.Ldap;
using System.Security.Cryptography.X509Certificates;

namespace ExitSurveyAdmin.Services
{
    public class EmployeeInfoLookupService
    {
        private string Host { get; set; }
        private string TrustedIssuers { get; set; }
        private int Port { get; set; }
        private string Base { get; set; }
        private string Username { get; set; }
        private string Password { get; set; }
        private string OverrideEmail { get; set; }

        public EmployeeInfoLookupService(IOptions<EmployeeInfoLookupServiceOptions> options)
        {
            Host = options.Value.Host;
            TrustedIssuers = options.Value.TrustedIssuers;
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
                    ldapConnection.SecureSocketLayer = true;

                    // this will allow all errors to be accepted
                    //ldapConnection.UserDefinedServerCertValidationDelegate += (sender, cert, chain, sslPolicyErrors) => true;

                    ldapConnection.UserDefinedServerCertValidationDelegate += (sender, certificate, chain, sslPolicyErrors) =>
                    {
                        // Handle Remote Certificate Chain Errors (e.g. untrusted root)
                        // Our Root CA is issued by an internal CA, so we need to check
                        // that the certificate is signed by one of our trusted issuers.
                        if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.RemoteCertificateChainErrors && chain != null)
                        {
                            foreach (var chainElement in chain.ChainElements)
                            {
                                var issuer = chainElement.Certificate.Issuer;

                                if (!TrustedIssuers
                                        .Split(',')
                                        .Select(s => s.Trim())
                                        .Any(substring => issuer.Contains(substring)))
                                {
                                    Console.WriteLine($"Certificate issuer not found in trusted issuers list: {issuer}");
                                    return false;
                                }
                            }
                        }
                        // all other errors are not trusted
                        else if (sslPolicyErrors != System.Net.Security.SslPolicyErrors.None)
                        {
                            Console.WriteLine($"SSL Policy Errors: {sslPolicyErrors}");
                            return false; // Reject the certificate
                        }

                        // Check for the expected host name
                        var serverCertificate = (X509Certificate2)certificate;
                        var dnsName = serverCertificate.GetNameInfo(X509NameType.DnsName, false);
                        // we're expecting dnsName to be <servername>.<Host>
                        if (!dnsName.ToLower().Contains(Host.ToLower()))
                        {
                            Console.WriteLine($"Certificate DNS Name Mismatch: {dnsName} -- Expected: {Host}");
                            return false; // Reject if the certificate's DNS Name doesn't match the expected value
                        }

                        // If all checks pass, accept the certificate
                        return true;
                    };


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
