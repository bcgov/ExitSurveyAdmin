import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'
import { IFilter } from '../../Employees/EmployeeListing'

interface IProps {
  filters: IFilter[]
}

const ActiveFilters = (props: IProps): JSX.Element => {
  const filterButtons = props.filters.map(f => (
    <ActiveFilterButton key={f.id} filter={f.id} value={f.value} />
  ))

  return (
    <div className="ActiveFilters">
      {/* <h3 className="text-muted mb-0">Active filters</h3> */}
      <div className="Filters mb-0">{filterButtons}</div>
    </div>
  )
}

export default ActiveFilters
