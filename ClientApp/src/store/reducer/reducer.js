import { combineReducers } from 'redux'
import { reducer as oidcReducer } from 'redux-oidc'
import errorReducer from './errorReducer'

const reducer = combineReducers({
  oidc: oidcReducer,
  error: errorReducer
})

export default reducer
