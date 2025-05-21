import { type JSX } from 'react'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'

export interface IColumn {
  isSorted?: boolean
  isSortedDesc?: boolean
}

interface Props {
  column: IColumn
}

const ColumnSortIndicator = (props: Props): JSX.Element => {
  const { column } = props
  let sortIcon = null;
  if (column.isSorted) {
    sortIcon = column.isSortedDesc ? (
      <FAIcon name="caret-up" marginClasses="ms-1" />
    ) : (
      <FAIcon name="caret-down" marginClasses="ms-1" />
    );
  }

  return (
    <span>
      {sortIcon}
    </span>
  )
}

export default ColumnSortIndicator
