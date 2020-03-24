using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace ExitSurveyAdmin
***REMOVED***
    public class Program
    ***REMOVED***
        public static void Main(string[] args)
        ***REMOVED***
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            ***REMOVED***
                var services = scope.ServiceProvider;

                try
                ***REMOVED***
                    SeedData.Initialize(services);
              ***REMOVED***
                catch (Exception ex)
                ***REMOVED***
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
              ***REMOVED***
          ***REMOVED***

            host.Run();
      ***REMOVED***

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            ***REMOVED***
                webBuilder.UseStartup<Startup>();
          ***REMOVED***);
  ***REMOVED***
***REMOVED***
