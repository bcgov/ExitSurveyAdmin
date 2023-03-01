import moment from 'moment'
import React from 'react'

import AdminInterfaceHelpTopic from './AdminInterfaceHelpTopic'

import './AdminInterfaceHelp.scss'

// The scheduled task runs at 16:00 UTC.
const SCHEDULED_TASK_UTC_TIME = moment.utc().hour(16).minute(0)

// The task time will be shown in Pacific time.
const TASK_TIME = SCHEDULED_TASK_UTC_TIME.clone()
  .tz('America/Vancouver')
  .format('h:mm')

const AdminInterfaceHelp = (): JSX.Element => ***REMOVED***
  return (
    <div className="AdminInterfaceHelp text-muted border border-secondary p-3 shadow mt-4">
      <h2 className="mb-1">
        <i className="fas fa-info-circle mr-2" /> Information
      </h2>
      <div className="row">
        <div className="col">
          <AdminInterfaceHelpTopic title="Scheduled task">
            The scheduled task runs every day at ***REMOVED***TASK_TIME***REMOVED*** Pacific time. In
            order, the task will:
            <ol className="my-2 pl-3">
              <li>
                <strong>Update employee statuses from CallWeb</strong>, checking
                to see whether any employees in a non-final state have completed
                their surveys.
              </li>
              <li>
                <strong>Update blackout status</strong>, if applicable. If the
                blackout period is not set, any employees which have their
                invitation dates set to January 1, 2099 will have their dates
                reset to the dates indicated on this interface. In other words,
                their dates will be set as if they had been pulled in the next
                scheduled data pull. If the blackout period is set, nothing
                happens.
              </li>
              <li>
                <strong>Retrieve employee information from the PSA API</strong>,
                if today is the data pull day of week. If today is not the data
                pull day of the week, nothing happens.
              </li>
            </ol>
          </AdminInterfaceHelpTopic>
        </div>
        <div className="col">
          <AdminInterfaceHelpTopic title="Days between invites">
            You can set the days between invitations. Remember to adjust the
            email template in CallWeb to reflect any changes made to the closing
            date.
          </AdminInterfaceHelpTopic>
          <AdminInterfaceHelpTopic title="Blackout period">
            <p>
              The blackout period setting allows an admin to pause the pushing
              of survey invitation dates into CallWeb. When set to
              &ldquo;Yes,&rdquo; all invitation-related dates on imported
              employees will be set to January 1, 2099. Otherwise, employees
              will be imported as normal. When the blackout period is turned
              off, employees will have their invite dates reset as if they had
              been added to the system on the currently-set data pull day.
            </p>
          </AdminInterfaceHelpTopic>
        </div>
      </div>
    </div>
  )
***REMOVED***

export default AdminInterfaceHelp
