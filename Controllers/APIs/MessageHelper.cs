using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using System;
using System.Threading.Tasks;

namespace ExitSurveyAdmin
***REMOVED***
    public class MessageHelper
    ***REMOVED***
        public static string EmailSubjectFromTaskAndOutcome(
            TaskEnum task,
            TaskOutcomeEnum taskOutcome
        )
        ***REMOVED***
            return $"Task result: ***REMOVED***task.Code***REMOVED***: ***REMOVED***taskOutcome.Code***REMOVED***";
      ***REMOVED***

        public static string MessageFromException(Exception exception)
        ***REMOVED***
            var message =
                $"Error: ***REMOVED***exception.Message***REMOVED*** \r\n" + $"Stacktrace:\r\n ***REMOVED***exception.StackTrace***REMOVED***";

            return message;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
