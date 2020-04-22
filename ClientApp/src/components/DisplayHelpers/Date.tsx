import React from 'react'

interface IProps {
  date?: Date
  showTime?: boolean
}

const LOCALE = 'en-ca'

class LabelledText extends React.Component<IProps> {
  render(): JSX.Element {
    const date = this.props.date
    return (
      <div className="Date">
        {date && this.props.showTime
          ? date.toLocaleString(LOCALE)
          : date
          ? date.toLocaleDateString(LOCALE)
          : ''}
      </div>
    )
  }
}

export default LabelledText
