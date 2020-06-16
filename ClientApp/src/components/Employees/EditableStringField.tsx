import React from 'react'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AnyJson } from '../../types/JsonType'
import './EditableField.scss'
import { userNameFromState } from '../../helpers/userHelper'

interface IProps {
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
  validator?: (value: string) => boolean
}

const EditableStringField = (props: IProps): JSX.Element => {
  const { employeeDatabaseId, fieldName, fieldValue, validator } = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [isValid, setIsValid] = React.useState(true)

  const toggleEditable = (): void => {
    setIsEditable(!isEditable)
  }

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

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/${employeeDatabaseId}`,
      'patch',
      {
        [fieldName]: newValue,
        AdminUserName: userNameFromState()
      },
      'CANNOT_EDIT_EMPLOYEE',
      (responseJSON: AnyJson): void => {
        toggleEditable()
        console.log(responseJSON)
        props.refreshDataCallback()
      }
    )
  }

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
            disabled={!isValid}
            type="submit"
            value={isValid ? 'Save' : 'Field is invalid'}
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span className="Editable" onClick={toggleEditable}>
          {fieldValue}
        </span>
      )}
    </div>
  )
}

export default EditableStringField
