import React from 'react'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import './EditableField.scss'
import ***REMOVED*** userNameFromState ***REMOVED*** from '../../helpers/userHelper'

interface IProps ***REMOVED***
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
  validator?: (value: string) => boolean
***REMOVED***

const EditableStringField = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** employeeDatabaseId, fieldName, fieldValue, validator ***REMOVED*** = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [isValid, setIsValid] = React.useState(true)

  const toggleEditable = (): void => ***REMOVED***
    setIsEditable(!isEditable)
***REMOVED***

  // Select the field when it becomes editable
  React.useEffect(() => ***REMOVED***
    if (isEditable) ***REMOVED***
      inputRef.current?.select()
  ***REMOVED***
***REMOVED*** [isEditable])

  const onValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => ***REMOVED***
      setNewValue(event.target.value)
      if (validator) ***REMOVED***
        setIsValid(validator(event.target.value))
    ***REMOVED***
  ***REMOVED***
    [validator]
  )

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
    <div className="EditableField EditableStringField">
      ***REMOVED***isEditable ? (
        <form onSubmit=***REMOVED***submitEdit***REMOVED***>
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***newValue***REMOVED***
            onChange=***REMOVED***onValueChange***REMOVED***
            placeholder="Edit field"
            ref=***REMOVED***inputRef***REMOVED***
          />
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick=***REMOVED***toggleEditable***REMOVED***
          />
          <input
            disabled=***REMOVED***!isValid***REMOVED***
            type="submit"
            value=***REMOVED***isValid ? 'Save' : 'Field is invalid'***REMOVED***
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
