import React from 'react'
import moment from 'moment-timezone'
import ***REMOVED***
  defaultDateFormat,
  defaultNiceDatetimeFormat
***REMOVED*** from '../../helpers/dateHelper'

interface IProps ***REMOVED***
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
  nice?: boolean
***REMOVED***

const TIMEZONE = 'America/Vancouver'

const FormattedDate = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** date, showTime, showLocalTimezone, nice ***REMOVED*** = props

  let momentDate = moment(date)

  if (showLocalTimezone) ***REMOVED***
    momentDate = momentDate.tz(TIMEZONE)
***REMOVED***

  let displayDate = ''

  if (nice) ***REMOVED***
    displayDate = momentDate.fromNow()
***REMOVED*** else ***REMOVED***
    displayDate = showTime
      ? momentDate.format(defaultNiceDatetimeFormat)
      : momentDate.format(defaultDateFormat)
***REMOVED***

  return <span className="Date">***REMOVED***displayDate***REMOVED***</span>
***REMOVED***

export default FormattedDate
