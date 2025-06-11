using System;

public class FailedToSaveContextException : Exception
{
    public FailedToSaveContextException() { }

    public FailedToSaveContextException(string message)
        : base(message) { }

    public FailedToSaveContextException(string message, Exception inner)
        : base(message, inner) { }
}
