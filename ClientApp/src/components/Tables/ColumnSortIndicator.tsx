import ***REMOVED*** type JSX ***REMOVED*** from 'react'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'
import ***REMOVED*** Column ***REMOVED*** from '@tanstack/react-table'

interface Props<T extends object> ***REMOVED***
  column: Column<T, unknown>
***REMOVED***

const ColumnSortIndicator = <T extends object>(***REMOVED*** column ***REMOVED***: Props<T>): JSX.Element => ***REMOVED***
  let sortIcon = null
  if (column.getIsSorted()) ***REMOVED***
    sortIcon = column.getIsSorted() === 'desc' ? (
      <FAIcon name="caret-up" marginClasses="ms-1" />
    ) : (
      <FAIcon name="caret-down" marginClasses="ms-1" />
    )
***REMOVED***
  return <span>***REMOVED***sortIcon***REMOVED***</span>
***REMOVED***

export default ColumnSortIndicator
