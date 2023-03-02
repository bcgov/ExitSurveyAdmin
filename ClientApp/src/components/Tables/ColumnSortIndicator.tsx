import React from 'react'
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
  return (
    <span>
      ***REMOVED***column.isSorted ? (
        column.isSortedDesc ? (
          <FAIcon name="caret-up" marginClasses="ml-1" />
        ) : (
          <FAIcon name="caret-down" marginClasses="ml-1" />
        )
      ) : (
        ''
      )***REMOVED***
    </span>
  )
***REMOVED***

export default ColumnSortIndicator
