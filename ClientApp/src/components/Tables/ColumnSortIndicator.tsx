import ***REMOVED*** type JSX ***REMOVED*** from 'react'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'

export interface IColumn ***REMOVED***
  isSorted?: boolean
  isSortedDesc?: boolean
***REMOVED***

interface Props ***REMOVED***
  column: IColumn
***REMOVED***

const ColumnSortIndicator = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED*** column ***REMOVED*** = props
  let sortIcon = null;
  if (column.isSorted) ***REMOVED***
    sortIcon = column.isSortedDesc ? (
      <FAIcon name="caret-up" marginClasses="ms-1" />
    ) : (
      <FAIcon name="caret-down" marginClasses="ms-1" />
    );
***REMOVED***

  return (
    <span>
      ***REMOVED***sortIcon***REMOVED***
    </span>
  )
***REMOVED***

export default ColumnSortIndicator
