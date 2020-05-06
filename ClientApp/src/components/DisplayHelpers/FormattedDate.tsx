import React from 'react'

interface IProps ***REMOVED***
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
***REMOVED***

const LOCALE = 'en-ca'

const FormattedDate = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** date, showTime, showLocalTimezone ***REMOVED*** = props
  const options: Intl.DateTimeFormatOptions = ***REMOVED******REMOVED***
  if (!showLocalTimezone) options.timeZone = 'UTC'
  return (
    <span className="Date">
      ***REMOVED***date && showTime
        ? date.toLocaleString(LOCALE, options)
        : date
        ? date.toLocaleDateString(LOCALE, options)
        : ''***REMOVED***
    </span>
  )
***REMOVED***

export default FormattedDate
