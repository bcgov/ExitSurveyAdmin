using System;

public class CallWebCreateFailedException : Exception
{
    public CallWebCreateFailedException() { }

    public CallWebCreateFailedException(string message)
        : base(message) { }

    public CallWebCreateFailedException(string message, Exception inner)
        : base(message, inner) { }
}
