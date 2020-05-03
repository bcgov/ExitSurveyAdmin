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
        <small className="text-muted">
          <Date showTime showLocalTimezone date=***REMOVED***tl.createdTs***REMOVED*** />
        </small>
        <small>***REMOVED***tl.comment***REMOVED***</small>
      </div>
    )
***REMOVED***
***REMOVED***
export default TimelineEntry
