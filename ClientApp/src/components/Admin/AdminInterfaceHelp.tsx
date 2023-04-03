import moment from 'moment-timezone'
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
            The scheduled task runs Monday through Friday at ***REMOVED***TASK_TIME***REMOVED*** Pacific
            time. In order, the task will:
            <ol className="my-2 pl-3">
              <li>
                <strong>Update employee statuses from CallWeb</strong>, checking
                to see whether any employees in a non-final state have completed
                their surveys. Users now within the expiry window will have
                their status set back to Exiting. However, users will not be
                shifted <em>into</em> to an Expired state at this time.
              </li>
              <li>
                <strong>Retrieve employee information from the PSA API</strong>,
                inserting new users and updating existing ones as appropriate.
              </li>
              <li>
                <strong>
                  Set any employees who have dropped off the PSA API to Not
                  Exiting
                </strong>
                . In this case, they most likely are not actually exiting
                employment.
              </li>
              <li>
                <strong>Set Exiting users to Expired</strong>, if they are now
                outside the expiry threshold.
              </li>
            </ol>
          </AdminInterfaceHelpTopic>
        </div>
      </div>
    </div>
  )
***REMOVED***

export default AdminInterfaceHelp
