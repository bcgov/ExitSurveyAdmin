using System;

public class CallWebNoTelkeyException : Exception
{
    public CallWebNoTelkeyException() { }

    public CallWebNoTelkeyException(string message)
        : base(message) { }

    public CallWebNoTelkeyException(string message, Exception inner)
        : base(message, inner) { }
}
