import React from 'react'
import { Employee, IEmployeeJSON } from '../../types/Employee'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import { FixTypeLater } from '../../types/FixTypeLater'

// Maps the sortBy array produced by the react-table to a string that can be
// used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
// a desc sort. If the sortBy array is empty, return the empty string.
const processSorts = (sortBy: FixTypeLater): string => {
  return sortBy.length
    ? `&sorts=${sortBy
        .map((s: FixTypeLater) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',')}`
    : ''
}

const processFilters = (filters: FixTypeLater): string => {
  return filters.length
    ? `&filters=${filters
        .map((f: FixTypeLater) => `${f.id}@=${f.value}`)
        .join(',')}`
    : ''
}

const EmployeeListing = (): JSX.Element => {
  // Set up the table with no data to start
  const [data, setData] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const fetchIdRef = React.useRef<number>(0)

  // Called when the table needs new data
  const fetchData = React.useCallback(({ pageIndex, sortBy, filters }) => {
    // console.log('filters', filters)

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Get the sorts argument for the server
    const sorts = processSorts(sortBy)
    const filterQs = processFilters(filters)

    // console.log(filterQs)

    // Set the loading state
    setLoading(true)

    if (fetchId === fetchIdRef.current) {
      requestJSONWithErrorHandler(
        `api/employees?page=${pageIndex + 1}${sorts}${filterQs}`,
        'get',
        null,
        'EMPLOYEE_NOT_FOUND',
        (responseJSON: IEmployeeJSON[], pagination: FixTypeLater): void => {
          const pageCount = pagination.PageCount
          const recordCount = pagination.RecordCount

          setData(Employee.deserializeArray(responseJSON))
          setPageCount(pageCount)
          setRecordCount(recordCount)
          setLoading(false)
        }
      )
    }
  }, [])

  return (
    <EmployeeTable
      data={data}
      fetchData={fetchData}
      loading={loading}
      controlledPageCount={pageCount}
      recordCount={recordCount}
    />
  )
}

export default EmployeeListing
