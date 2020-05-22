import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'
import ***REMOVED*** IFilter ***REMOVED*** from '../../Employees/EmployeeListing'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

interface IProps ***REMOVED***
  filters: IFilter[]
  removeFilter: (filter: IFilter) => void
***REMOVED***

const sort = (a: IFilter, b: IFilter): number => ***REMOVED***
  const aLabel = employeeFieldLabels[a.id]
  const bLabel = employeeFieldLabels[b.id]

  return aLabel.localeCompare(bLabel)
***REMOVED***

const ActiveFilters = (props: IProps): JSX.Element => ***REMOVED***
  const filterButtons = props.filters
    .sort(sort)
    .map(f => (
      <ActiveFilterButton
        key=***REMOVED***f.id***REMOVED***
        filter=***REMOVED***f.id***REMOVED***
        value=***REMOVED***f.value***REMOVED***
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
