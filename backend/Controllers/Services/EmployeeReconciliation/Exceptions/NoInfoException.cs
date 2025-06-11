using System;

public class NoInfoException : Exception
{
    public NoInfoException() { }

    public NoInfoException(string message)
        : base(message) { }

    public NoInfoException(string message, Exception inner)
        : base(message, inner) { }
}
