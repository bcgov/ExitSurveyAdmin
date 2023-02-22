import 'reflect-metadata'

import { HashRouter } from 'react-router-dom'
import { OidcProvider } from 'redux-oidc'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import { routerBase as getRouterBasename } from './helpers/envHelper'
import { unregister } from './registerServiceWorker'
import App from './components/App'
import store from './store/store'
import userManager from './store/utils/userManager'

import './components/App.scss'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      {/* <PersistGate loading={'Loading...'} persistor={persistor}> */}
      <HashRouter basename={getRouterBasename()}>
        <App />
      </HashRouter>
      {/* </PersistGate> */}
    </OidcProvider>
  </Provider>,
  rootElement
)

// registerServiceWorker()
unregister()
