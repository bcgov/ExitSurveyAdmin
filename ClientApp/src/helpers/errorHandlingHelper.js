const ERRORS = ***REMOVED***
  EMPLOYEE_NOT_FOUND: ***REMOVED***
    title: 'Employee with this ID not found'
***REMOVED***
***REMOVED***

export const setError = (dispatch, code, errorSource = null) => ***REMOVED***
  const error = ***REMOVED*** code ***REMOVED***
  error.title = ERRORS[code] ? ERRORS[code].title : 'Unknown error'
  dispatch(***REMOVED*** type: 'SET_ERROR', error ***REMOVED***)
***REMOVED***
