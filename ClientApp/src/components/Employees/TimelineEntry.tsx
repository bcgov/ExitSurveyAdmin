import React from 'react'
import { EmployeeTimelineEntry } from '../../types/EmployeeTimelineEntry'
// import LabelledText from '../DisplayHelpers/LabelledText'
import Date from '../DisplayHelpers/Date'

interface IProps {
  timelineEntry: EmployeeTimelineEntry
}

class TimelineEntry extends React.Component<IProps> {
  render(): JSX.Element {
    const { timelineEntry: tl } = this.props
    return (
      <div className="TimelineEntry">
        <hr />
        <small className="text-muted">
          <Date showTime date={tl.createdTs} />
        </small>
        <small>{tl.comment}</small>
      </div>
    )
  }
}
export default TimelineEntry
