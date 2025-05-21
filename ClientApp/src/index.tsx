import 'reflect-metadata'
import { createRoot } from 'react-dom/client'

import { HashRouter } from 'react-router'
import { routerBase as getRouterBasename } from './helpers/envHelper'
import { unregister } from './registerServiceWorker'
import App from './components/App'
import KeycloakService from './components/Login/KeycloakService'

import './components/App.scss'

const rootElement = document.getElementById('root')

KeycloakService.initKeycloak(() => {
  if (rootElement) {
    createRoot(rootElement).render(
      <HashRouter basename={getRouterBasename()}>
        <App />
      </HashRouter>
    )
  }
})

// registerServiceWorker()
unregister()
