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
            JwtBearerOptions options, string authority, string audience
        )
        ***REMOVED***
            options.Authority = authority;
            options.TokenValidationParameters = new TokenValidationParameters
            ***REMOVED***
                //BC Dev Keycloack
                ValidAudiences = new string[] ***REMOVED***
                    audience, "account", "realm-management"
              ***REMOVED***
                RoleClaimType = "user_roles" // roles in the token for the client.
          ***REMOVED***;
            options.RequireHttpsMetadata = false; //for test only!
            options.SaveToken = true;

            options.Validate();
      ***REMOVED***

        public static void SetAuthorizationOptions(
            AuthorizationOptions options, string roleName
        )
        ***REMOVED***
            options.AddPolicy("UserRole", policy =>
                policy.RequireClaim("user_roles", $"[***REMOVED***roleName***REMOVED***]")
            );
      ***REMOVED***

        /*                 
        options.Events = new JwtBearerEvents()
        ***REMOVED***

            OnAuthenticationFailed = async c => 
            ***REMOVED***
                c.NoResult();
                c.Response.StatusCode = 500;
                c.Response.ContentType = "text/plain";
                //await c.Response.StartAsyncyes("Startup Authentication failed:" + c.Exception.ToString());

          ***REMOVED***

            OnTokenValidated = async ctx =>
            ***REMOVED***
                var token= ctx.SecurityToken;
                //var jwt = (ctx.SecurityToken as JwtSecurityToken)?.ToString();
                // get your JWT token here if you need to decode it e.g on https://jwt.io
                // And you can re-add role claim if it has different name in token compared to what you want to use in your ClaimIdentity:  
                // AddRoleClaims(ctx.Principal);
                // return Task.CompletedTask;

                //// Check if the user has an OID claim(oid = object id = user id)
                //if (!ctx.Principal.HasClaim(c => c.Type == "http://schemas.microsoft.co..."))
                //***REMOVED***
                //    ctx.Fail($"The claim 'oid' is not present in the token.");
                //***REMOVED***

                // ClaimsPrincipal userPrincipal = ctx.Principal;

                ////cu.CreateUser(userPrincipal, services.BuildServiceProvider());

                //var claims = new List<Claim> ***REMOVED***new Claim(ClaimTypes.Role, "Admin")***REMOVED***;
                //var appIdentity = new ClaimsIdentity(claims);
                //ctx.Principal.AddIdentity(appIdentity);
                //***REMOVED***
          ***REMOVED***
      ***REMOVED***;
         */
  ***REMOVED***
***REMOVED***