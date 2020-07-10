import React from 'react'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'

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
    <span>
      {column.isSorted ? (
        column.isSortedDesc ? (
          <FAIcon name="caret-up" marginClasses="ml-1" />
        ) : (
          <FAIcon name="caret-down" marginClasses="ml-1" />
        )
      ) : (
        ''
      )}
    </span>
  )
}

export default ColumnSortIndicator
