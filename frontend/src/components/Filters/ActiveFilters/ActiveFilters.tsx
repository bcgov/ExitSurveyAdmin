import React, { type JSX } from 'react'

import { Filter } from '../FilterClasses/FilterTypes'
import ActiveFilterButton from './ActiveFilterButton'

import './ActiveFilters.scss'

interface Props {
  filters: Filter[]
  removeFilter: (filter: Filter) => void
}

const sort = (a: Filter, b: Filter): number => {
  const aLabel = a.fieldName
  const bLabel = b.fieldName

  return aLabel.localeCompare(bLabel)
}

const ActiveFilters = (props: Props): JSX.Element => {
  const filterButtons = props.filters
    .toSorted(sort)
    .filter((f) => f.isSet)
    .map((f) => (
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
