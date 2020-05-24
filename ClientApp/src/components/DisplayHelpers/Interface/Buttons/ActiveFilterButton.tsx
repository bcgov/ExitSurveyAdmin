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
  const remove = (): void => ***REMOVED***
    removeFilter(filterField)
***REMOVED***

  const ***REMOVED*** fieldName, values, type ***REMOVED*** = filterField
  const displayLabel = employeeFieldLabels[fieldName]
  let valueString = values[0]

  if (type === 'date') ***REMOVED***
    if (values[0].length > 0 && values[1].length > 0) ***REMOVED***
      valueString = `Between $***REMOVED***values[0]***REMOVED*** and $***REMOVED***values[1]***REMOVED***`
  ***REMOVED*** else if (values[0].length > 0) ***REMOVED***
      valueString = `From $***REMOVED***values[0]***REMOVED***`
  ***REMOVED*** else ***REMOVED***
      valueString = `Before $***REMOVED***values[1]***REMOVED***`
  ***REMOVED***
***REMOVED***

  const label = (
    <>
      ***REMOVED***displayLabel***REMOVED***: <strong>***REMOVED***valueString***REMOVED***</strong>
    </>
  )

  return (
    <IconButton
      label=***REMOVED***label***REMOVED***
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
