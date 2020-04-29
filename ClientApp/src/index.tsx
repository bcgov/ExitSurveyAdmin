// import 'bootstrap/dist/css/bootstrap.css'
// import '@bcgov/bootstrap-theme/dist/scss/bootstrap-theme'
import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { unregister } from './registerServiceWorker'
import { OidcProvider } from 'redux-oidc'
import userManager from './store/utils/userManager'
import store from './store/store'

const baseUrl = document
  .getElementsByTagName('base')[0]
  .getAttribute('href') as string
const rootElement = document.getElementById('root')

// const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      {/* <PersistGate loading={'Loading...'} persistor={persistor}> */}
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
      {/* </PersistGate> */}
    </OidcProvider>
  </Provider>,
  rootElement
)

// registerServiceWorker()
unregister()
