# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything and restore as distinct layers
COPY . .
RUN dotnet restore && dotnet publish -c Release -o /out

# Stage 2: Build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /opt/app-root/app
COPY --from=build /out .

# Set the entry point to your application
EXPOSE 8080
ENTRYPOINT ["dotnet", "ExitSurveyAdmin.dll"]