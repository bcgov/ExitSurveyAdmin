import React from 'react'
import IconButton from './IconButton'
import { employeeFieldLabels } from '../../../../types/Employee'
import { IFilterField } from '../../Filters/FilterTypes'

interface IProps {
  filterField: IFilterField
  removeFilter: (filter: IFilterField) => void
}

const ActiveFilterButton = ({
  filterField,
  removeFilter
}: IProps): JSX.Element => {
  const remove = (): void => {
    removeFilter(filterField)
  }

  const { fieldName, values, type } = filterField
  const displayLabel = employeeFieldLabels[fieldName]
  let valueString = values[0]

  if (type === 'date') {
    if (values[0].length > 0 && values[1].length > 0) {
      valueString = `Between ${values[0]} and ${values[1]}`
    } else if (values[0].length > 0) {
      valueString = `From ${values[0]}`
    } else {
      valueString = `Before ${values[1]}`
    }
  }

  const label = (
    <>
      {displayLabel}: <strong>{valueString}</strong>
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
