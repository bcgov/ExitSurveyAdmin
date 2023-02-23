using System;

public class NullCallWebStatusCodeException : Exception
{
    public NullCallWebStatusCodeException() { }

    public NullCallWebStatusCodeException(string message)
        : base(message) { }

    public NullCallWebStatusCodeException(string message, Exception inner)
        : base(message, inner) { }
}
