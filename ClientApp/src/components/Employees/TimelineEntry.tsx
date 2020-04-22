import React from 'react'
import ***REMOVED*** EmployeeTimelineEntry ***REMOVED*** from '../../types/EmployeeTimelineEntry'
import LabelledText from '../DisplayHelpers/LabelledText'
import Date from '../DisplayHelpers/Date'

interface IProps ***REMOVED***
  timelineEntry: EmployeeTimelineEntry
***REMOVED***

class TimelineEntry extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const ***REMOVED*** timelineEntry: tl ***REMOVED*** = this.props
    return (
      <div className="TimelineEntry">
        <hr />
        <LabelledText label=***REMOVED***'Date'***REMOVED***>
          <Date showTime date=***REMOVED***tl.createdTs***REMOVED*** />
        </LabelledText>
        <LabelledText label=***REMOVED***'Comment'***REMOVED***>***REMOVED***tl.comment***REMOVED***</LabelledText>
      </div>
    )
***REMOVED***
***REMOVED***
export default TimelineEntry
