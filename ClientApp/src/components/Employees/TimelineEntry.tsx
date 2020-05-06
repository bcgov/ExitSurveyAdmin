import React from 'react'
import { EmployeeTimelineEntry } from '../../types/EmployeeTimelineEntry'
// import LabelledText from '../DisplayHelpers/LabelledText'
import Date from '../DisplayHelpers/FormattedDate'

interface IProps {
  timelineEntry: EmployeeTimelineEntry
}

class TimelineEntry extends React.Component<IProps> {
  render(): JSX.Element {
    const { timelineEntry: tl } = this.props
    console.log(tl)
    return (
      <div className="TimelineEntry">
        <hr />
        <div className="mb-2">
          <small>
            <span className="text-muted">
              <Date showTime showLocalTimezone date={tl.createdTs} />
            </span>
            <br />
            <span className="text-muted">Action</span> {tl.employeeActionCode}
            &nbsp;•&nbsp;
            <span className="text-muted">Status</span> {tl.employeeStatusCode}
          </small>
        </div>
        {tl.comment}
      </div>
    )
  }
}
export default TimelineEntry
