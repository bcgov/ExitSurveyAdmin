import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'

import ***REMOVED*** Filter ***REMOVED*** from '../FilterClasses/FilterTypes'
import ActiveFilterButton from './ActiveFilterButton'

import './ActiveFilters.scss'

interface Props ***REMOVED***
  filters: Filter[]
  removeFilter: (filter: Filter) => void
***REMOVED***

const sort = (a: Filter, b: Filter): number => ***REMOVED***
  const aLabel = a.fieldName
  const bLabel = b.fieldName

  return aLabel.localeCompare(bLabel)
***REMOVED***

const ActiveFilters = (props: Props): JSX.Element => ***REMOVED***
  const filterButtons = props.filters
    .toSorted(sort)
    .filter((f) => f.isSet)
    .map((f) => (
      <ActiveFilterButton
        key=***REMOVED***f.fieldName***REMOVED***
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
