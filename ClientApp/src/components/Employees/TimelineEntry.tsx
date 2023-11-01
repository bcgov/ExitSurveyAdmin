import React from 'react'

import ***REMOVED*** EmployeeTimelineEntry ***REMOVED*** from '../../types/EmployeeTimelineEntry'
import FormattedDate from '../DisplayHelpers/FormattedDate'

interface Props ***REMOVED***
  timelineEntry: EmployeeTimelineEntry
***REMOVED***

class TimelineEntry extends React.Component<Props> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const ***REMOVED*** timelineEntry: tl ***REMOVED*** = this.props
    return (
      <div className="TimelineEntry">
        <hr />
        <div className="mb-2">
          <small>
            <span className="text-muted">
              <FormattedDate date=***REMOVED***tl.createdTs***REMOVED*** nice />
              &nbsp;
              <span className="text-extra-muted">
                (<FormattedDate date=***REMOVED***tl.createdTs***REMOVED*** showTime />)
              </span>
            </span>
            <br />
            <span className="text-muted">Action</span> ***REMOVED***tl.employeeActionCode***REMOVED***
            ***REMOVED***tl.adminUserName && (
              <>
                &nbsp;•&nbsp;
                <span className="text-muted">By</span> ***REMOVED***tl.adminUserName***REMOVED***
              </>
            )***REMOVED***
          </small>
        </div>
        ***REMOVED***tl.comment***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***
export default TimelineEntry
