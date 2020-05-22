import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'
import { IFilter } from '../../Employees/EmployeeListing'
import { employeeFieldLabels } from '../../../types/Employee'

interface IProps {
  filters: IFilter[]
  removeFilter: (filter: IFilter) => void
}

const sort = (a: IFilter, b: IFilter): number => {
  const aLabel = employeeFieldLabels[a.id]
  const bLabel = employeeFieldLabels[b.id]

  return aLabel.localeCompare(bLabel)
}

const ActiveFilters = (props: IProps): JSX.Element => {
  const filterButtons = props.filters
    .sort(sort)
    .map(f => (
      <ActiveFilterButton
        key={f.id}
        filter={f.id}
        value={f.value}
        removeFilter={props.removeFilter}
      />
    ))

  return (
    <div className="ActiveFilters">
      {/* <h3 className="text-muted mb-0">Active filters</h3> */}
      <div className="Filters mb-0">{filterButtons}</div>
    </div>
  )
}

export default ActiveFilters
