using System;
using System.Linq;
using System.IO;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class TelkeyService
    ***REMOVED***
        private static readonly int AddFactor =
            AppConfiguration.MyAppConfiguration.TelkeyAddFactor;
        private static readonly int MultiplicationFactor =
            AppConfiguration.MyAppConfiguration.TelkeyMultiplicationFactor;
        private static readonly int MonthStringLength = 2;
        private static readonly int ExitCountStringLength = 2;
        private static readonly int TelkeyMinimumLength =
            MonthStringLength + ExitCountStringLength + $"***REMOVED***AddFactor***REMOVED***".Length;

        private static int Encode(int employeeIdAsInt)
        ***REMOVED***
            return employeeIdAsInt * MultiplicationFactor + AddFactor;
      ***REMOVED***

        private static int Decode(int encodedEmployeeIdAsInt)
        ***REMOVED***
            return (encodedEmployeeIdAsInt - AddFactor) / MultiplicationFactor;
      ***REMOVED***

        // The telkey encoding function. Adapted directly from the previous
        // codebase.
        public static string GenerateTelkey(ExitSurveyAdmin.Models.Employee e)
        ***REMOVED***
            if (e.EffectiveDate == null)
            ***REMOVED***
                throw new InvalidOperationException(
                    "Can't generate telkey. EffectiveDate is null."
                );
          ***REMOVED***
            if (String.IsNullOrWhiteSpace(e.ExitCount))
            ***REMOVED***
                throw new InvalidOperationException(
                    "Can't generate telkey. ExitCount is null/empty."
                );
          ***REMOVED***
            if (String.IsNullOrWhiteSpace(e.GovernmentEmployeeId))
            ***REMOVED***
                throw new InvalidOperationException(
                    "Can't generate telkey. GovernmentEmployeeId is null/empty."
                );
          ***REMOVED***

            // Get the two-digit (zero-padded) month.
            string effectiveDateMonth = e.EffectiveDate.ToString("MM");

            // Get the exit count + 10.
            int exitCountAsInt = System.Convert.ToInt32(e.ExitCount);
            int paddedExitCount = exitCountAsInt + 10;

            // Manipulate the employee ID, and reverse.
            int employeeId = System.Convert.ToInt32(e.GovernmentEmployeeId);
            int encodedEmployeeId = Encode(employeeId);
            string reversedEncodedEmployeeId = new string(
                encodedEmployeeId.ToString().Reverse().ToArray()
            );

            return $"***REMOVED***paddedExitCount***REMOVED***" +
                   $"***REMOVED***reversedEncodedEmployeeId***REMOVED***" +
                   $"***REMOVED***effectiveDateMonth***REMOVED***";
      ***REMOVED***


        // The telkey decoding function. Adapted directly from the previous
        // codebase. We want to get the employee ID from the telkey.
        public static string EmployeeIdFromTelkey(string telkey)
        ***REMOVED***
            string trimmedTelkey = telkey.Trim();

            // A proper telkey should be the length of at least
            if (trimmedTelkey.Length < TelkeyMinimumLength)
            ***REMOVED***
                throw new ArgumentOutOfRangeException(
                    "Can't decode telkey. " +
                    $"Its length must be at least ***REMOVED***TelkeyMinimumLength***REMOVED***."
                );
          ***REMOVED***

            // The first two characters of the telkey are the padded exit
            // count. The last two characters of the telkey are the month. So,
            // strip those out to get the portion of the telkey that is the
            // encoded employee ID.
            string encodedEmployeeIdStr = trimmedTelkey.Substring(
                    ExitCountStringLength,
                    trimmedTelkey.Length - MonthStringLength
                );

            // Now reverse the above process.
            string unreversedEncodedEmployeeId = new string(
                encodedEmployeeIdStr.ToString().Reverse().ToArray()
            );
            int encodedEmployeeId = System.Convert.ToInt32(unreversedEncodedEmployeeId);
            int employeeId = Decode(encodedEmployeeId);

            // Now to a string.
            return $"***REMOVED***employeeId***REMOVED***";
      ***REMOVED***
  ***REMOVED***
***REMOVED***