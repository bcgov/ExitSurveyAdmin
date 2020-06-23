import React from 'react'

import { AnyJson } from '../../types/JsonType'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { userNameFromState } from '../../helpers/userHelper'
import SuccessMessage from './SuccessMessage'

interface IProps {
  employeeDatabaseId: string
  employeeStatusCode: string
  refreshDataCallback: () => void
}

const AddComment = (props: IProps): JSX.Element => {
  const { employeeDatabaseId, employeeStatusCode, refreshDataCallback } = props

  const [comment, setComment] = React.useState('')
  const [successTime, setSuccessTime] = React.useState(0)

  const submitComment = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      requestJSONWithErrorHandler(
        `api/employeetimelineentries`,
        'post',
        {
          EmployeeId: employeeDatabaseId,
          EmployeeActionCode: 'UpdateByAdmin',
          EmployeeStatusCode: employeeStatusCode,
          Comment: comment,
          AdminUserName: userNameFromState()
        },
        'CANNOT_CREATE_EMPLOYEE_TIMELINE_ENTRY',
        (responseJSON: AnyJson): void => {
          console.log(responseJSON)
          refreshDataCallback()
          setComment('')
          setSuccessTime(Date.now())
        }
      )
    },
    [comment, employeeDatabaseId, employeeStatusCode, refreshDataCallback]
  )

  return (
    <div>
      <form onSubmit={submitComment}>
        <textarea
          className="form-control form-control-sm"
          value={comment}
          onChange={(e): void => setComment(e.target.value)}
          placeholder="Add a timeline comment..."
        ></textarea>
        <div className="d-flex align-items-center">
          <div>
            <input
              type="submit"
              value="Add comment"
              className="btn btn-sm btn-primary mt-2"
              disabled={comment.length === 0 ? true : false}
            />
          </div>
          <SuccessMessage className="ml-2 pt-2" successTime={successTime} />
        </div>
      </form>
    </div>
  )
}

export default AddComment
