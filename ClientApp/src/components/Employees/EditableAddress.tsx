import React from 'react'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import './EditableField.scss'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import Address from '../DisplayHelpers/Address'

interface IProps ***REMOVED***
  employee: Employee
  refreshDataCallback: () => void
***REMOVED***

const EditableStringField = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** employee ***REMOVED*** = props

  const line1Ref = React.useRef<HTMLInputElement>(null)

  const [line1, setLine1] = React.useState(employee.address1 || '')
  const [line2, setLine2] = React.useState(employee.address2 || '')
  const [city, setCity] = React.useState(employee.addressCity || '')
  const [province, setProvince] = React.useState(employee.addressProvince || '')
  const [postCode, setPostCode] = React.useState(employee.addressPostCode || '')
  const [isEditable, setIsEditable] = React.useState(false)

  const toggleEditable = (): void => ***REMOVED***
    setIsEditable(!isEditable)
***REMOVED***

  React.useEffect(() => ***REMOVED***
    if (isEditable) ***REMOVED***
      line1Ref.current?.select()
  ***REMOVED***
***REMOVED*** [isEditable])

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/$***REMOVED***employee.id***REMOVED***`,
      'patch',
      ***REMOVED***
        Address1: line1,
        Address2: line2,
        AddressCity: city,
        AddressProvince: province,
        AddressPostCode: postCode
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
            placeholder="City"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***postCode***REMOVED***
            onChange=***REMOVED***(e): void => setPostCode(e.target.value)***REMOVED***
            placeholder="City"
          />
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick=***REMOVED***toggleEditable***REMOVED***
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span onClick=***REMOVED***toggleEditable***REMOVED***>
          <div className="Editable">
            <Address employee=***REMOVED***employee***REMOVED*** />
          </div>
        </span>
      )***REMOVED***
    </div>
  )
***REMOVED***

export default EditableStringField
