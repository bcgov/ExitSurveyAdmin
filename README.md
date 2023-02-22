[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)]

# ExitSurveyAdmin

The Exit Survey Administration Tool will assist BC Stats in administering the BCPS Exit Survey.

# Development tasks

## Running a development environment

1. Ensure the [.NET Core SDK 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1) is installed.
2. Ensure the [.NET Core HTTPS development certificate is trusted](https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-3.1&tabs=visual-studio#trust-the-aspnet-core-https-development-certificate-on-windows-and-macos).
3. Check out the code from this repository.
4. From the root project directory, run `dotnet ef database update`. This will run the migrations and set up your development database.
5. On the command line / terminal, from the `ClientApp` directory (in the root project directory), run `yarn install`.
6. Open the checked-out code in [Visual Studio Code](https://code.visualstudio.com).
7. Add the required sample documents (see below).
8. Update the connection string to your local MS SQL Server instance in `appsettings.Development.json`, along the following lines:

```
  "ConnectionStrings": ***REMOVED***
    "ExitSurveyAdmin": "Server=127.0.0.1,1433;Database=ExitSurveyAdmin;User Id=sa;Password=Y0urP4ssw0rd"
***REMOVED***
```

8. While in Visual Studio Code, press <kbd>CTRL</kbd> + <kbd>F5</kbd> to launch the project.

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
