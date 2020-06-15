import React from 'react'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AnyJson } from '../../types/JsonType'
import { userNameFromState } from '../../helpers/userHelper'

interface IProps {
  employeeDatabaseId: string
  employeeStatusCode: string
  refreshDataCallback: () => void
}

const AddComment = (props: IProps): JSX.Element => {
  const { employeeDatabaseId, employeeStatusCode } = props

  const [comment, setComment] = React.useState('')

  const submitComment = (event: React.FormEvent<HTMLFormElement>): void => {
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
        props.refreshDataCallback()
        setComment('')
      }
    )
  }

  return (
    <div>
      <form onSubmit={submitComment}>
        <textarea
          className="form-control form-control-sm"
          value={comment}
          onChange={(e): void => setComment(e.target.value)}
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
}

export default AddComment
