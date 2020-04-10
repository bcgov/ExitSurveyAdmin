import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import {
  routerMiddleware,
  routerReducer,
  syncHistoryWithStore
} from 'connected-react-router'
import { createUserManager, loadUser } from 'redux-oidc'
import reducer from './reducer'
import userManager from './utils/userManager'

// create the middleware with the userManager
// const oidcMiddleware = createOidcMiddleware(userManager);

const loggerMiddleware = store => next => action => {
  console.log('Action type:', action.type)
  console.log('Action payload:', action.payload)
  console.log('State before:', store.getState())
  next(action)
  console.log('State after:', store.getState())
}

const initialState = {}

const createStoreWithMiddleware = compose(
  applyMiddleware(loggerMiddleware, routerMiddleware(browserHistory))
)(createStore)

const store = createStoreWithMiddleware(reducer, initialState)
loadUser(store, userManager)

export default store
