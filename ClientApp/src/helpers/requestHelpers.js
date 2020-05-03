import ***REMOVED*** setError ***REMOVED*** from './errorHandlingHelper'
import store from '../store/store'

export const prefixAPI = path => ***REMOVED***
  // const API_LOCATION = process.env.REACT_APP_API_LOCATION
  // return `$***REMOVED***API_LOCATION***REMOVED***$***REMOVED***path***REMOVED***`
  return path
***REMOVED***

const requestWithAuthentication = (url, method = 'get', body) => ***REMOVED***
  // const token = store.getState().token
  const fetchObject = ***REMOVED***
    method
    // headers: ***REMOVED***
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer $***REMOVED***token***REMOVED***`
    // ***REMOVED***,
    // credentials: 'same-origin' // By default, fetch won't send any cookies to the server
***REMOVED***
  if (method !== 'get' && body) ***REMOVED***
    fetchObject.body = JSON.stringify(body)
***REMOVED***
  return window.fetch(prefixAPI(url), fetchObject)
***REMOVED***

export const requestJSONWithErrorHandler = async (
  url,
  method = 'get',
  body,
  errorCode,
  successCallback
) => ***REMOVED***
  const response = await requestWithAuthentication(url, method, body)
  let json
  try ***REMOVED***
    json = await response.json()
***REMOVED*** catch (e) ***REMOVED***
    console.error('getJSONWithErrorHandler: Error decoding JSON from response.')
***REMOVED***

  const paginationHeader = response.headers.get('X-Pagination')
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : ***REMOVED******REMOVED***

  if (response.ok) ***REMOVED***
    if (successCallback) ***REMOVED***
      successCallback(json, pagination)
  ***REMOVED***
    return json
***REMOVED*** else ***REMOVED***
    const responseObj = ***REMOVED***
      status: response.status,
      statusText: response.statusText,
      message: json ? json.msg : undefined
  ***REMOVED***
    setError(store.dispatch, errorCode, responseObj)
    return null
***REMOVED***
***REMOVED***
