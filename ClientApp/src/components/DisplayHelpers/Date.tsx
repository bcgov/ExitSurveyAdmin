import React from 'react'

interface IProps {
  dateString: string
  showTime?: boolean
}

const LOCALE = 'en-ca'

class LabelledText extends React.Component<IProps> {
  render(): JSX.Element {
    const date = new Date(this.props.dateString)
    return (
      <div className="Date">
        {this.props.showTime
          ? date.toLocaleString(LOCALE)
          : date.toLocaleDateString(LOCALE)}
      </div>
    )
  }
}

export default LabelledText
