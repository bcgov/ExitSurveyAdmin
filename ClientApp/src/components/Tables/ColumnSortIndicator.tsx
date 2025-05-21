import { type JSX } from 'react'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'
import { Column } from '@tanstack/react-table'

interface Props<T extends object> {
  column: Column<T, unknown>
}

const ColumnSortIndicator = <T extends object>({ column }: Props<T>): JSX.Element => {
  let sortIcon = null
  if (column.getIsSorted()) {
    sortIcon = column.getIsSorted() === 'desc' ? (
      <FAIcon name="caret-up" marginClasses="ms-1" />
    ) : (
      <FAIcon name="caret-down" marginClasses="ms-1" />
    )
  }
  return <span>{sortIcon}</span>
}

export default ColumnSortIndicator
