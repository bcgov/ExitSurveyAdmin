import React from 'react'

interface IProps ***REMOVED***
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
***REMOVED***

const LOCALE = 'en-ca'

class FormattedDate extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const ***REMOVED*** date, showTime, showLocalTimezone ***REMOVED*** = this.props
    const options: Intl.DateTimeFormatOptions = ***REMOVED******REMOVED***
    if (!showLocalTimezone) options.timeZone = 'UTC'
    return (
      <div className="Date">
        ***REMOVED***date && showTime
          ? date.toLocaleString(LOCALE, options)
          : date
          ? date.toLocaleDateString(LOCALE, options)
          : ''***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***

export default FormattedDate
