import ***REMOVED*** setError ***REMOVED*** from './errorHandlingHelper'
import store from '../store/store'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'
import ***REMOVED*** AnyJson ***REMOVED*** from '../types/JsonType'
import ***REMOVED*** deploymentUrl ***REMOVED*** from './envHelper'

export const prefixAPI = (path: string): string => ***REMOVED***
  // const API_LOCATION = process.env.REACT_APP_API_LOCATION
  return `$***REMOVED***deploymentUrl()***REMOVED***$***REMOVED***path***REMOVED***`
  // return path
***REMOVED***

// const requestWithoutAuthentication = (
//   url: string,
//   method = 'get',
//   body: AnyJson
// ): Promise<Response> => ***REMOVED***
//   const fetchObject: RequestInit = ***REMOVED***
//     method,
//     headers: ***REMOVED***
//       'Content-Type': 'application/json'
//   ***REMOVED***
// ***REMOVED***
//   if (method !== 'get' && body) ***REMOVED***
//     fetchObject.body = JSON.stringify(body)
// ***REMOVED***
//   return window.fetch(prefixAPI(url), fetchObject)
// ***REMOVED***

const requestWithAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => ***REMOVED***
  console.log('-->', store.getState())
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = store.getState()!.oidc!.user!.access_token
  const fetchObject: RequestInit = ***REMOVED***
    method,
    headers: ***REMOVED***
      'Content-Type': 'application/json',
      Authorization: `Bearer $***REMOVED***token***REMOVED***`
  ***REMOVED***
    credentials: 'same-origin' // By default, fetch won't send any cookies to the server
***REMOVED***
  if (method !== 'get' && body) ***REMOVED***
    fetchObject.body = JSON.stringify(body)
***REMOVED***
  return window.fetch(prefixAPI(url), fetchObject)
***REMOVED***

export const requestJSONWithErrorHandler = async (
  url: string,
  method = 'get',
  body: AnyJson,
  errorCode: string,
  successCallback: (
    responseJSON: FixTypeLater,
    pagination?: FixTypeLater
  ) => void
): Promise<AnyJson> => ***REMOVED***
  const response = await requestWithAuthentication(url, method, body) // useToken
  // : await requestWithoutAuthentication(url, method, body)
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
