const ERRORS = {
  EMPLOYEE_NOT_FOUND: {
    title: 'Employee with this ID not found'
  }
}

export const setError = (dispatch, code, errorSource = null) => {
  const error = { code }
  error.title = ERRORS[code] ? ERRORS[code].title : 'Unknown error'
  dispatch({ type: 'SET_ERROR', error })
}
