import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'
import { employeeFieldLabels } from '../../../helpers/labelHelper'
import { IFilterField } from './FilterTypes'

interface IProps {
  filters: IFilterField[]
  removeFilter: (filter: IFilterField) => void
}

const sort = (a: IFilterField, b: IFilterField): number => {
  const aLabel = employeeFieldLabels[a.fieldName]
  const bLabel = employeeFieldLabels[b.fieldName]

  return aLabel.localeCompare(bLabel)
}

const ActiveFilters = (props: IProps): JSX.Element => {
  const filterButtons = props.filters
    .sort(sort)
    .filter(f => f.values.length > 0)
    .map(f => (
      <ActiveFilterButton
        key={f.fieldName}
        filterField={f}
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
