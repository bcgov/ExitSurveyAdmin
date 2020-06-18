/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import { Column, usePagination, useSortBy, useTable } from 'react-table'

import { FixTypeLater } from '../../types/FixTypeLater'
import ColumnSortIndicator from './ColumnSortIndicator'
import LoadingRow from './LoadingRow'
import Pagination from './Pagination'

interface IProps<T extends object> {
  data: T[]
  columns: () => Column<T>[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  controlledPageIndex: number
  recordCount: number
  pageSize: number
}

const GenericTable = <T extends object>(props: IProps<T>): JSX.Element => {
  const {
    columns: propColumns,
    controlledPageCount,
    controlledPageIndex,
    data,
    fetchData,
    loading,
    pageSize: propPageSize,
    recordCount
  } = props

  const columns = React.useMemo(propColumns, [propColumns])
  const initialPageSize = propPageSize

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

  React.useEffect(() => {
    if (controlledPageIndex !== pageIndex) {
      gotoPage(controlledPageIndex)
    }
    // Intentionally only looking at controlledPageIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledPageIndex])

  return (
    <>
      <Pagination
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
      <table className="table table-sm table-striped" {...getTableProps()}>
        <thead>
          <LoadingRow
            loading={loading}
            pageIndex={pageIndex}
            pageSize={pageSize}
            recordCount={recordCount}
          />
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
