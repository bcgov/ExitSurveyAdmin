import React from 'react'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../../../helpers/requestHelpers'
import SuccessMessage from '../../../Employees/SuccessMessage'

import './EditableField.scss'
import KeycloakService from '../../../Login/KeycloakService'

export interface SelectOption ***REMOVED***
  name: string
  value: string
***REMOVED***

interface Props ***REMOVED***
  modelDatabaseId: string
  fieldName: string
  fieldValue: string
  inline?: boolean
  max?: number
  min?: number
  modelPath?: string
  refreshDataCallback?: (response: FixTypeLater) => void
  step?: number
  valueToDisplayAccessor?: (value: string) => string
***REMOVED***

const EditableNumber = (***REMOVED***
  modelDatabaseId,
  fieldName,
  fieldValue,
  inline,
  max,
  min,
  modelPath,
  refreshDataCallback,
  step,
  valueToDisplayAccessor,
***REMOVED***: Props): JSX.Element => ***REMOVED***
  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [successTime, setSuccessTime] = React.useState(0)

  const toggleEditable = (): void => ***REMOVED***
    setIsEditable(!isEditable)
***REMOVED***

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/$***REMOVED***modelPath || 'employees'***REMOVED***/$***REMOVED***modelDatabaseId***REMOVED***`,
      'PATCH',
      ***REMOVED***
        [fieldName]: newValue,
        AdminUserName: KeycloakService.getUsername(),
    ***REMOVED***
      'CANNOT_EDIT_EMPLOYEE',
      (response): void => ***REMOVED***
        toggleEditable()
        if (refreshDataCallback) ***REMOVED***
          refreshDataCallback(response)
      ***REMOVED***
        setSuccessTime(Date.now())
    ***REMOVED***
    )
***REMOVED***

  const onNumberChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => ***REMOVED***
      const newValue = +e.target.value

      if (isNaN(newValue)) setNewValue(`$***REMOVED***min || 0***REMOVED***`)
      else if (min !== undefined && newValue < min) setNewValue(`$***REMOVED***min***REMOVED***`)
      else if (max !== undefined && newValue > max) setNewValue(`$***REMOVED***max***REMOVED***`)
      else setNewValue(`$***REMOVED***newValue***REMOVED***`)
  ***REMOVED***
    [setNewValue]
  )

  return (
    <div className=***REMOVED***`EditableField EditableNumber $***REMOVED***inline && 'd-inline'***REMOVED***`***REMOVED***>
      ***REMOVED***isEditable ? (
        <form onSubmit=***REMOVED***submitEdit***REMOVED*** className=***REMOVED***`$***REMOVED***inline && 'form-inline'***REMOVED***`***REMOVED***>
          <input
            className="form-control form-control-sm"
            type="number"
            min=***REMOVED***min***REMOVED***
            max=***REMOVED***max***REMOVED***
            step=***REMOVED***step***REMOVED***
            value=***REMOVED***newValue***REMOVED***
            onChange=***REMOVED***onNumberChange***REMOVED***
          />
          <input
            type="button"
            value="Cancel"
            className=***REMOVED***`btn btn-sm btn-outline-danger $***REMOVED***!inline && 'mt-2'***REMOVED*** $***REMOVED***inline && 'ml-2'
            ***REMOVED*** mr-2`***REMOVED***
            onClick=***REMOVED***toggleEditable***REMOVED***
          />
          <input
            type="submit"
            value="Save"
            className=***REMOVED***`btn btn-sm btn-primary $***REMOVED***!inline && 'mt-2'***REMOVED***`***REMOVED***
          />
        </form>
      ) : (
        <span className="Editable" onClick=***REMOVED***toggleEditable***REMOVED***>
          ***REMOVED***valueToDisplayAccessor
            ? valueToDisplayAccessor(fieldValue)
            : fieldValue***REMOVED***
        </span>
      )***REMOVED***
      <SuccessMessage
        className=***REMOVED***`pt-1 $***REMOVED***!inline && 'mt-2'***REMOVED*** $***REMOVED***inline && 'ml-2'***REMOVED***`***REMOVED***
        successTime=***REMOVED***successTime***REMOVED***
        inline=***REMOVED***inline***REMOVED***
      />
    </div>
  )
***REMOVED***

export default EditableNumber
