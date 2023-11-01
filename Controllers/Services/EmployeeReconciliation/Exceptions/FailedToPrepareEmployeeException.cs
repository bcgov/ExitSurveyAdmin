using System;

public class FailedToPrepareEmployeeException : Exception
{
    public FailedToPrepareEmployeeException() { }

    public FailedToPrepareEmployeeException(string message)
        : base(message) { }

    public FailedToPrepareEmployeeException(string message, Exception inner)
        : base(message, inner) { }
}
