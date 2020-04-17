import { setError } from './errorHandlingHelper'
import store from '../store/store'

export const prefixAPI = path => {
  // const API_LOCATION = process.env.REACT_APP_API_LOCATION
  // return `${API_LOCATION}${path}`
  return path
}

const requestWithAuthentication = (url, method = 'get', body) => {
  // const token = store.getState().token
  const fetchObject = {
    method
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`
    // },
    // credentials: 'same-origin' // By default, fetch won't send any cookies to the server
  }
  if (method !== 'get' && body) {
    fetchObject.body = JSON.stringify(body)
  }
  return window.fetch(prefixAPI(url), fetchObject)
}

export const requestJSONWithErrorHandler = async (
  url,
  method = 'get',
  body,
  errorCode,
  successCallback
) => {
  const response = await requestWithAuthentication(url, method, body)
  let json
  try {
    json = await response.json()
  } catch (e) {
    console.error('getJSONWithErrorHandler: Error decoding JSON from response.')
  }

  if (response.ok) {
    if (successCallback) {
      successCallback(json)
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
