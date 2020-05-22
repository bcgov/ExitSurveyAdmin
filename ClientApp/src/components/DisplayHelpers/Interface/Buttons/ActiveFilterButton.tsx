import React from 'react'
import IconButton from './IconButton'
import { employeeFieldLabels } from '../../../../types/Employee'
import { IFilter } from '../../../Employees/EmployeeListing'

interface IProps {
  filter: string
  value: string
  removeFilter: (filter: IFilter) => void
}

const ActiveFilterButton = (props: IProps) => {
  const { filter, value } = props
  const label = employeeFieldLabels[filter]

  const remove = (): void => {
    props.removeFilter({ id: filter, value })
  }

  return (
    <IconButton
      label={
        <React.Fragment>
          {label}: <strong>{value}</strong>
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
