import React from 'react'

import ***REMOVED*** AnyJson ***REMOVED*** from '../../../../types/JsonType'
import ***REMOVED*** Employee ***REMOVED*** from '../../../../types/Employee'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../../../helpers/requestHelpers'
import Address from '../../../Employees/Address'
import KeycloakService from '../../../Login/KeycloakService'
import SuccessMessage from '../../../Employees/SuccessMessage'

import './EditableField.scss'

interface Props ***REMOVED***
  employee: Employee
  refreshDataCallback: () => void
***REMOVED***

const EditableAddress = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED*** employee ***REMOVED*** = props

  const line1Ref = React.useRef<HTMLInputElement>(null)

  const ***REMOVED***
    preferredAddress1,
    preferredAddress2,
    preferredAddressCity,
    preferredAddressProvince,
    preferredAddressPostCode,
***REMOVED*** = employee

  const [line1, setLine1] = React.useState(preferredAddress1 || '')
  const [line2, setLine2] = React.useState(preferredAddress2 || '')
  const [city, setCity] = React.useState(preferredAddressCity || '')
  const [province, setProvince] = React.useState(preferredAddressProvince || '')
  const [postCode, setPostCode] = React.useState(preferredAddressPostCode || '')
  const [isEditable, setIsEditable] = React.useState(false)
  const [successTime, setSuccessTime] = React.useState(0)

  const toggleEditable = (): void => ***REMOVED***
    setIsEditable(!isEditable)
***REMOVED***

  React.useEffect(() => ***REMOVED***
    if (isEditable) ***REMOVED***
      line1Ref.current?.select()
  ***REMOVED***
***REMOVED*** [isEditable])

  const isDirty = !(
    line1 === preferredAddress1 &&
    line2 === preferredAddress2 &&
    city === preferredAddressCity &&
    province === preferredAddressProvince &&
    postCode === preferredAddressPostCode
  )

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/$***REMOVED***employee.id***REMOVED***`,
      'PATCH',
      ***REMOVED***
        PreferredAddress1: line1,
        PreferredAddress2: line2,
        PreferredAddressCity: city,
        PreferredAddressProvince: province,
        PreferredAddressPostCode: postCode,
        AdminUserName: KeycloakService.getUsername(),
    ***REMOVED***
      'CANNOT_EDIT_EMPLOYEE',
      (responseJSON: AnyJson): void => ***REMOVED***
        toggleEditable()
        console.log(responseJSON)
        props.refreshDataCallback()
        setSuccessTime(Date.now())
    ***REMOVED***
    )
***REMOVED***

  return (
    <div className="EditableField">
      ***REMOVED***isEditable ? (
        <form onSubmit=***REMOVED***submitEdit***REMOVED***>
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***line1***REMOVED***
            onChange=***REMOVED***(e): void => setLine1(e.target.value)***REMOVED***
            placeholder="Address line 1"
            ref=***REMOVED***line1Ref***REMOVED***
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***line2***REMOVED***
            onChange=***REMOVED***(e): void => setLine2(e.target.value)***REMOVED***
            placeholder="Address line 2"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***city***REMOVED***
            onChange=***REMOVED***(e): void => setCity(e.target.value)***REMOVED***
            placeholder="City"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***province***REMOVED***
            onChange=***REMOVED***(e): void => setProvince(e.target.value)***REMOVED***
            placeholder="Province"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***postCode***REMOVED***
            onChange=***REMOVED***(e): void => setPostCode(e.target.value)***REMOVED***
            placeholder="Post code"
          />
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick=***REMOVED***toggleEditable***REMOVED***
          />
          <input
            disabled=***REMOVED***!isDirty***REMOVED***
            type="submit"
            value=***REMOVED***!isDirty ? 'No changes made' : 'Save changes'***REMOVED***
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span onClick=***REMOVED***toggleEditable***REMOVED***>
          <div className="Editable">
            <Address employee=***REMOVED***employee***REMOVED*** showPreferred />
          </div>
        </span>
      )***REMOVED***
      <SuccessMessage className="pt-1" successTime=***REMOVED***successTime***REMOVED*** />
    </div>
  )
***REMOVED***

export default EditableAddress
