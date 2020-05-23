import React from 'react'
import IconButton from './IconButton'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../../types/Employee'
import ***REMOVED*** IFilterField ***REMOVED*** from '../../Filters/FilterTypes'

interface IProps ***REMOVED***
  filterField: IFilterField
  removeFilter: (filter: IFilterField) => void
***REMOVED***

const ActiveFilterButton = (***REMOVED***
  filterField,
  removeFilter
***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** fieldName, values ***REMOVED*** = filterField
  const label = employeeFieldLabels[fieldName]

  const remove = (): void => ***REMOVED***
    removeFilter(filterField)
***REMOVED***

  return (
    <IconButton
      label=***REMOVED***
        <React.Fragment>
          ***REMOVED***label***REMOVED***: <strong>***REMOVED***values[0]***REMOVED***</strong>
        </React.Fragment>
    ***REMOVED***
      iconName="times"
      marginClasses="mr-1 my-1 mb-0"
      iconMarginClasses="ml-2"
      colorType="primary"
      iconRight
      size="sm"
      onClick=***REMOVED***remove***REMOVED***
    />
  )
***REMOVED***

export default ActiveFilterButton
