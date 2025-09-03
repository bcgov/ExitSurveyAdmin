using System;

public class CallWebUpdateFailedException : Exception
{
    public CallWebUpdateFailedException() { }

    public CallWebUpdateFailedException(string message)
        : base(message) { }

    public CallWebUpdateFailedException(string message, Exception inner)
        : base(message, inner) { }
}
