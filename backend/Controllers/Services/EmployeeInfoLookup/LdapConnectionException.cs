using System;

public class LdapConnectionException : Exception
{
    public LdapConnectionException() { }

    public LdapConnectionException(string message)
        : base(message) { }

    public LdapConnectionException(string message, Exception inner)
        : base(message, inner) { }
}
