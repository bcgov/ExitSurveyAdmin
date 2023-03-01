import React from 'react'

import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import KeycloakService from '../Login/KeycloakService'
import SuccessMessage from './SuccessMessage'

import './EditableField.scss'

export interface ISelectOption ***REMOVED***
  name: string
  value: string
***REMOVED***

interface IProps ***REMOVED***
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  valueToDisplayAccessor?: (value: string) => string
  options: ISelectOption[]
  refreshDataCallback: () => void
***REMOVED***

const EditableSelect = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED***
    employeeDatabaseId,
    fieldName,
    fieldValue,
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
      `api/employees/$***REMOVED***employeeDatabaseId***REMOVED***`,
      'patch',
      ***REMOVED***
        [fieldName]: newValue,
        AdminUserName: KeycloakService.getUsername(),
    ***REMOVED***
      'CANNOT_EDIT_EMPLOYEE',
      (responseJSON: AnyJson): void => ***REMOVED***
        toggleEditable()
        console.log(responseJSON)
        props.refreshDataCallback()
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
