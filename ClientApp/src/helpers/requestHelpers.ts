import ***REMOVED*** setError ***REMOVED*** from './errorHandlingHelper'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'
import ***REMOVED*** AnyJson ***REMOVED*** from '../types/JsonType'
import ***REMOVED*** apiUrl ***REMOVED*** from './envHelper'
import KeycloakService from '../components/Login/KeycloakService'

export const prefixAPI = (path: string): string => ***REMOVED***
  return `$***REMOVED***apiUrl()***REMOVED***$***REMOVED***path***REMOVED***`
***REMOVED***

const requestWithAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => ***REMOVED***
  const token = KeycloakService.getToken()
  const fetchObject: RequestInit = ***REMOVED***
    method,
    headers: ***REMOVED***
      'Content-Type': 'application/json',
      Authorization: `Bearer $***REMOVED***token***REMOVED***`,
  ***REMOVED***
    credentials: 'same-origin',
    // mode: 'cors'
***REMOVED***
  if (method !== 'get' && body) ***REMOVED***
    fetchObject.body = JSON.stringify(body)
***REMOVED***
  return window.fetch(prefixAPI(url), fetchObject)
***REMOVED***

const requestWithoutAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => ***REMOVED***
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fetchObject: RequestInit = ***REMOVED***
    method,
    headers: ***REMOVED***
      'Content-Type': 'application/json',
  ***REMOVED***
    credentials: 'same-origin',
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
    return null
***REMOVED***
***REMOVED***

export const requestJSONWithoutAuth = async (
  url: string,
  method = 'get',
  body: AnyJson,
  errorCode: string,
  successCallback: (
    responseJSON: FixTypeLater,
    pagination?: FixTypeLater
  ) => void
): Promise<AnyJson> => ***REMOVED***
  const response = await requestWithoutAuthentication(url, method, body)
  let json
  try ***REMOVED***
    json = await response.json()
***REMOVED*** catch (e) ***REMOVED***
    console.error('getJSONWithErrorHandler: Error decoding JSON from response.')
***REMOVED***

  const paginationHeader = response.headers.get('X-Pagination')
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : ***REMOVED******REMOVED***

  console.log(response, response.headers, 'paginationHeader', paginationHeader)

  if (response.ok) ***REMOVED***
    if (successCallback) ***REMOVED***
      successCallback(json, pagination)
  ***REMOVED***
    return json
***REMOVED*** else ***REMOVED***
    const store = ***REMOVED******REMOVED***
    setError((store as FixTypeLater).dispatch, errorCode)
    return null
***REMOVED***
***REMOVED***
