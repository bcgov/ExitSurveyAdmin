import React from 'react'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import ***REMOVED*** userNameFromState ***REMOVED*** from '../../helpers/userHelper'

interface IProps ***REMOVED***
  employeeDatabaseId: string
  employeeStatusCode: string
  refreshDataCallback: () => void
***REMOVED***

const AddComment = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** employeeDatabaseId, employeeStatusCode ***REMOVED*** = props

  const [comment, setComment] = React.useState('')

  const submitComment = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employeetimelineentries`,
      'post',
      ***REMOVED***
        EmployeeId: employeeDatabaseId,
        EmployeeActionCode: 'UpdateByAdmin',
        EmployeeStatusCode: employeeStatusCode,
        Comment: comment,
        AdminUserName: userNameFromState()
    ***REMOVED***
      'CANNOT_CREATE_EMPLOYEE_TIMELINE_ENTRY',
      (responseJSON: AnyJson): void => ***REMOVED***
        console.log(responseJSON)
        props.refreshDataCallback()
        setComment('')
    ***REMOVED***
    )
***REMOVED***

  return (
    <div>
      <form onSubmit=***REMOVED***submitComment***REMOVED***>
        <textarea
          className="form-control form-control-sm"
          value=***REMOVED***comment***REMOVED***
          onChange=***REMOVED***(e): void => setComment(e.target.value)***REMOVED***
          placeholder="Add a timeline comment..."
        ></textarea>
        <input
          type="submit"
          value="Add comment"
          className="btn btn-sm btn-primary mt-2"
        />
      </form>
    </div>
  )
***REMOVED***

export default AddComment
