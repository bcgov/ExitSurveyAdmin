using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CallWeb;
using ExitSurveyAdmin.Services.CsvService;
using ExitSurveyAdmin.Services.PsaApi;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sieve.Models;
using Sieve.Services;
using System.Net.Http;

namespace ExitSurveyAdmin
***REMOVED***
    public class Startup
    ***REMOVED***
        public static readonly string HttpClientName = "HttpClient";

        public IConfiguration Configuration ***REMOVED*** get; ***REMOVED***
        public IWebHostEnvironment Environment ***REMOVED*** get; ***REMOVED***

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        ***REMOVED***
            Environment = env;
            Configuration = configuration;
      ***REMOVED***

        // This method gets called by the runtime. Use this method to add
        // services to the container.
        public void ConfigureServices(IServiceCollection services)
        ***REMOVED***
            // services.AddHttpClient();

            // CORS configuration. Note we have to manually list all the methods
            // allowed: options.AllowAnyMethod() does NOT include "PATCH".
            // We have to include both `PATCH` and `patch` because Safari and
            // Firefox are, strangely, treating the WithMethods declaration in
            // a case-sensitive manner.
            services.AddCors(options =>
            ***REMOVED***
                options.AddPolicy(
                    "CorsPolicy",
                    builder =>
                        builder
                            .WithMethods(
                                "GET",
                                "PUT",
                                "PATCH",
                                "POST",
                                "DELETE",
                                "OPTIONS",
                                "patch"
                            )
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .WithExposedHeaders("X-Pagination")
                );
          ***REMOVED***);

            // ESA controllers.
            services.AddControllers();

            services.Configure<CallWebServiceOptions>(Configuration.GetSection("CallWebApi"));
            services.AddScoped<CallWebService>();

            // Service to consume the PSA API.
            services.Configure<PsaApiServiceOptions>(Configuration.GetSection("PsaApi"));
            services.AddScoped<PsaApiService>();

            // CSV reader.
            services.AddScoped<CsvService>();

            // LDAP employee information lookup.
            services.Configure<EmployeeInfoLookupServiceOptions>(
                Configuration.GetSection("LdapLookup")
            );
            services.AddScoped<EmployeeInfoLookupService>();

            // Employee reconciler: update Employee statuses with CallWeb.
            services.AddScoped<EmployeeCreationService>();
            services.AddScoped<EmployeeUpdateService>();
            services.AddScoped<EmployeeReconciliationService>();
            services.AddScoped<EmployeeRefreshService>();
            services.AddScoped<EmployeeNotExitingService>();

            // Email service.
            services.Configure<EmailServiceOptions>(Configuration.GetSection("Email"));
            services.AddScoped<EmailService>();

            // Logging to TaskLogEntries.
            services.AddScoped<LoggingService>();

            // Postgres SQL connector.
            services.AddDbContext<ExitSurveyAdminContext>(
                options => options.UseNpgsql(Configuration.GetConnectionString("ExitSurveyAdmin"))
            );

            // Configure Kestrel, which handles the API requests.
            services.Configure<KestrelServerOptions>(options =>
            ***REMOVED***
                options.AllowSynchronousIO = true;
          ***REMOVED***);

            // Configure Sieve, which allows pagination, sorting, filtering of
            // results.
            services.Configure<SieveOptions>(Configuration.GetSection("Sieve"));
            services.AddScoped<ISieveCustomSortMethods, SieveCustomSortMethods>();
            services.AddScoped<ISieveCustomFilterMethods, SieveCustomFilterMethods>();
            services.AddScoped<SieveProcessor>();

            // Configure authentication.
            services
                .AddAuthentication(options => Authentication.SetAuthenticationOptions(options))
                .AddJwtBearer(
                    options =>
                        Authentication.SetJwtBearerOptions(
                            options,
                            Configuration.GetValue<string>("Authentication:Authority"),
                            Configuration.GetValue<string>("Authentication:Audience"),
                            Configuration.GetValue<string>("Authentication:RoleClaimType")
                        )
                );

            // Configure authorization.
            services.AddAuthorization(
                options =>
                    Authentication.SetAuthorizationOptions(
                        options,
                        Configuration.GetValue<string>("Authentication:RoleName")
                    )
            );

            // HTTP client for making requests to the CallWeb API.
            services
                .AddHttpClient(HttpClientName)
                .ConfigurePrimaryHttpMessageHandler(() =>
                ***REMOVED***
                    var handler = new HttpClientHandler();
                    // Ignore certificate errors ON DEV ONLY.
                    if (Environment.IsDevelopment())
                    ***REMOVED***
                        handler.ServerCertificateCustomValidationCallback += (
                            httpRequestMessage,
                            cert,
                            cetChain,
                            policyErrors
                        ) => true;
                  ***REMOVED***

                    return handler;
              ***REMOVED***);
      ***REMOVED***

        // This method gets called by the runtime. Use this method to configure
        // the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        ***REMOVED***
            if (env.IsDevelopment())
            ***REMOVED***
                app.UseDeveloperExceptionPage();
          ***REMOVED***
            else
            ***REMOVED***
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change
                // this for production scenarios, see
                // https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
          ***REMOVED***

            // The following Use____ calls should be kept in this order.
            // app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            // Hook up controllers.
            app.UseEndpoints(endpoints =>
            ***REMOVED***
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "***REMOVED***controller***REMOVED***/***REMOVED***action=Index***REMOVED***/***REMOVED***id?***REMOVED***"
                );
          ***REMOVED***);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
