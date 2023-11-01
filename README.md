[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)]

# ExitSurveyAdmin

The Exit Survey Administration Tool will assist BC Stats in administering the BCPS Exit Survey.

# Development tasks

## Running a development environment

### Prerequisites

1. Ensure the [.NET Core SDK 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) is installed.
2. Ensure you have the .NET EF Core CLI installed: `dotnet tool install dotnet-ef --version 6.0.0`
3. Ensure the [.NET Core HTTPS development certificate is trusted](https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-3.1&tabs=visual-studio#trust-the-aspnet-core-https-development-certificate-on-windows-and-macos).
4. Install [Postgres](https://www.postgresql.org/download/) and create a
   database named `esa`.
5. Check out the code from this repository.

**NB**. To be fully functional, the application should be run in conjunction
with the CallWeb API. The code for the CallWeb API is not publicly available.
Please reach out to the project team for access. However, the project will still
build and run without the CallWeb API.

### Install EF Core dependencies

`dotnet tool install dotnet-ef --version 6.0.0`
`dotnet add package Microsoft.EntityFrameworkCore --version 3.1.4`
`dotnet add package Microsoft.EntityFrameworkCore.Design --version 3.1.4`

### Config + secret settings

The application uses two `appsettings.json` files, one in the `/config`
directory and one in `/secret`. This mirrors how the application gets
deployed to OpenShift. `/config/appsettings.json` contains non-sensitive
configuration for the application, while `/secret/appsettings.json` contains
configuration that should not readily visible.

See also the comments in [Program.cs](Program.cs) about how the files get
resolved when the application is deployed to OpenShift.

To get set up:

5. Copy the contents of `/config/appsettings.config-template.json`
   into a new file, `/config/appsettings.json`, and update the values as
   appropriate.

6. Do the same with `/secret/appsettings.secret-template.json`, copying it into
   `/secret/appsettings.json`.

7. We also need to set up the frontend environment. In the `/ClientApp`
   directory, copy `env.example` into `.env`, and update the values as
   appropriate.

### Run migrations

8. From the root project directory, run `dotnet ef database update`. This will run the migrations and set up your development database.
   ENSURE THAT 
   dotnet add package Microsoft.EntityFrameworkCore --version 3.1.4
   dotnet add package Microsoft.EntityFrameworkCore.design --version 3.1.4

   Note that the database will be seeded automatically when the application is
   started.

### Start the API

9. Open the root code directory in [Visual Studio Code](https://code.visualstudio.com).
   You may be prompted to add required assets and/or resolve dependencies; do
   so.
10. While in Visual Studio Code, press <kbd>CTRL</kbd> + <kbd>F5</kbd> to launch
    the API.
11. Test that the API is running correctly by checking the HealthStatus. If
    the project is running at the default location and port:
    `curl http://localhost:5050/api/HealthStatus/Status`.

### Install frontend dependencies

12. From the `/ClientApp` directory run `yarn install`.

### Start the frontend

13. Still in the `/ClientApp` directory, run `yarn start` to launch the
    front-end. You should see the application open in a new browser.

## Required sample input for development

The following sample documents should be placed in the `/SampleInput` folder, and can be obtained from the project team.

* `PSA-CSV-Sample.csv`
* `CallWeb-Sample.csv`

## Quick database reset

This command will quickly drop the database, delete migrations, create an initial migration, and update the database.

```
dotnet ef database drop --force;rm -rf Migrations/*.cs;dotnet ef migrations add InitialCreate;dotnet ef database update
```

# Copyright and license

Copyright 2019 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at 

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
