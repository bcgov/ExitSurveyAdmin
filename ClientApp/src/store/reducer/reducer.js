import { combineReducers } from 'redux'
import { reducer as oidcReducer } from 'redux-oidc'
import errorReducer from './errorReducer'
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'

// const persistConfig = {
// key: 'ExitSurveyAdmin',
// storage
// }

const reducer = combineReducers({
  oidc: oidcReducer,
  error: errorReducer
})

// export default persistReducer(persistConfig, reducer)
export default reducer
