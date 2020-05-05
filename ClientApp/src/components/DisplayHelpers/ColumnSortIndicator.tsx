import React from 'react'

export interface IColumn ***REMOVED***
  isSorted?: boolean
  isSortedDesc?: boolean
***REMOVED***

interface IProps ***REMOVED***
  column: IColumn
***REMOVED***

const ColumnSortIndicator = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** column ***REMOVED*** = props
  return (
    <span>***REMOVED***column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''***REMOVED***</span>
  )
***REMOVED***

export default ColumnSortIndicator
