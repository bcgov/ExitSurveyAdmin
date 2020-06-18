import React from 'react'

import ActiveFilterButton from './ActiveFilterButton'

import './ActiveFilters.scss'
import { IFilter } from '../FilterClasses/FilterTypes'

interface IProps {
  filters: IFilter[]
  removeFilter: (filter: IFilter) => void
}

const sort = (a: IFilter, b: IFilter): number => {
  const aLabel = a.fieldName
  const bLabel = b.fieldName

  return aLabel.localeCompare(bLabel)
}

const ActiveFilters = (props: IProps): JSX.Element => {
  const filterButtons = props.filters
    .sort(sort)
    .filter(f => f.isSet)
    .map(f => (
      <ActiveFilterButton
        key={`${f.fieldName}${Math.random()}`}
        filter={f}
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
