# ExitSurveyAdmin Frontend

This project is a React application built and developed using [Vite](https://vitejs.dev/). It was originally bootstrapped with Create React App and later migrated to Vite for faster builds and improved developer experience.

## Migration to Vite

This project was migrated from Create React App (CRA) to [Vite](https://vitejs.dev/) for faster builds and improved developer experience. The migration included:
- Replacing CRA scripts and configuration with Vite equivalents
- Updating TypeScript and project structure for Vite compatibility
- Upgrading React, React Router, and other dependencies to their latest versions
- Refactoring code for compatibility with updated libraries and Vite conventions
- Cleaning up obsolete CRA-specific files and documentation

### Key Changes
- **Scripts:** Use `yarn dev`, `yarn build`, and `yarn preview` for development, build, and preview respectively.
- **Configuration:** Runtime configuration is loaded from `__ENV.js` (production) or created from `__ENV.js.template` (local development). No longer uses `.env` files or build-time environment variables.
- **Static Assets:** Place static files in the `public/` directory. Reference them with root-relative paths (e.g., `/logo.png`).
- **Service Worker:** If you need a service worker, use the [Vite PWA plugin](https://vite-pwa-org.netlify.app/) or set up manually. The old CRA service worker is no longer used.
- **Testing:** If you used Jest, consider migrating to [Vitest](https://vitest.dev/) for better Vite integration.
- **Obsolete Files:** CRA-specific files like `react-app-env.d.ts` and `registerServiceWorker.js` are no longer needed unless you have custom logic. Remove them if not required.

For more details, see the migration plan in `frontend-migration-plan.md`.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

In the `frontend` directory, install dependencies:

```sh
yarn install
```

### Configuration

For local development, create the runtime configuration file:

```sh
# Copy the template and update values for your local environment
cp public/config/__ENV.js.template public/config/__ENV.js
```

Edit `public/config/__ENV.js` with your local development settings (API endpoints, auth configuration, etc.).

### Development

To start the development server:

```sh
yarn dev
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.

### Production Build

To build the app for production:

```sh
yarn build
```

This will bundle the app using Vite and output the static files to the `build` folder.

### Preview Production Build

To preview the production build locally:

```sh
yarn preview
```

## Project Structure

- `src/` — Main source code (components, helpers, types, styles, etc.)
- `public/` — Static assets and the production build output
- `public/config/` — Runtime configuration files (`__ENV.js` for runtime config, `__ENV.js.template` for local development template)
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration

## Configuration

This application uses runtime configuration instead of build-time environment variables:

- **Local Development:** Create `public/config/__ENV.js` from the template file
- **Production:** Configuration is provided by OpenShift ConfigMap as `__ENV.js`
- **Variables:** All configuration uses `VITE_*` prefixed variables (e.g., `VITE_API_DOMAIN`, `VITE_AUTH_URL`)

This approach allows the same build artifact to be deployed across different environments with different configurations.

## Notes
- This project was migrated from Create React App to Vite. Some legacy files (such as `react-app-env.d.ts`) may remain for compatibility.
- For more information on Vite, see the [Vite documentation](https://vitejs.dev/guide/).