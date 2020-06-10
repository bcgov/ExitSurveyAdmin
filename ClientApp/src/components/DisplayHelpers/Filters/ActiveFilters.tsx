import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../helpers/labelHelper'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'

interface IProps ***REMOVED***
  filters: IFilterField[]
  removeFilter: (filter: IFilterField) => void
***REMOVED***

const sort = (a: IFilterField, b: IFilterField): number => ***REMOVED***
  const aLabel = employeeFieldLabels[a.fieldName]
  const bLabel = employeeFieldLabels[b.fieldName]

  return aLabel.localeCompare(bLabel)
***REMOVED***

const ActiveFilters = (props: IProps): JSX.Element => ***REMOVED***
  const filterButtons = props.filters
    .sort(sort)
    .filter(f => f.values.length > 0)
    .map(f => (
      <ActiveFilterButton
        key=***REMOVED***f.fieldName***REMOVED***
        filterField=***REMOVED***f***REMOVED***
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
