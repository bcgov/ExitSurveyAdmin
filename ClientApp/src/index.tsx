import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { OidcProvider } from 'redux-oidc'
import userManager from './utils/userManager'

const baseUrl = document
  .getElementsByTagName('base')[0]
  .getAttribute('href') as string
const rootElement = document.getElementById('root')

const initialState = {
  token: null
}

const persistConfig = {
  key: 'ExitSurveyAdmin',
  storage
}

const reducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case 'AUTH_SUCCESS': {
      const { token } = action
      console.log('AUTH_SUCCESS token', token)
      return Object.assign({}, state, {
        token
      })
    }
    case 'LOGOUT':
      return Object.assign({}, initialState)
    default:
      return state
  }
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer)

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <PersistGate loading={'Loading...'} persistor={persistor}>
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </OidcProvider>
  </Provider>,
  rootElement
)

registerServiceWorker()
