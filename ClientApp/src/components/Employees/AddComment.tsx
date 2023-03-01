import React from 'react'

import ***REMOVED*** AnyJson ***REMOVED*** from '../../types/JsonType'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import SuccessMessage from './SuccessMessage'
import KeycloakService from '../Login/KeycloakService'

interface Props ***REMOVED***
  modelDatabaseId: string
  employeeStatusCode: string
  refreshDataCallback: () => void
***REMOVED***

const AddComment = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED*** modelDatabaseId, employeeStatusCode, refreshDataCallback ***REMOVED*** = props

  const [comment, setComment] = React.useState('')
  const [successTime, setSuccessTime] = React.useState(0)

  const submitComment = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => ***REMOVED***
      event.preventDefault()

      requestJSONWithErrorHandler(
        `api/employeetimelineentries`,
        'post',
        ***REMOVED***
          EmployeeId: modelDatabaseId,
          EmployeeActionCode: 'UpdateByAdmin',
          EmployeeStatusCode: employeeStatusCode,
          Comment: comment,
          AdminUserName: KeycloakService.getUsername(),
      ***REMOVED***
        'CANNOT_CREATE_EMPLOYEE_TIMELINE_ENTRY',
        (responseJSON: AnyJson): void => ***REMOVED***
          console.log(responseJSON)
          refreshDataCallback()
          setComment('')
          setSuccessTime(Date.now())
      ***REMOVED***
      )
  ***REMOVED***
    [comment, modelDatabaseId, employeeStatusCode, refreshDataCallback]
  )

  return (
    <div>
      <form onSubmit=***REMOVED***submitComment***REMOVED***>
        <textarea
          className="form-control form-control-sm"
          value=***REMOVED***comment***REMOVED***
          onChange=***REMOVED***(e): void => setComment(e.target.value)***REMOVED***
          placeholder="Add a timeline comment..."
        ></textarea>
        <div className="d-flex align-items-center">
          <div>
            <input
              type="submit"
              value="Add comment"
              className="btn btn-sm btn-primary mt-2"
              disabled=***REMOVED***comment.length === 0 ? true : false***REMOVED***
            />
          </div>
          <SuccessMessage className="ml-2 pt-2" successTime=***REMOVED***successTime***REMOVED*** />
        </div>
      </form>
    </div>
  )
***REMOVED***

export default AddComment
