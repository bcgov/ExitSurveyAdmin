using System;

public class ResponseAsStringException : Exception
{
    public ResponseAsStringException() { }

    public ResponseAsStringException(string message)
        : base(message) { }

    public ResponseAsStringException(string message, Exception inner)
        : base(message, inner) { }
}
