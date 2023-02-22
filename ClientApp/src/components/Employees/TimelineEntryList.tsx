import React from 'react'

import ***REMOVED*** EmployeeTimelineEntry ***REMOVED*** from '../../types/EmployeeTimelineEntry'
import TimelineEntry from './TimelineEntry'

interface IProps ***REMOVED***
  timelineEntries: EmployeeTimelineEntry[]
***REMOVED***

class TimelineEntryList extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const sortedEntries = this.props.timelineEntries.sort((a, b) => ***REMOVED***
      if (
        !a ||
        !a.createdTs ||
        !b ||
        !b.createdTs ||
        a.createdTs === b.createdTs
      ) ***REMOVED***
        return 0
    ***REMOVED*** else if (a.createdTs < b.createdTs) ***REMOVED***
        return 1
    ***REMOVED*** else ***REMOVED***
        return -1
    ***REMOVED***
  ***REMOVED***)
    return (
      <div className="TimelineEntryList">
        ***REMOVED***sortedEntries.map(tl => (
          <TimelineEntry key=***REMOVED***tl.id***REMOVED*** timelineEntry=***REMOVED***tl***REMOVED*** />
        ))***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***
export default TimelineEntryList
