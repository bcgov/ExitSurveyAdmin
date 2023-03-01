import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter } from 'react-router-dom'
import { routerBase as getRouterBasename } from './helpers/envHelper'
import { unregister } from './registerServiceWorker'
import App from './components/App'
import KeycloakService from './components/Login/KeycloakService'

import './components/App.scss'

const rootElement = document.getElementById('root')

KeycloakService.initKeycloak(() =>
  ReactDOM.render(
    <HashRouter basename={getRouterBasename()}>
      <App />
    </HashRouter>,
    rootElement
  )
)

// registerServiceWorker()
unregister()
