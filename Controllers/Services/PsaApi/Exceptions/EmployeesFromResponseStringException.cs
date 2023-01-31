using System;

public class EmployeesFromResponseStringException : Exception
{
    public EmployeesFromResponseStringException() { }

    public EmployeesFromResponseStringException(string message)
        : base(message) { }

    public EmployeesFromResponseStringException(string message, Exception inner)
        : base(message, inner) { }
}
