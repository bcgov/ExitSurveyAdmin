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
        public Tuple<List<Employee>, List<string>> EmployeesFromCsv(
            Stream csvTextStream,
            Encoding csvEncoding
        )
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

                return Tuple.Create(goodRecords, badRecords);
          ***REMOVED***
      ***REMOVED***

        public async Task<List<Employee>> ProcessCsv(
            Microsoft.AspNetCore.Http.HttpRequest request,
            EmployeeReconciliationService employeeReconciler,
            LoggingService logger
        )
        ***REMOVED***
            var csvServiceTuple = EmployeesFromCsv(request.Body, Encoding.UTF8);
            var goodRecords = csvServiceTuple.Item1;
            var badRecords = csvServiceTuple.Item2;
            var totalRecordCount = goodRecords.Count + badRecords.Count;

            // Reconcile the employees with the database.
            var reconcilerTuple = await employeeReconciler.ReconcileEmployees(goodRecords);
            var goodEmployees = reconcilerTuple.Item1;
            var badEmployees = reconcilerTuple.Item2;
            var totalEmployeeCount = goodEmployees.Count + badEmployees.Count;

            if (goodRecords.Count == totalRecordCount && goodEmployees.Count == totalRecordCount)
            ***REMOVED***
                await logger.LogSuccess(
                    TaskEnum.ReconcileCsv,
                    $"From a CSV with ***REMOVED***totalRecordCount***REMOVED*** rows, "
                        + $"reconciled ***REMOVED***totalRecordCount***REMOVED*** employees. "
                );
          ***REMOVED***
            else
            ***REMOVED***
                var newLine = System.Environment.NewLine;

                var message =
                    $"From a CSV with ***REMOVED***totalRecordCount***REMOVED*** rows, "
                    + $"successfully read ***REMOVED***goodRecords.Count***REMOVED*** rows "
                    + $"and reconciled ***REMOVED***goodEmployees.Count***REMOVED*** employees. ";

                if (goodRecords.Count != totalRecordCount)
                ***REMOVED***
                    message +=
                        $"There were ***REMOVED***badRecords.Count***REMOVED*** bad rows: "
                        + $"Exceptions: ***REMOVED***string.Join(newLine, badRecords)***REMOVED*** ";
              ***REMOVED***
                if (goodEmployees.Count != goodRecords.Count)
                ***REMOVED***
                    message +=
                        $"There were ***REMOVED***badEmployees.Count***REMOVED*** employees with errors: "
                        + $"Exceptions: ***REMOVED***string.Join(newLine, badEmployees)***REMOVED*** ";
              ***REMOVED***
                await logger.LogWarning(TaskEnum.ReconcileCsv, message);
          ***REMOVED***

            return goodEmployees;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
