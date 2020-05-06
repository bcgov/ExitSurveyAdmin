import { setError } from './errorHandlingHelper'
import store from '../store/store'
import { FixTypeLater } from '../types/FixTypeLater'
import { AnyJson } from '../types/JsonType'

export const prefixAPI = (path: string): string => {
  // const API_LOCATION = process.env.REACT_APP_API_LOCATION
  // return `${API_LOCATION}${path}`
  return path
}

const requestWithoutAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => {
  // const token = store.getState().token
  const fetchObject: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method !== 'get' && body) {
    fetchObject.body = JSON.stringify(body)
  }
  return window.fetch(prefixAPI(url), fetchObject)
}

const requestWithAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson,
  token: string
): Promise<Response> => {
  // const token = store.getState().token
  const fetchObject: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'same-origin' // By default, fetch won't send any cookies to the server
  }
  if (method !== 'get' && body) {
    fetchObject.body = JSON.stringify(body)
  }
  return window.fetch(prefixAPI(url), fetchObject)
}

export const requestJSONWithErrorHandler = async (
  url: string,
  method = 'get',
  body: AnyJson,
  errorCode: string,
  successCallback: (
    responseJSON: FixTypeLater,
    pagination?: FixTypeLater
  ) => void,
  token?: string
): Promise<AnyJson> => {
  const response = token
    ? await requestWithAuthentication(url, method, body, token)
    : await requestWithoutAuthentication(url, method, body)
  let json
  try {
    json = await response.json()
  } catch (e) {
    console.error('getJSONWithErrorHandler: Error decoding JSON from response.')
  }

  const paginationHeader = response.headers.get('X-Pagination')
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : {}

  if (response.ok) {
    if (successCallback) {
      successCallback(json, pagination)
    }
    return json
  } else {
    const responseObj = {
      status: response.status,
      statusText: response.statusText,
      message: json ? json.msg : undefined
    }
    setError(store.dispatch, errorCode, responseObj)
    return null
  }
}
