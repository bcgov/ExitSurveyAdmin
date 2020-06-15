import React from 'react'
import ***REMOVED*** EmployeeTimelineEntry ***REMOVED*** from '../../types/EmployeeTimelineEntry'
// import LabelledText from '../DisplayHelpers/LabelledText'
import Date from '../DisplayHelpers/FormattedDate'

interface IProps ***REMOVED***
  timelineEntry: EmployeeTimelineEntry
***REMOVED***

class TimelineEntry extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const ***REMOVED*** timelineEntry: tl ***REMOVED*** = this.props
    return (
      <div className="TimelineEntry">
        <hr />
        <div className="mb-2">
          <small>
            <span className="text-muted">
              <Date showTime showLocalTimezone date=***REMOVED***tl.createdTs***REMOVED*** />
            </span>
            <br />
            <span className="text-muted">Action</span> ***REMOVED***tl.employeeActionCode***REMOVED***
            &nbsp;•&nbsp;
            <span className="text-muted">Status</span> ***REMOVED***tl.employeeStatusCode***REMOVED***
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
