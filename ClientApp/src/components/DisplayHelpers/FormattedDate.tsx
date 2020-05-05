import React from 'react'

interface IProps {
  date?: Date
  showTime?: boolean
  showLocalTimezone?: boolean
}

const LOCALE = 'en-ca'

const FormattedDate = (props: IProps): JSX.Element => {
  const { date, showTime, showLocalTimezone } = props
  const options: Intl.DateTimeFormatOptions = {}
  if (!showLocalTimezone) options.timeZone = 'UTC'
  return (
    <div className="Date">
      {date && showTime
        ? date.toLocaleString(LOCALE, options)
        : date
        ? date.toLocaleDateString(LOCALE, options)
        : ''}
    </div>
  )
}

export default FormattedDate
