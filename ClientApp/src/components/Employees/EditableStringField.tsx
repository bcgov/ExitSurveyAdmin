import React from 'react'

import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** userNameFromState ***REMOVED*** from '../../helpers/userHelper'

import './EditableField.scss'
import SuccessMessage from './SuccessMessage'

interface IProps ***REMOVED***
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
  validator?: (value: string) => boolean
  modelPath?: string
  ignoreAdminUserName?: boolean
***REMOVED***

const EditableStringField = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED***
    employeeDatabaseId,
    fieldName,
    fieldValue,
    modelPath,
    refreshDataCallback,
    validator,
    ignoreAdminUserName
***REMOVED*** = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [isValid, setIsValid] = React.useState(true)
  const [successTime, setSuccessTime] = React.useState(0)

  const toggleEditable = React.useCallback((): void => ***REMOVED***
    setIsEditable(!isEditable)
***REMOVED*** [isEditable])

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

  const submitEdit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
      const patchBody = ***REMOVED*** [fieldName]: newValue ***REMOVED***
      if (!ignoreAdminUserName) ***REMOVED***
        patchBody['AdminUserName'] = userNameFromState()!
    ***REMOVED***
      event.preventDefault()
      requestJSONWithErrorHandler(
        `api/$***REMOVED***modelPath || 'employees'***REMOVED***/$***REMOVED***employeeDatabaseId***REMOVED***`,
        'patch',
        patchBody,
        'CANNOT_EDIT_EMPLOYEE',
        (responseJSON: AnyJson): void => ***REMOVED***
          toggleEditable()
          console.log(responseJSON)
          refreshDataCallback()
          setSuccessTime(Date.now())
      ***REMOVED***
      )
  ***REMOVED***
    [
      employeeDatabaseId,
      fieldName,
      newValue,
      refreshDataCallback,
      toggleEditable,
      modelPath,
      ignoreAdminUserName
    ]
  )

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
        <div className="Editable" onClick=***REMOVED***toggleEditable***REMOVED***>
          ***REMOVED***fieldValue || '[None set]'***REMOVED***
        </div>
      )***REMOVED***
      <SuccessMessage className="pt-1" successTime=***REMOVED***successTime***REMOVED*** />
    </div>
  )
***REMOVED***

export default EditableStringField
