using System.Net.Http;
using System;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sieve.Services;
using Sieve.Models;

namespace ExitSurveyAdmin
{
    public class Startup
    {
        public static readonly string HttpClientName = "HttpClient";

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Environment = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add
        // services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();

            services.AddControllersWithViews();

            services.Configure<CallWebServiceOptions>(Configuration.GetSection("CallWebApi"));
            services.AddSingleton<CallWebService>();

            services.Configure<CsvServiceOptions>(Configuration.GetSection("Csv"));
            services.AddSingleton<CsvService>();

            services.Configure<EmailServiceOptions>(Configuration.GetSection("Email"));
            services.AddSingleton<EmailService>();

            services.Configure<EmployeeInfoLookupServiceOptions>(Configuration.GetSection("LdapLookup"));
            services.AddSingleton<EmployeeInfoLookupService>();

            services.AddScoped<EmployeeReconciliationService>();

            services.AddSingleton<LocalFileService>();

            services.AddScoped<LoggingService>();

            services.AddDbContext<ExitSurveyAdminContext>(options =>
            options.UseSqlServer(
                Configuration.GetConnectionString("ExitSurveyAdmin")));

            services.Configure<SieveOptions>(Configuration.GetSection("Sieve"));
            services.AddScoped<SieveProcessor>();
            services.AddScoped<ISieveCustomSortMethods, SieveCustomSortMethods>();

            // TODO: Verify this
            services
                .AddAuthentication(options =>
                    Authentication.SetAuthenticationOptions(options))
                .AddJwtBearer(options =>
                    Authentication.SetJwtBearerOptions(
                        options,
                        Configuration.GetValue<string>("Authentication:Authority")
                    )
                );

            // TODO: Verify this BC Dev Keycloack
            services
                .AddAuthorization(options =>
                    Authentication.SetAuthorizationOptions(
                        options,
                        Configuration.GetValue<string>("Authentication:RoleName")
                    )
                );

            // Add an HttpClient.
            services.AddHttpClient(HttpClientName)
            .ConfigurePrimaryHttpMessageHandler(() =>
            {
                var handler = new HttpClientHandler();
                // Ignore certificate errors ON DEV ONLY.
                if (Environment.IsDevelopment())
                {
                    handler.ServerCertificateCustomValidationCallback +=
                    (httpRequestMessage, cert, cetChain, policyErrors) => true;
                }
                return handler;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure
        // the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change
                // this for production scenarios, see
                // https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            // app.UseAuthentication();
            // app.UseAuthorization();
        }
    }
}
