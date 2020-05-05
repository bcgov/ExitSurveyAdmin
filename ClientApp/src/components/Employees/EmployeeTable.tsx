/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import { Employee } from '../../types/Employee'
import { useFilters, usePagination, useSortBy, useTable } from 'react-table'
import { FixTypeLater } from '../../types/FixTypeLater'
import ColumnSortIndicator from '../DisplayHelpers/ColumnSortIndicator'
import Pagination from '../DisplayHelpers/Pagination'
import LoadingRow from '../DisplayHelpers/LoadingRow'
import { employeeTableColumns } from './employeeTableColumns'

interface IProps {
  data: Employee[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
}

const EmployeeTable = (props: IProps): JSX.Element => {
  const { data, fetchData, loading, controlledPageCount, recordCount } = props

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
      initialState: { pageIndex: 0, pageSize: 20 } as FixTypeLater,
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      autoResetSortBy: false
    } as FixTypeLater,
    useSortBy,
    usePagination
  )

  React.useEffect(() => {
    fetchData({ pageIndex, sortBy })
  }, [fetchData, pageIndex, sortBy])

  return (
    <>
      <table className="table table-sm table-striped" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: FixTypeLater) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: FixTypeLater) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <ColumnSortIndicator column={column} />
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

export default EmployeeTable
