import { setError } from './errorHandlingHelper'
import store from '../store/store'
import { FixTypeLater } from '../types/FixTypeLater'
import { AnyJson } from '../types/JsonType'
import { deploymentUrl } from './envHelper'

export const prefixAPI = (path: string): string => {
  return `${deploymentUrl()}${path}`
}

const requestWithAuthentication = (
  url: string,
  method = 'get',
  body: AnyJson
): Promise<Response> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = store.getState()!.oidc!.user!.access_token
  // console.log(token)
  const fetchObject: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'same-origin'
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
    setError(store.dispatch, errorCode)
    return null
  }
}
