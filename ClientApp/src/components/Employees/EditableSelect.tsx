import React from 'react'

import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** userNameFromState ***REMOVED*** from '../../helpers/userHelper'

import './EditableField.scss'

export interface ISelectOption ***REMOVED***
  name: string
  value: string
***REMOVED***

interface IProps ***REMOVED***
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  options: ISelectOption[]
  refreshDataCallback: () => void
***REMOVED***

const EditableStringField = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** employeeDatabaseId, fieldName, fieldValue, options ***REMOVED*** = props

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)

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
        AdminUserName: userNameFromState()
    ***REMOVED***
      'CANNOT_EDIT_EMPLOYEE',
      (responseJSON: AnyJson): void => ***REMOVED***
        toggleEditable()
        console.log(responseJSON)
        props.refreshDataCallback()
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
            ***REMOVED***options.map(
              (option): JSX.Element => ***REMOVED***
                return (
                  <option key=***REMOVED***option.value***REMOVED*** value=***REMOVED***option.value***REMOVED***>
                    ***REMOVED***option.name***REMOVED***
                  </option>
                )
            ***REMOVED***
            )***REMOVED***
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
          ***REMOVED***fieldValue***REMOVED***
        </span>
      )***REMOVED***
    </div>
  )
***REMOVED***

export default EditableStringField
