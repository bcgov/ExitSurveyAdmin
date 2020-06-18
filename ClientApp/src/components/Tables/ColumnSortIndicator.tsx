import React from 'react'

export interface IColumn {
  isSorted?: boolean
  isSortedDesc?: boolean
}

interface IProps {
  column: IColumn
}

const ColumnSortIndicator = (props: IProps): JSX.Element => {
  const { column } = props
  return (
    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
  )
}

export default ColumnSortIndicator
