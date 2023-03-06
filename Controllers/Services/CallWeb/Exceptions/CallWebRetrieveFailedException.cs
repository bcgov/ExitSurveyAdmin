using System;

public class CallWebRetrieveFailedException : Exception
{
    public CallWebRetrieveFailedException() { }

    public CallWebRetrieveFailedException(string message)
        : base(message) { }

    public CallWebRetrieveFailedException(string message, Exception inner)
        : base(message, inner) { }
}
