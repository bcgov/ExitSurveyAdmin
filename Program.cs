using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace ExitSurveyAdmin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    SeedData.Initialize(services);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(c =>
                {
                    // From https://medium.com/@fbeltrao/automatically-reload-configuration-changes-based-on-kubernetes-config-maps-in-a-net-d956f8c8399a
                    //
                    // Note that reloadOnChange, even if set 'true' here, will
                    // not work out of the box becuase appsettings.json is
                    // actually a symlink on OpenShift, and the timestamp
                    // doesn't change on the symlink even if the underlying file
                    // does.
                    //
                    // In the future, Microsoft might change the way these
                    // symlinks are handled. There are also possible workarounds
                    // which poll the underlying file to see if it has changed.
                    // But these are beyond our needs right now. In the
                    // meantime, to reload, restart the pod.
                    c.AddJsonFile("config/appsettings.json", optional: true, reloadOnChange: false);

                    // Now add a secrets file, too. Secrets won't automatically
                    // reload in OpenShift regardless. A pod restart is
                    // required.
                    c.AddJsonFile("secret/appsettings.json", optional: true, reloadOnChange: false);

                    // Note that these two files will be automatically merged.
                    // If a setting is set in both files, the most-recently
                    // loaded setting will be used (in this case, the setting in
                    // the secret file).
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
