import 'reflect-metadata'
import './components/App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { unregister } from './registerServiceWorker'
import { OidcProvider } from 'redux-oidc'
import userManager from './store/utils/userManager'
import store from './store/store'
import { routerBase as getRouterBasename } from './helpers/envHelper'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      {/* <PersistGate loading={'Loading...'} persistor={persistor}> */}
      <BrowserRouter basename={getRouterBasename()}>
        <App />
      </BrowserRouter>
      {/* </PersistGate> */}
    </OidcProvider>
  </Provider>,
  rootElement
)

// registerServiceWorker()
unregister()
