import React from 'react'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import './EditableField.scss'

interface IProps ***REMOVED***
  employeeDatabaseId: string
  fieldName: string
  fieldValue: string
  refreshDataCallback: () => void
***REMOVED***

const EditableStringField = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** employeeDatabaseId, fieldName, fieldValue ***REMOVED*** = props

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [newValue, setNewValue] = React.useState(fieldValue || '')
  const [isEditable, setIsEditable] = React.useState(false)

  const toggleEditable = (): void => ***REMOVED***
    setIsEditable(!isEditable)
***REMOVED***

  React.useEffect(() => ***REMOVED***
    if (isEditable) ***REMOVED***
      inputRef.current?.select()
  ***REMOVED***
***REMOVED*** [isEditable])

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/$***REMOVED***employeeDatabaseId***REMOVED***`,
      'patch',
      ***REMOVED***
        [fieldName]: newValue
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
    <div className="EditableField EditableStringField">
      ***REMOVED***isEditable ? (
        <form onSubmit=***REMOVED***submitEdit***REMOVED***>
          <input
            type="text"
            className="form-control form-control-sm"
            value=***REMOVED***newValue***REMOVED***
            onChange=***REMOVED***(e): void => setNewValue(e.target.value)***REMOVED***
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
            type="submit"
            value="Save"
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span onClick=***REMOVED***toggleEditable***REMOVED***>***REMOVED***fieldValue***REMOVED***</span>
      )***REMOVED***
    </div>
  )
***REMOVED***

export default EditableStringField
