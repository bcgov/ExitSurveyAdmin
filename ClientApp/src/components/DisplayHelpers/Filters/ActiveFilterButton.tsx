/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import IconButton from '../Interface/Buttons/IconButton'
import { IFilter } from './FilterClasses/FilterTypes'

interface IProps {
  filter: IFilter
  removeFilter: (filter: IFilter) => void
}

const ActiveFilterButton = ({ filter, removeFilter }: IProps): JSX.Element => {
  const remove = (): void => {
    removeFilter(filter)
  }

  const label = (
    <>
      {filter.fieldName}: <strong>{filter.displayString}</strong>
    </>
  )

  return (
    <IconButton
      label={label}
      iconName="times"
      marginClasses="mr-1 my-1 mb-0"
      iconMarginClasses="ml-2"
      colorType="primary"
      iconRight
      size="sm"
      onClick={remove}
    />
  )
}

export default ActiveFilterButton
