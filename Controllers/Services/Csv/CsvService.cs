using CsvHelper;
using ExitSurveyAdmin.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.CsvService
***REMOVED***
    public class CsvService
    ***REMOVED***
        private LoggingService logger;

        public CsvService(LoggingService logger)
        ***REMOVED***
            this.logger = logger;
      ***REMOVED***

        // EmployeesFromCsv: Given the raw text of the PSA CSV extract (as
        // obtained, for instance, from the GetCsv method), transform it into an
        // array of nicely-formatted Employee JSON objects. Note that these
        // Employees are NOT saved or otherwise processed by default.
        public EmployeeTaskResult EmployeesFromCsv(Stream csvTextStream, Encoding csvEncoding)
        ***REMOVED***
            // By default the content will not be read if it is not form or JSON
            // type so we need to use a stream reader to read the request body.
            // CsvReader expects a StreamReader anyways so we will use that.
            using (StreamReader reader = new StreamReader(csvTextStream, csvEncoding))
            using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            ***REMOVED***
                // Use the ClassMap to map the headers in the Csv to the fields
                // of the Employee model.
                // TODO: Note there is a bug with CsvHelper when trimming fields
                // on an async read, hence the line commented out below. Until
                // this issue is fixed in a future release, we have had to add a
                // TrimAllStrings() extension, which is called below.
                // https://github.com/JoshClose/CsvHelper/issues/1400
                csv.Configuration.TrimOptions = CsvHelper.Configuration.TrimOptions.InsideQuotes;
                // csv.Configuration.TypeConverterCache
                //     .RemoveConverter<DateTime>();
                // csv.Configuration.TypeConverterCache
                //     .AddConverter<DateTime>(new CustomDateTimeConverter());
                csv.Configuration.RegisterClassMap<PsaCsvMap>();

                var goodRecords = new List<Employee>();
                var badRecords = new List<string>();

                var isRecordBad = false;
                var line = 1;

                csv.Configuration.BadDataFound = context =>
                ***REMOVED***
                    isRecordBad = true;
                    badRecords.Add(context.RawRecord);
              ***REMOVED***;

                while (csv.Read())
                ***REMOVED***
                    try
                    ***REMOVED***
                        var record = csv.GetRecord<Employee>();
                        if (!isRecordBad)
                        ***REMOVED***
                            // TODO: Remove this line (and possibly the whole
                            // implementation) if the bug with CsvHelper
                            // TrimOptions is resolved.
                            record.TrimAllStrings();
                            goodRecords.Add(record);
                      ***REMOVED***
                  ***REMOVED***
                    catch (Exception e)
                    ***REMOVED***
                        var ExceptionText = $"Line ***REMOVED***line***REMOVED***: Exception: ***REMOVED***e***REMOVED***";
                        badRecords.Add(ExceptionText);
                  ***REMOVED***
                    isRecordBad = false;
                    line++;
              ***REMOVED***

                return new EmployeeTaskResult(
                    TaskEnum.ReadCsv,
                    goodRecords.Count + badRecords.Count,
                    0,
                    goodRecords,
                    badRecords
                );
          ***REMOVED***
      ***REMOVED***

        public async Task<EmployeeTaskResult> ProcessCsvAndLog(
            Microsoft.AspNetCore.Http.HttpRequest request
        )
        ***REMOVED***
            var readResult = EmployeesFromCsv(request.Body, Encoding.UTF8);

            var newLine = System.Environment.NewLine;

            var message =
                $"From a CSV with ***REMOVED***readResult.CandidateCount***REMOVED*** rows, "
                + $"successfully read ***REMOVED***readResult.SucceededCount***REMOVED*** rows. ";

            if (!readResult.HasExceptions)
            ***REMOVED***
                // No exceptions. Log a success.
                await logger.LogSuccess(TaskEnum.ReadCsv, message);
          ***REMOVED***
            else
            ***REMOVED***
                message +=
                    $"There were ***REMOVED***readResult.ExceptionCount***REMOVED*** bad rows: "
                    + $"Exceptions: ***REMOVED***string.Join(newLine, readResult.Exceptions)***REMOVED*** ";
                await logger.LogWarning(TaskEnum.ReadCsv, message);
          ***REMOVED***

            return readResult;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
