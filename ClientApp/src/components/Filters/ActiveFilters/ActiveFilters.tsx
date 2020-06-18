import React from 'react'

import ActiveFilterButton from './ActiveFilterButton'

import './ActiveFilters.scss'
import ***REMOVED*** IFilter ***REMOVED*** from '../FilterClasses/FilterTypes'

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
      ***REMOVED***/* <h3 className="text-muted mb-0">Active filters</h3> */***REMOVED***
      <div className="Filters mb-0">***REMOVED***filterButtons***REMOVED***</div>
    </div>
  )
***REMOVED***

export default ActiveFilters
