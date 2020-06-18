import React from 'react'

import { IFilter } from '../FilterClasses/FilterTypes'
import ActiveFilterButton from './ActiveFilterButton'

import './ActiveFilters.scss'

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
      <div className="Filters mb-0">{filterButtons}</div>
    </div>
  )
}

export default ActiveFilters
