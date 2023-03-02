/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'

import { Filter } from '../FilterClasses/FilterTypes'
import { labelFor } from '../../../helpers/labelHelper'
import IconButton from '../../DisplayHelpers/Interface/Buttons/IconButton'

interface Props {
  filter: Filter
  removeFilter: (filter: Filter) => void
}

const ActiveFilterButton = ({ filter, removeFilter }: Props): JSX.Element => {
  const remove = (): void => {
    removeFilter(filter)
  }

  const label = (
    <>
      {labelFor(filter.fieldName)}: <strong>{filter.displayString}</strong>
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
