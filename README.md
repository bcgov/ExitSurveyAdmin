[![img](https://img.shields.io/badge/Lifecycle-Stable-97ca00)]

# ExitSurveyAdmin

The Exit Survey Administration Tool will assist BC Stats in administering the BCPS Exit Survey.

# Development tasks

## Running a development environment

### Setup

1. Ensure the [.NET SDK 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) is installed.
3. Ensure the [.NET HTTPS development certificate is trusted](https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-8.0&tabs=visual-studio#trust-the-aspnet-core-https-development-certificate-on-windows-and-macos).
4. Install [Postgres](https://www.postgresql.org/download/) and create a
   database named `esa`.
5. Check out the code from this repository.

**NB**. To be fully functional, the application should be run in conjunction with the CallWeb API. The code for the CallWeb API is not publicly available. Please reach out to the project team for access. However, the project will still build and run without the CallWeb API.

6. Install EF Core dependencies

```
   dotnet tool install dotnet-ef --version 8.0.15
   dotnet add package Microsoft.EntityFrameworkCore --version 8.0.15
   dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.15
```

### Config + secret settings

The application uses two `appsettings.json` files, one in the `/config` directory and one in `/secret`. This mirrors how the application gets deployed to OpenShift. `/config/appsettings.json` contains non-sensitive configuration for the application, while `/secret/appsettings.json` contains configuration that should not readily visible.

See also the comments in [Program.cs](Program.cs) about how the files get resolved when the application is deployed to OpenShift.

To get set up:

7. Copy the contents of `/config/appsettings.config-template.json` into a new file, `/config/appsettings.json`, and update the values as appropriate.

8. Do the same with `/secret/appsettings.secret-template.json`, copying it into
   `/secret/appsettings.json`.

9. We also need to set up the frontend environment. In the `/frontend` directory, copy `/frontend/public/config/__ENV.js.template` to `/frontend/public/config/__ENV.js`, and update the values as appropriate for your local development environment.

### Run migrations

10. From the root project directory, run `dotnet ef database update`. This will run the migrations and set up your development database.

   Note that the database will be seeded automatically when the application is started.

### Start the API

11. Open the root code directory in [Visual Studio Code](https://code.visualstudio.com).
   You may be prompted to add required assets and/or resolve dependencies; do
   so.
12. While in Visual Studio Code, press <kbd>CTRL</kbd> + <kbd>F5</kbd> to launch
    the API.
13. Test that the API is running correctly by checking the HealthStatus. If
    the project is running at the default location and port:
    `curl http://localhost:5050/api/HealthStatus/Status`.

### Install frontend dependencies

14. From the `/frontend` directory run `yarn install`.

### Start the frontend

15. Still in the `/frontend` directory, run `yarn dev` to launch the
    front-end. You should see the application open in a new browser.

## Frontend Modernization (CRA → Vite)

- The frontend was migrated from Create React App (CRA) to Vite for improved performance and developer experience.
- See `frontend/README.md` for updated instructions and migration notes.
- Use `yarn dev`/`yarn build`/`yarn preview` in `/frontend` for frontend development and builds.
- Runtime configuration is loaded from `__ENV.js` (created from `__ENV.js.template` for local development).
- CRA-specific scripts and files are obsolete and can be removed if not needed.

## Deployment

### GitHub Secrets Configuration

For proper deployment with subpath routing, the following GitHub repository secret must be configured:

- **`VITE_APP_PATH`**: The application's deployment path (e.g., `/esa-dev/`, `/esa-staging/`, `/esa/`)

This secret is used during the Docker build process to configure Vite's base path, ensuring that static assets (CSS, JS, images) are loaded from the correct URLs when deployed to a subpath.

**To configure:**
1. Go to GitHub repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_APP_PATH`
4. Value: Your deployment path (must start and end with `/`, e.g., `/your-app-path/`)

**Note:** This is a build-time configuration that gets baked into the static assets. It's separate from the runtime `VITE_APP_PATH` in `__ENV.js`.

---

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
