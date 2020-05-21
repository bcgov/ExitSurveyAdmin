import React from 'react'
import IconButton from './IconButton'

interface IProps {
  filter: string
  value: string
}

class ActiveFilterButton extends React.Component<IProps> {
  public render(): JSX.Element {
    const { filter, value } = this.props

    return (
      <IconButton
        label={
          <React.Fragment>
            {filter}: <strong>{value}</strong>
          </React.Fragment>
        }
        iconName="times"
        marginClasses="mr-1 mb-0"
        iconMarginClasses="ml-2"
        colorType="brand-secondary"
        iconRight
        size="sm"
      />
    )
  }
}

export default ActiveFilterButton
