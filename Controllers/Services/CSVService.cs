using System.Globalization;
using System.Text;
using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System.Net.Http;
using Microsoft.VisualBasic.FileIO;
using CsvHelper;

namespace ExitSurveyAdmin.Services
{
    public class CSVService
    {


        // Returns the raw, as-is text of the PSA CSV extract.
        public static Task<string> ReadCSV(string csvPath)
        {
            return FileService.ReadLocalFile(csvPath);
        }

        // EmployeesFromCSV: Given the raw text of the PSA CSV extract (as
        // obtained, for instance, from the GetCSV method), transform it into an
        // array of nicely-formatted Employee JSON objects. Note that these
        // Employees are NOT saved or otherwise processed by default.
        public static async Task<List<Employee>> EmployeesFromCSV(
            Stream csvTextStream, Encoding csvEncoding
        )
        {
            // By default the content will not be read if it is not form or JSON
            // type so we need to use a stream reader to read the request body.
            // CsvReader expects a StreamReader anyways so we will use that.
            using (StreamReader reader = new StreamReader(csvTextStream, csvEncoding))
            using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // Use the ClassMap to map the headers in the CSV to the fields
                // of the Employee model.
                csv.Configuration.TrimOptions = CsvHelper.Configuration.TrimOptions.Trim;
                csv.Configuration.RegisterClassMap<PSACSVMap>();

                var goodRecords = new List<Employee>();
                var badRecords = new List<string>();
                var isRecordBad = false;
                var line = 1;

                csv.Configuration.BadDataFound = context =>
                {
                    isRecordBad = true;
                    badRecords.Add(context.RawRecord);
                    Console.WriteLine("* * *");
                    Console.WriteLine(context.RawRecord);
                    Console.WriteLine("* * *");
                };

                while (await csv.ReadAsync())
                {
                    try
                    {
                        var record = csv.GetRecord<Employee>();
                        if (!isRecordBad)
                        {
                            goodRecords.Add(record);
                        }
                    }
                    catch (Exception e)
                    {
                        var ExceptionText = $"Line {line}: Exception: {e}";
                        badRecords.Add(ExceptionText);
                        Console.WriteLine("* * *");
                        Console.WriteLine(ExceptionText);
                        Console.WriteLine("* * *");
                    }
                    isRecordBad = false;
                    line++;
                }

                // await foreach (Employee e in csv.GetRecordsAsync<Employee>())
                // {
                //     goodRecords.Add(e);
                // }

                return goodRecords;
            }
        }
    }
}
