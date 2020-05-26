import React from 'react'
import IconButton from './IconButton'
import { employeeFieldLabels } from '../../../../types/Employee'
import { IFilterField } from '../../Filters/FilterTypes'
import { enumItemsForField } from '../../Filters/EnumFilterInput'

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

  switch (type) {
    case 'date':
      if (values[0].length > 0 && values[1].length > 0) {
        valueString = `${values[0]} to ${values[1]}`
      } else if (values[0].length > 0) {
        valueString = `From ${values[0]}`
      } else {
        valueString = `Before ${values[1]}`
      }
      break
    case 'enum':
      valueString = values
        .map(
          v =>
            enumItemsForField(fieldName).find(enumItem => enumItem.value === v)
              ?.name
        )
        .join(' or ')
      break
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
