import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'

import ***REMOVED*** AnyJson ***REMOVED*** from '../../../../types/JsonType'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../../../helpers/requestHelpers'
import KeycloakService from '../../../Login/KeycloakService'
import SuccessMessage from '../../../Employees/SuccessMessage'

import './EditableField.scss'

interface Props ***REMOVED***
  modelDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
  validator?: (value: string) => boolean
  modelPath?: string
  ignoreAdminUserName?: boolean
***REMOVED***

const EditableStringField = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED***
    modelDatabaseId,
    fieldName,
    fieldValue: originalFieldValue,
    modelPath,
    refreshDataCallback,
    validator,
    ignoreAdminUserName,
***REMOVED*** = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(originalFieldValue || '')
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
        patchBody['AdminUserName'] = KeycloakService.getUsername()
    ***REMOVED***
      event.preventDefault()
      requestJSONWithErrorHandler(
        `api/$***REMOVED***modelPath ?? 'employees'***REMOVED***/$***REMOVED***modelDatabaseId***REMOVED***`,
        'PATCH',
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
      modelDatabaseId,
      fieldName,
      newValue,
      refreshDataCallback,
      toggleEditable,
      modelPath,
      ignoreAdminUserName,
    ]
  )

  const isDirty = originalFieldValue !== newValue
  const isSaveDisabled = !(isValid && isDirty)
  let saveButtonText = ''
  if (!isValid) ***REMOVED***
    saveButtonText = 'Field is invalid'
***REMOVED*** else if (!isDirty) ***REMOVED***
    saveButtonText = 'No changes made'
***REMOVED*** else ***REMOVED***
    saveButtonText = 'Save changes'
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
            className="btn btn-sm btn-outline-danger mt-2 me-2"
            onClick=***REMOVED***toggleEditable***REMOVED***
          />
          <input
            disabled=***REMOVED***isSaveDisabled***REMOVED***
            type="submit"
            value=***REMOVED***saveButtonText***REMOVED***
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <button
          type="button"
          className="Editable btn btn-link p-0"
          onClick=***REMOVED***toggleEditable***REMOVED***
          aria-label=***REMOVED***`Edit $***REMOVED***fieldName***REMOVED***`***REMOVED***
        >
          ***REMOVED***originalFieldValue || '[None set]'***REMOVED***
        </button>
      )***REMOVED***
      <SuccessMessage className="pt-1" successTime=***REMOVED***successTime***REMOVED*** />
    </div>
  )
***REMOVED***

export default EditableStringField
