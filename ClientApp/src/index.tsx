import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'

import ***REMOVED*** HashRouter ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** routerBase as getRouterBasename ***REMOVED*** from './helpers/envHelper'
import ***REMOVED*** unregister ***REMOVED*** from './registerServiceWorker'
import App from './components/App'
import KeycloakService from './components/Login/KeycloakService'

import './components/App.scss'

const rootElement = document.getElementById('root')

KeycloakService.initKeycloak(() =>
  ReactDOM.render(
    <HashRouter basename=***REMOVED***getRouterBasename()***REMOVED***>
      <App />
    </HashRouter>,
    rootElement
  )
)

// registerServiceWorker()
unregister()
