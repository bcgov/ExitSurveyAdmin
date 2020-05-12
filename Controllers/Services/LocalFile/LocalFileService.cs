using System.IO;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class LocalFileService
    ***REMOVED***
        // Read a local file from the project.
        public static Task<string> ReadLocalFile(string filePath)
        ***REMOVED***
            return File.ReadAllTextAsync(filePath);
      ***REMOVED***
  ***REMOVED***
***REMOVED***