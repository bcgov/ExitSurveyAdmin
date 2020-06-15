import React from 'react'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AnyJson } from '../../types/JsonType'
import './EditableField.scss'
import { userNameFromState } from '../../helpers/userHelper'

export interface ISelectOption {
  name: string
  value: string
}

interface IProps {
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  options: ISelectOption[]
  refreshDataCallback: () => void
}

const EditableStringField = (props: IProps): JSX.Element => {
  const { employeeDatabaseId, fieldName, fieldValue, options } = props

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)

  const toggleEditable = (): void => {
    setIsEditable(!isEditable)
  }

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
    <div className="EditableField EditableDropdown">
      {isEditable ? (
        <form onSubmit={submitEdit}>
          <select
            className="form-control form-control-sm"
            value={newValue}
            onChange={(e): void => setNewValue(e.target.value)}
          >
            {options.map(
              (option): JSX.Element => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                )
              }
            )}
          </select>
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
