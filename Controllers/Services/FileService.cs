using System.IO;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services
{
    public class FileService
    {
        // Read a local file from the project.
        public static Task<string> ReadLocalFile(string filePath)
        {
            return File.ReadAllTextAsync(filePath);
        }
    }
}