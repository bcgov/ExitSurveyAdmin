import { setError } from './errorHandlingHelper'
import { FixTypeLater } from '../types/FixTypeLater'
import { AnyJson } from '../types/JsonType'
import { apiUrl } from './envHelper'
import KeycloakService from '../components/Login/KeycloakService'

export const prefixAPI = (path: string): string => {
  return `${apiUrl()}${path}`
}

const requestWithAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => {
  const token = KeycloakService.getToken()
  const fetchObject: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'same-origin',
    // mode: 'cors'
  }
  if (method !== 'get' && body) {
    fetchObject.body = JSON.stringify(body)
  }
  return window.fetch(prefixAPI(url), fetchObject)
}

const requestWithoutAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fetchObject: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
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
  ) => void
): Promise<AnyJson> => {
  const response = await requestWithAuthentication(url, method, body)
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
    return null
  }
}

export const requestJSONWithoutAuth = async (
  url: string,
  method = 'get',
  body: AnyJson,
  errorCode: string,
  successCallback: (
    responseJSON: FixTypeLater,
    pagination?: FixTypeLater
  ) => void
): Promise<AnyJson> => {
  const response = await requestWithoutAuthentication(url, method, body)
  let json
  try {
    json = await response.json()
  } catch (e) {
    console.error('getJSONWithErrorHandler: Error decoding JSON from response.')
  }

  const paginationHeader = response.headers.get('X-Pagination')
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : {}

  console.log(response, response.headers, 'paginationHeader', paginationHeader)

  if (response.ok) {
    if (successCallback) {
      successCallback(json, pagination)
    }
    return json
  } else {
    const store = {}
    setError((store as FixTypeLater).dispatch, errorCode)
    return null
  }
}
