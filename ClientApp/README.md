# ExitSurveyAdmin Frontend

This project is a React application built and developed using [Vite](https://vitejs.dev/). It was originally bootstrapped with Create React App and later migrated to Vite for faster builds and improved developer experience.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

In the `ClientApp` directory, install dependencies:

```sh
yarn install
```

### Development

To start the development server:

```sh
yarn start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.

### Production Build

To build the app for production:

```sh
yarn build
```

This will bundle the app using Vite and output the static files to the `public` folder.

### Preview Production Build

To preview the production build locally:

```sh
yarn preview
```

## Project Structure

- `src/` — Main source code (components, helpers, types, styles, etc.)
- `public/` — Static assets and the production build output
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration

## Notes
- This project was migrated from Create React App to Vite. Some legacy files (such as `react-app-env.d.ts`) may remain for compatibility.
- For more information on Vite, see the [Vite documentation](https://vitejs.dev/guide/).