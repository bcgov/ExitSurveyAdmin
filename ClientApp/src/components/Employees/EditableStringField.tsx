import React from 'react'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AnyJson } from '../../types/JsonType'
import './EditableField.scss'

interface IProps {
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
}

const EditableStringField = (props: IProps): JSX.Element => {
  const { employeeDatabaseId, fieldName, fieldValue } = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)

  const toggleEditable = (): void => {
    setIsEditable(!isEditable)
  }

  React.useEffect(() => {
    if (isEditable) {
      inputRef.current?.select()
    }
  }, [isEditable])

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/${employeeDatabaseId}`,
      'patch',
      {
        [fieldName]: newValue
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
            onChange={(e): void => setNewValue(e.target.value)}
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
            type="submit"
            value="Save"
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
