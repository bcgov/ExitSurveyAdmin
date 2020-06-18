import { FixTypeLater } from '../types/FixTypeLater'

const ERRORS: { [key: string]: { title: string } } = {
  EMPLOYEE_NOT_FOUND: {
    title: 'Employee with this ID not found'
  }
}

export const setError = (dispatch: FixTypeLater, code: string): void => {
  const error: FixTypeLater = { code }
  error.title = ERRORS[code] ? ERRORS[code].title : 'Unknown error'
  dispatch({ type: 'SET_ERROR', error })
}
