import React from 'react'

import { AnyJson } from '../../types/JsonType'
import { Employee } from '../../types/Employee'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { userNameFromState } from '../../helpers/userHelper'
import Address from './Address'

import './EditableField.scss'
import SuccessMessage from './SuccessMessage'

interface IProps {
  employee: Employee
  refreshDataCallback: () => void
}

const EditableAddress = (props: IProps): JSX.Element => {
  const { employee } = props

  const line1Ref = React.useRef<HTMLInputElement>(null)

  const {
    preferredAddress1,
    preferredAddress2,
    preferredAddressCity,
    preferredAddressProvince,
    preferredAddressPostCode
  } = employee

  const [line1, setLine1] = React.useState(preferredAddress1 || '')
  const [line2, setLine2] = React.useState(preferredAddress2 || '')
  const [city, setCity] = React.useState(preferredAddressCity || '')
  const [province, setProvince] = React.useState(preferredAddressProvince || '')
  const [postCode, setPostCode] = React.useState(preferredAddressPostCode || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [successTime, setSuccessTime] = React.useState(0)

  const toggleEditable = (): void => {
    setIsEditable(!isEditable)
  }

  React.useEffect(() => {
    if (isEditable) {
      line1Ref.current?.select()
    }
  }, [isEditable])

  const isDirty = !(
    line1 === preferredAddress1 &&
    line2 === preferredAddress2 &&
    city === preferredAddressCity &&
    province === preferredAddressProvince &&
    postCode === preferredAddressPostCode
  )

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/${employee.id}`,
      'patch',
      {
        PreferredAddress1: line1,
        PreferredAddress2: line2,
        PreferredAddressCity: city,
        PreferredAddressProvince: province,
        PreferredAddressPostCode: postCode,
        AdminUserName: userNameFromState()
      },
      'CANNOT_EDIT_EMPLOYEE',
      (responseJSON: AnyJson): void => {
        toggleEditable()
        console.log(responseJSON)
        props.refreshDataCallback()
        setSuccessTime(Date.now())
      }
    )
  }

  return (
    <div className="EditableField">
      {isEditable ? (
        <form onSubmit={submitEdit}>
          <input
            type="text"
            className="form-control form-control-sm"
            value={line1}
            onChange={(e): void => setLine1(e.target.value)}
            placeholder="Address line 1"
            ref={line1Ref}
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={line2}
            onChange={(e): void => setLine2(e.target.value)}
            placeholder="Address line 2"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={city}
            onChange={(e): void => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={province}
            onChange={(e): void => setProvince(e.target.value)}
            placeholder="Province"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={postCode}
            onChange={(e): void => setPostCode(e.target.value)}
            placeholder="Post code"
          />
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick={toggleEditable}
          />
          <input
            disabled={!isDirty}
            type="submit"
            value={!isDirty ? 'No changes made' : 'Save changes'}
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span onClick={toggleEditable}>
          <div className="Editable">
            <Address employee={employee} showPreferred />
          </div>
        </span>
      )}
      <SuccessMessage className="pt-1" successTime={successTime} />
    </div>
  )
}

export default EditableAddress
