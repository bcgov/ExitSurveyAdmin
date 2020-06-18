import React from 'react'

import { EmployeeTimelineEntry } from '../../types/EmployeeTimelineEntry'
import FormattedDate from '../DisplayHelpers/FormattedDate'

interface IProps {
  timelineEntry: EmployeeTimelineEntry
}

class TimelineEntry extends React.Component<IProps> {
  render(): JSX.Element {
    const { timelineEntry: tl } = this.props
    return (
      <div className="TimelineEntry">
        <hr />
        <div className="mb-2">
          <small>
            <span className="text-muted">
              <FormattedDate date={tl.createdTs} nice />
              &nbsp;
              <span className="text-extra-muted">
                (<FormattedDate date={tl.createdTs} showTime />)
              </span>
            </span>
            <br />
            <span className="text-muted">Action</span> {tl.employeeActionCode}
            {tl.adminUserName && (
              <>
                &nbsp;•&nbsp;
                <span className="text-muted">By</span> {tl.adminUserName}
              </>
            )}
          </small>
        </div>
        {tl.comment}
      </div>
    )
  }
}
export default TimelineEntry
