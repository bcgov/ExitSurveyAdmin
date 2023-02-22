import React from 'react'

import { AnyJson } from '../../types/JsonType'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { userNameFromState } from '../../helpers/userHelper'

import './EditableField.scss'
import SuccessMessage from './SuccessMessage'

interface IProps {
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
  validator?: (value: string) => boolean
  modelPath?: string
  ignoreAdminUserName?: boolean
}

const EditableStringField = (props: IProps): JSX.Element => {
  const {
    employeeDatabaseId,
    fieldName,
    fieldValue: originalFieldValue,
    modelPath,
    refreshDataCallback,
    validator,
    ignoreAdminUserName
  } = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(originalFieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [isValid, setIsValid] = React.useState(true)
  const [successTime, setSuccessTime] = React.useState(0)

  const toggleEditable = React.useCallback((): void => {
    setIsEditable(!isEditable)
  }, [isEditable])

  // Select the field when it becomes editable
  React.useEffect(() => {
    if (isEditable) {
      inputRef.current?.select()
    }
  }, [isEditable])

  const onValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNewValue(event.target.value)
      if (validator) {
        setIsValid(validator(event.target.value))
      }
    },
    [validator]
  )

  const submitEdit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      const patchBody = { [fieldName]: newValue }
      if (!ignoreAdminUserName) {
        patchBody['AdminUserName'] = userNameFromState()!
      }
      event.preventDefault()
      requestJSONWithErrorHandler(
        `api/${modelPath || 'employees'}/${employeeDatabaseId}`,
        'patch',
        patchBody,
        'CANNOT_EDIT_EMPLOYEE',
        (responseJSON: AnyJson): void => {
          toggleEditable()
          console.log(responseJSON)
          refreshDataCallback()
          setSuccessTime(Date.now())
        }
      )
    },
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

  const isDirty = originalFieldValue !== newValue
  const isSaveDisabled = !(isValid && isDirty)
  const saveButtonText = !isValid
    ? 'Field is invalid'
    : !isDirty
    ? 'No changes made'
    : 'Save changes'

  return (
    <div className="EditableField EditableStringField">
      {isEditable ? (
        <form onSubmit={submitEdit}>
          <input
            type="text"
            className="form-control form-control-sm"
            value={newValue}
            onChange={onValueChange}
            placeholder="Edit field"
            ref={inputRef}
          />
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick={toggleEditable}
          />
          <input
            disabled={isSaveDisabled}
            type="submit"
            value={saveButtonText}
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <div className="Editable" onClick={toggleEditable}>
          {originalFieldValue || '[None set]'}
        </div>
      )}
      <SuccessMessage className="pt-1" successTime={successTime} />
    </div>
  )
}

export default EditableStringField
