import ***REMOVED*** setError ***REMOVED*** from './errorHandlingHelper'
import store from '../store/store'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'
import ***REMOVED*** AnyJson ***REMOVED*** from '../types/JsonType'
import ***REMOVED*** deploymentUrl ***REMOVED*** from './envHelper'

export const prefixAPI = (path: string): string => ***REMOVED***
  return `$***REMOVED***deploymentUrl()***REMOVED***$***REMOVED***path***REMOVED***`
***REMOVED***

const requestWithAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => ***REMOVED***
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = store.getState()!.oidc!.user!.access_token
  // console.log(token)
  const fetchObject: RequestInit = ***REMOVED***
    method,
    headers: ***REMOVED***
      'Content-Type': 'application/json',
      Authorization: `Bearer $***REMOVED***token***REMOVED***`
  ***REMOVED***
    credentials: 'same-origin'
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
    setError(store.dispatch, errorCode)
    return null
***REMOVED***
***REMOVED***
