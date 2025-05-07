import React from 'react'

import { FixTypeLater } from '../../../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../../../helpers/requestHelpers'
import KeycloakService from '../../../Login/KeycloakService'
import SuccessMessage from '../../../Employees/SuccessMessage'

import './EditableField.scss'

export interface SelectOption {
  name: string
  value: string
}

interface Props {
  modelDatabaseId: string
  fieldName: string
  fieldValue: string
  modelPath?: string
  options: SelectOption[]
  refreshDataCallback?: (response: FixTypeLater) => void
  valueToDisplayAccessor?: (value: string) => string
}

const EditableSelect = (props: Props): JSX.Element => {
  const {
    fieldName,
    fieldValue,
    modelDatabaseId,
    modelPath,
    refreshDataCallback,
    options,
    valueToDisplayAccessor,
  } = props

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [successTime, setSuccessTime] = React.useState(0)

  const toggleEditable = (): void => {
    setIsEditable(!isEditable)
  }

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/${modelPath || 'employees'}/${modelDatabaseId}`,
      'PATCH',
      {
        [fieldName]: newValue,
        AdminUserName: KeycloakService.getUsername(),
      },
      'CANNOT_EDIT_EMPLOYEE',
      (response): void => {
        toggleEditable()
        if (refreshDataCallback) {
          refreshDataCallback(response)
        }
        setSuccessTime(Date.now())
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
            {options.map((option): JSX.Element => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              )
            })}
          </select>
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 me-2"
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
          {valueToDisplayAccessor
            ? valueToDisplayAccessor(fieldValue)
            : fieldValue}
        </span>
      )}
      <SuccessMessage className="pt-1 mt-2" successTime={successTime} />
    </div>
  )
}

export default EditableSelect
