import React from 'react'

import ***REMOVED*** IFilter ***REMOVED*** from '../FilterClasses/FilterTypes'
import ActiveFilterButton from './ActiveFilterButton'

import './ActiveFilters.scss'

interface IProps ***REMOVED***
  filters: IFilter[]
  removeFilter: (filter: IFilter) => void
***REMOVED***

const sort = (a: IFilter, b: IFilter): number => ***REMOVED***
  const aLabel = a.fieldName
  const bLabel = b.fieldName

  return aLabel.localeCompare(bLabel)
***REMOVED***

const ActiveFilters = (props: IProps): JSX.Element => ***REMOVED***
  const filterButtons = props.filters
    .sort(sort)
    .filter(f => f.isSet)
    .map(f => (
      <ActiveFilterButton
        key=***REMOVED***`$***REMOVED***f.fieldName***REMOVED***$***REMOVED***Math.random()***REMOVED***`***REMOVED***
        filter=***REMOVED***f***REMOVED***
        removeFilter=***REMOVED***props.removeFilter***REMOVED***
      />
    ))

  return (
    <div className="ActiveFilters">
      <div className="Filters mb-0">***REMOVED***filterButtons***REMOVED***</div>
    </div>
  )
***REMOVED***

export default ActiveFilters
