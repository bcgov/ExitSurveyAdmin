/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import { Column, usePagination, useSortBy, useTable } from 'react-table'
import { FixTypeLater } from '../../types/FixTypeLater'
import ColumnSortIndicator from '../DisplayHelpers/ColumnSortIndicator'
import Pagination from '../DisplayHelpers/Pagination'
import LoadingRow from '../DisplayHelpers/LoadingRow'

interface IProps<T extends object> {
  data: T[]
  columns: () => Column<T>[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
  pageSize?: number
}

const DEFAULT_PAGE_SIZE = 20

const GenericTable = <T extends object>(props: IProps<T>): JSX.Element => {
  const {
    data,
    fetchData,
    loading,
    controlledPageCount,
    recordCount,
    pageSize: propPageSize
  } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(props.columns, [])
  const initialPageSize = propPageSize || DEFAULT_PAGE_SIZE

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
      // defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: initialPageSize
      } as FixTypeLater,
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

export default GenericTable
