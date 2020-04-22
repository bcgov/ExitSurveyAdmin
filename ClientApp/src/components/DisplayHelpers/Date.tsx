import React from 'react'

interface IProps ***REMOVED***
  date?: Date
  showTime?: boolean
***REMOVED***

const LOCALE = 'en-ca'

class LabelledText extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const date = this.props.date
    return (
      <div className="Date">
        ***REMOVED***date && this.props.showTime
          ? date.toLocaleString(LOCALE)
          : date
          ? date.toLocaleDateString(LOCALE)
          : ''***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***

export default LabelledText
