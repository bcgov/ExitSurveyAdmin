import 'reflect-metadata'
import ***REMOVED*** createRoot ***REMOVED*** from 'react-dom/client'

import ***REMOVED*** HashRouter ***REMOVED*** from 'react-router'
import ***REMOVED*** routerBase as getRouterBasename ***REMOVED*** from './helpers/envHelper'
import App from './components/App'
import KeycloakService from './components/Login/KeycloakService'

import './components/App.scss'

const rootElement = document.getElementById('root')

KeycloakService.initKeycloak(() => ***REMOVED***
  if (rootElement) ***REMOVED***
    createRoot(rootElement).render(
      <HashRouter basename=***REMOVED***getRouterBasename()***REMOVED***>
        <App />
      </HashRouter>
    )
***REMOVED***
***REMOVED***)
