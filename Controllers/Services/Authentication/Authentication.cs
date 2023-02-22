using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class Authentication
    ***REMOVED***
        public static void SetAuthenticationOptions(AuthenticationOptions options)
        ***REMOVED***
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      ***REMOVED***

        public static void SetJwtBearerOptions(
            JwtBearerOptions options,
            string authority,
            string audience,
            string roleClaimType
        )
        ***REMOVED***
            options.Authority = authority;
            options.TokenValidationParameters = new TokenValidationParameters
            ***REMOVED***
                ValidAudiences = new string[] ***REMOVED*** audience ***REMOVED***,
                RoleClaimType = roleClaimType
          ***REMOVED***;
            options.RequireHttpsMetadata = true;
            options.SaveToken = true;

            options.Validate();
      ***REMOVED***

        public static void SetAuthorizationOptions(AuthorizationOptions options, string roleName)
        ***REMOVED***
            options.AddPolicy("UserRole", policy => policy.RequireRole(roleName));
      ***REMOVED***
  ***REMOVED***
***REMOVED***
