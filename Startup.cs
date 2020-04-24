using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ExitSurveyAdmin
***REMOVED***
    public class Startup
    ***REMOVED***
        public IConfiguration Configuration ***REMOVED*** get; ***REMOVED***
        public IWebHostEnvironment Environment ***REMOVED*** get; ***REMOVED***

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        ***REMOVED***
            Environment = env;
            Configuration = configuration;
      ***REMOVED***

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        ***REMOVED***
            services.AddControllersWithViews();

            if (Environment.IsDevelopment())
            ***REMOVED***
                services.AddDbContext<ExitSurveyAdminContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("ExitSurveyAdmin")));
          ***REMOVED***
            else
            ***REMOVED***
                services.AddDbContext<ExitSurveyAdminContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("ExitSurveyAdmin")));
          ***REMOVED***

            services.AddSingleton(Configuration.GetSection("FilePaths").Get<AppConfiguration>());

            // TODO: Verify this
            services
                .AddAuthentication(options => Authentication.SetAuthenticationOptions(options))
                .AddJwtBearer(options => Authentication.SetJwtBearerOptions(options,
                    Configuration.GetValue<string>("Authentication:Authority")));

            // TODO: Verify this BC Dev Keycloack
            services.AddAuthorization(options => Authentication.SetAuthorizationOptions(options,
                Configuration.GetValue<string>("Authentication:RoleName")));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            ***REMOVED***
                configuration.RootPath = "ClientApp/build";
          ***REMOVED***);
      ***REMOVED***

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        ***REMOVED***
            if (env.IsDevelopment())
            ***REMOVED***
                app.UseDeveloperExceptionPage();
          ***REMOVED***
            else
            ***REMOVED***
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
          ***REMOVED***

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            ***REMOVED***
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "***REMOVED***controller***REMOVED***/***REMOVED***action=Index***REMOVED***/***REMOVED***id?***REMOVED***");
          ***REMOVED***);

            app.UseSpa(spa =>
            ***REMOVED***
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                ***REMOVED***
                    spa.UseReactDevelopmentServer(npmScript: "start");
              ***REMOVED***
          ***REMOVED***);

            // app.UseAuthentication();
            // app.UseAuthorization();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
