using CsvHelper;
using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class CsvService
    {
        private string PsaCsvFilePath;

        public CsvService(IOptions<CsvServiceOptions> options)
        {
            PsaCsvFilePath = options.Value.PsaCsvFilePath;
        }

        // Returns the raw, as-is text of the PSA CSV extract.
        public Task<string> ReadCsv()
        {
            return ReadCsv(PsaCsvFilePath);
        }

        public Task<string> ReadCsv(string csvPath)
        {
            return LocalFileService.ReadLocalFile(csvPath);
        }

        // EmployeesFromCsv: Given the raw text of the PSA CSV extract (as
        // obtained, for instance, from the GetCsv method), transform it into an
        // array of nicely-formatted Employee JSON objects. Note that these
        // Employees are NOT saved or otherwise processed by default.
        public async Task<Tuple<List<Employee>, List<string>>> EmployeesFromCsv(
            Stream csvTextStream, Encoding csvEncoding
        )
        {
            // By default the content will not be read if it is not form or JSON
            // type so we need to use a stream reader to read the request body.
            // CsvReader expects a StreamReader anyways so we will use that.
            using (StreamReader reader = new StreamReader(csvTextStream, csvEncoding))
            using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // Use the ClassMap to map the headers in the Csv to the fields
                // of the Employee model.
                // TODO: Note there is a bug with CsvHelper when trimming fields
                // on an async read, hence the line commented out below. Until
                // this issue is fixed in a future release, we have had to add a
                // TrimAllStrings() extension, which is called below.
                // https://github.com/JoshClose/CsvHelper/issues/1400
                csv.Configuration.TrimOptions = CsvHelper.Configuration
                                                   .TrimOptions.InsideQuotes;
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
                {
                    isRecordBad = true;
                    badRecords.Add(context.RawRecord);
                };

                while (csv.Read())
                {
                    try
                    {
                        var record = csv.GetRecord<Employee>();
                        if (!isRecordBad)
                        {
                            // TODO: Remove this line (and possibly the whole
                            // implementation) if the bug with CsvHelper
                            // TrimOptions is resolved.
                            record.TrimAllStrings();
                            goodRecords.Add(record);
                        }
                    }
                    catch (Exception e)
                    {
                        var ExceptionText = $"Line {line}: Exception: {e}";
                        badRecords.Add(ExceptionText);
                    }
                    isRecordBad = false;
                    line++;
                }

                return Tuple.Create(goodRecords, badRecords);
            }
        }
    }
}
