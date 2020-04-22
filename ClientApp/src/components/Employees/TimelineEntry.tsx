import React from 'react'
import { EmployeeTimelineEntry } from '../../types/EmployeeTimelineEntry'
import LabelledText from '../DisplayHelpers/LabelledText'
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
        <LabelledText label={'Date'}>
          <Date showTime date={tl.createdTs} />
        </LabelledText>
        <LabelledText label={'Comment'}>{tl.comment}</LabelledText>
      </div>
    )
  }
}
export default TimelineEntry
