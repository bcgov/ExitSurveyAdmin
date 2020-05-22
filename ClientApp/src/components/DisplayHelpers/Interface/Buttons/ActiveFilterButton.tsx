import React from 'react'
import IconButton from './IconButton'

interface IProps {
  filter: string
  value: string
}

const ActiveFilterButton = (props: IProps) => {
  const { filter, value } = props

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

export default ActiveFilterButton
