import { applyMiddleware, compose, createStore } from 'redux'
import createOidcMiddleware, { loadUser } from 'redux-oidc'
import reducer from './reducer/reducer'
import userManager from './utils/userManager'

// create the middleware with the userManager
const oidcMiddleware = createOidcMiddleware(userManager)

const loggerMiddleware = store => next => action => {
  // console.log('Action type:', action.type)
  // console.log('Action payload:', action.payload)
  // console.log('State before:', store.getState())
  next(action)
  // console.log('State after:', store.getState())
  // console.log('---')
}

const initialState = {}

const createStoreWithMiddleware = compose(
  applyMiddleware(oidcMiddleware, loggerMiddleware)
)(createStore)

const store = createStoreWithMiddleware(reducer, initialState)
loadUser(store, userManager)

export default store
