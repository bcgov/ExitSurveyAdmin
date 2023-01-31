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
            JwtBearerOptions options,
            string authority,
            string audience,
            string roleClaimType
        )
        {
            options.Authority = authority;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidAudiences = new string[] { audience },
                RoleClaimType = roleClaimType
            };
            options.RequireHttpsMetadata = true;
            options.SaveToken = true;

            options.Validate();
        }

        public static void SetAuthorizationOptions(AuthorizationOptions options, string roleName)
        {
            options.AddPolicy("UserRole", policy => policy.RequireRole(roleName));
        }
    }
}
