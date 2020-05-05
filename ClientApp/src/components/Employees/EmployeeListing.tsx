import React from 'react'
import { Employee, IEmployeeJSON } from '../../types/Employee'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import { FixTypeLater } from '../../types/FixTypeLater'
import { CSVLink } from 'react-csv'

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
  const [sortsQs, setSortsQs] = React.useState<string>('')
  const [filtersQs, setFiltersQs] = React.useState<string>('')
  const [downloadedData, setDownloadedData] = React.useState<Employee[]>([])
  const fetchIdRef = React.useRef<number>(0)
  const csvLinkRef = React.useRef(null)

  // Called when the table needs new data
  const fetchData = React.useCallback(({ pageIndex, sortBy, filters }) => {
    console.log('filters', filters)

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Get the sorts argument for the server
    const sortsQsTmp = processSorts(sortBy)
    const filtersQsTmp = processFilters(filters)

    // console.log(filterQs)

    // Set the loading state
    setLoading(true)

    if (fetchId === fetchIdRef.current) {
      requestJSONWithErrorHandler(
        `api/employees?page=${pageIndex + 1}${sortsQsTmp}${filtersQsTmp}`,
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
          setSortsQs(sortsQsTmp)
          setFiltersQs(filtersQsTmp)
        }
      )
    }
  }, [])

  const downloadData = (): void => {
    requestJSONWithErrorHandler(
      `api/employees?pageSize=${100000}${sortsQs}${filtersQs}`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: IEmployeeJSON[]): void => {
        console.log(responseJSON)
        setDownloadedData(Employee.deserializeArray(responseJSON))
        ;(csvLinkRef.current as FixTypeLater).link.click()
      }
    )
  }

  return (
    <>
      <EmployeeTable
        data={data}
        fetchData={fetchData}
        loading={loading}
        controlledPageCount={pageCount}
        recordCount={recordCount}
      />
      <div>
        <button className="btn btn-primary mt-2" onClick={downloadData}>
          Export data
        </button>
        <CSVLink
          data={downloadedData}
          filename="ExitSurveyAdminData.csv"
          className="hidden"
          ref={csvLinkRef}
          target="_blank"
        />
      </div>
    </>
  )
}

export default EmployeeListing
