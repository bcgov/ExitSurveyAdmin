using System;

namespace ExitSurveyAdmin.Services
{
    public class CallWebService
    {
        // Determines whether a survey is complete, given an employee ID.
        public static bool IsSurveyComplete(string employeeId)
        {
            // We will need to integrate with the CallWeb service, but for now,
            // just return flat 5% chance that the survey is complete.
            return new Random().NextDouble() <= 0.05;
        }
    }
}
