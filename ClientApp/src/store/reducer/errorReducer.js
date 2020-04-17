const initialState = {
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ERROR': {
      return Object.assign({}, state, { error: action.error })
    }
    case 'CLEAR_ERROR': {
      return Object.assign({}, state, { error: null })
    }
    default:
      return state
  }
}
