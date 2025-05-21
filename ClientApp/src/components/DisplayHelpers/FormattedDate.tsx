import { type JSX } from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import {
  defaultDateFormat,
  defaultNiceDatetimeFormat,
} from '../../helpers/dateHelper'

dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

interface Props {
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
  nice?: boolean
  customFormat?: string
}

const TIMEZONE = 'America/Vancouver'

const FormattedDate = ({
  customFormat,
  date,
  nice,
  showLocalTimezone,
  showTime,
}: Props): JSX.Element => {
  let dayjsDate = dayjs(date)

  if (showLocalTimezone) {
    dayjsDate = dayjsDate.tz(TIMEZONE)
  }

  let displayDate = ''

  if (customFormat) {
    displayDate = dayjsDate.format(customFormat)
  } else if (nice) {
    displayDate = dayjsDate.fromNow()
  } else {
    displayDate = showTime
      ? dayjsDate.format(defaultNiceDatetimeFormat)
      : dayjsDate.format(defaultDateFormat)
  }

  return <span className="Date">{displayDate}</span>
}

export default FormattedDate
