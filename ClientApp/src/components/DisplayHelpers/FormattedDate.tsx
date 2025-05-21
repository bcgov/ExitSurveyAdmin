import ***REMOVED*** type JSX ***REMOVED*** from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import ***REMOVED***
  defaultDateFormat,
  defaultNiceDatetimeFormat,
***REMOVED*** from '../../helpers/dateHelper'

dayjs.extend(timezone)
dayjs.extend(relativeTime)

interface Props ***REMOVED***
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
  nice?: boolean
  customFormat?: string
***REMOVED***

const TIMEZONE = 'America/Vancouver'

const FormattedDate = (***REMOVED***
  customFormat,
  date,
  nice,
  showLocalTimezone,
  showTime,
***REMOVED***: Props): JSX.Element => ***REMOVED***
  let dayjsDate = dayjs(date)

  if (showLocalTimezone) ***REMOVED***
    dayjsDate = dayjsDate.tz(TIMEZONE)
***REMOVED***

  let displayDate = ''

  if (customFormat) ***REMOVED***
    displayDate = dayjsDate.format(customFormat)
***REMOVED*** else if (nice) ***REMOVED***
    displayDate = dayjsDate.fromNow()
***REMOVED*** else ***REMOVED***
    displayDate = showTime
      ? dayjsDate.format(defaultNiceDatetimeFormat)
      : dayjsDate.format(defaultDateFormat)
***REMOVED***

  return <span className="Date">***REMOVED***displayDate***REMOVED***</span>
***REMOVED***

export default FormattedDate
