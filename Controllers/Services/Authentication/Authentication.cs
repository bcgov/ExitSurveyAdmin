using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace ExitSurveyAdmin.Services
{
    public class Authentication
    {
        public static void SetAuthenticationOptions(AuthenticationOptions options)
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        public static void SetJwtBearerOptions(
            JwtBearerOptions options, string authority
        )
        {
            options.Authority = authority;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                //BC Dev Keycloak
                ValidAudiences = new string[] {
                    "ExitSurveyAdmin", "account", "realm-management" // TODO: Check on this
                },
                RoleClaimType = "role" // roles in the token for the client.
            };
            options.RequireHttpsMetadata = false; //for test only!
            options.SaveToken = true;

            options.Validate();
        }

        public static void SetAuthorizationOptions(
            AuthorizationOptions options, string roleName
        )
        {
            options.AddPolicy("UserRole", policy =>
                policy.RequireClaim("role", $"[{roleName}]")
            );
        }

        /*                 
        options.Events = new JwtBearerEvents()
        {

            OnAuthenticationFailed = async c => 
            {
                c.NoResult();
                c.Response.StatusCode = 500;
                c.Response.ContentType = "text/plain";
                //await c.Response.StartAsyncyes("Startup Authentication failed:" + c.Exception.ToString());

            },

            OnTokenValidated = async ctx =>
            {
                var token= ctx.SecurityToken;
                //var jwt = (ctx.SecurityToken as JwtSecurityToken)?.ToString();
                // get your JWT token here if you need to decode it e.g on https://jwt.io
                // And you can re-add role claim if it has different name in token compared to what you want to use in your ClaimIdentity:  
                // AddRoleClaims(ctx.Principal);
                // return Task.CompletedTask;

                //// Check if the user has an OID claim(oid = object id = user id)
                //if (!ctx.Principal.HasClaim(c => c.Type == "http://schemas.microsoft.co..."))
                //{
                //    ctx.Fail($"The claim 'oid' is not present in the token.");
                //}

                // ClaimsPrincipal userPrincipal = ctx.Principal;

                ////cu.CreateUser(userPrincipal, services.BuildServiceProvider());

                //var claims = new List<Claim> {new Claim(ClaimTypes.Role, "Admin")};
                //var appIdentity = new ClaimsIdentity(claims);
                //ctx.Principal.AddIdentity(appIdentity);
                //}
            }
        };
         */
    }
}