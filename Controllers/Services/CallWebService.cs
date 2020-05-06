using System;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class CallWebService
    ***REMOVED***
        // Determines whether a survey is complete, given an employee ID.
        public static bool IsSurveyComplete(string employeeId)
        ***REMOVED***
            // We will need to integrate with the CallWeb service, but for now,
            // just return flat 5% chance that the survey is complete.
            return new Random().NextDouble() <= 0.05;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
