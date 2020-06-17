import React from 'react'
import moment from 'moment-timezone'
import {
  defaultDateFormat,
  defaultNiceDatetimeFormat
} from '../../helpers/dateHelper'

interface IProps {
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
  nice?: boolean
}

const TIMEZONE = 'America/Vancouver'

const FormattedDate = (props: IProps): JSX.Element => {
  const { date, showTime, showLocalTimezone, nice } = props

  let momentDate = moment(date)

  if (showLocalTimezone) {
    momentDate = momentDate.tz(TIMEZONE)
  }

  let displayDate = ''

  if (nice) {
    displayDate = momentDate.fromNow()
  } else {
    displayDate = showTime
      ? momentDate.format(defaultNiceDatetimeFormat)
      : momentDate.format(defaultDateFormat)
  }

  return <span className="Date">{displayDate}</span>
}

export default FormattedDate
