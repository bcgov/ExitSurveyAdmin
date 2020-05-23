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
  const { fieldName, values } = filterField
  const label = employeeFieldLabels[fieldName]

  const remove = (): void => {
    removeFilter(filterField)
  }

  return (
    <IconButton
      label={
        <React.Fragment>
          {label}: <strong>{values[0]}</strong>
        </React.Fragment>
      }
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
