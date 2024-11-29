import React from 'react'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../../../helpers/requestHelpers'
import KeycloakService from '../../../Login/KeycloakService'
import SuccessMessage from '../../../Employees/SuccessMessage'

import './EditableField.scss'

export interface SelectOption ***REMOVED***
  name: string
  value: string
***REMOVED***

interface Props ***REMOVED***
  modelDatabaseId: string
  fieldName: string
  fieldValue: string
  modelPath?: string
  options: SelectOption[]
  refreshDataCallback?: (response: FixTypeLater) => void
  valueToDisplayAccessor?: (value: string) => string
***REMOVED***

const EditableSelect = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED***
    fieldName,
    fieldValue,
    modelDatabaseId,
    modelPath,
    refreshDataCallback,
    options,
    valueToDisplayAccessor,
***REMOVED*** = props

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

  return (
    <div className="EditableField EditableDropdown">
      ***REMOVED***isEditable ? (
        <form onSubmit=***REMOVED***submitEdit***REMOVED***>
          <select
            className="form-control form-control-sm"
            value=***REMOVED***newValue***REMOVED***
            onChange=***REMOVED***(e): void => setNewValue(e.target.value)***REMOVED***
          >
            ***REMOVED***options.map((option): JSX.Element => ***REMOVED***
              return (
                <option key=***REMOVED***option.value***REMOVED*** value=***REMOVED***option.value***REMOVED***>
                  ***REMOVED***option.name***REMOVED***
                </option>
              )
          ***REMOVED***)***REMOVED***
          </select>
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick=***REMOVED***toggleEditable***REMOVED***
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span className="Editable" onClick=***REMOVED***toggleEditable***REMOVED***>
          ***REMOVED***valueToDisplayAccessor
            ? valueToDisplayAccessor(fieldValue)
            : fieldValue***REMOVED***
        </span>
      )***REMOVED***
      <SuccessMessage className="pt-1 mt-2" successTime=***REMOVED***successTime***REMOVED*** />
    </div>
  )
***REMOVED***

export default EditableSelect
