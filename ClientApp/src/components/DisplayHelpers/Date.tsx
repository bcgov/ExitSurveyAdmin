import React from 'react'

interface IProps ***REMOVED***
  dateString: string
  showTime?: boolean
***REMOVED***

const LOCALE = 'en-ca'

class LabelledText extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const date = new Date(this.props.dateString)
    return (
      <div className="Date">
        ***REMOVED***this.props.showTime
          ? date.toLocaleString(LOCALE)
          : date.toLocaleDateString(LOCALE)***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***

export default LabelledText
