/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { FixTypeLater } from '../../types/FixTypeLater'
import ColumnSortIndicator from '../DisplayHelpers/ColumnSortIndicator'
import Pagination from '../DisplayHelpers/Pagination'
import LoadingRow from '../DisplayHelpers/LoadingRow'
import { employeeTableColumns } from './taskLogEntryTableColumns'
import { TaskLogEntry } from '../../types/TaskLogEntry'

interface IProps {
  data: TaskLogEntry[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
}

const DefaultColumnFilter = ({
  column: { filterValue, setFilter }
}: FixTypeLater): JSX.Element => {
  return (
    <input
      className="form-control form-control-sm"
      value={filterValue || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search${/*count*/ ''}...`}
    />
  )
}

const TaskLogEntryTable = (props: IProps): JSX.Element => {
  const { data, fetchData, loading, controlledPageCount, recordCount } = props

  const defaultColumn = React.useMemo(
    () => ({ Filter: DefaultColumnFilter }),
    []
  )
  const columns = React.useMemo(employeeTableColumns, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy }
  }: FixTypeLater = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 20 } as FixTypeLater,
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      manualFilters: true,
      defaultCanFilter: true,
      autoResetSortBy: false,
      autoResetFilters: false
    } as FixTypeLater,
    useSortBy,
    usePagination
  )

  React.useEffect(() => {
    fetchData({ pageIndex, sortBy })
  }, [fetchData, pageIndex, sortBy])

  return (
    <>
      <table className="table table-sm table-striped mt-3" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: FixTypeLater) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: FixTypeLater) => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    <ColumnSortIndicator column={column} />
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: FixTypeLater) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: FixTypeLater) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <LoadingRow
            loading={loading}
            pageIndex={pageIndex}
            pageSize={pageSize}
            recordCount={recordCount}
          />
        </tfoot>
      </table>
      <Pagination
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </>
  )
}

export default TaskLogEntryTable
