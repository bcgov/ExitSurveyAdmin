import React from 'react'
import moment from 'moment-timezone'
import ***REMOVED***
  defaultDateFormat,
  defaultNiceDatetimeFormat,
***REMOVED*** from '../../helpers/dateHelper'

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
  let momentDate = moment(date)

  if (showLocalTimezone) ***REMOVED***
    momentDate = momentDate.tz(TIMEZONE)
***REMOVED***

  let displayDate = ''

  if (customFormat) ***REMOVED***
    displayDate = momentDate.format(customFormat)
***REMOVED*** else if (nice) ***REMOVED***
    displayDate = momentDate.fromNow()
***REMOVED*** else ***REMOVED***
    displayDate = showTime
      ? momentDate.format(defaultNiceDatetimeFormat)
      : momentDate.format(defaultDateFormat)
***REMOVED***

  return <span className="Date">***REMOVED***displayDate***REMOVED***</span>
***REMOVED***

export default FormattedDate
