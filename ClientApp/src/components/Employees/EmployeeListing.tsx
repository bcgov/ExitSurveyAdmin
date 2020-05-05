import React from 'react'
import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** CSVLink ***REMOVED*** from 'react-csv'

// Maps the sortBy array produced by the react-table to a string that can be
// used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
// a desc sort. If the sortBy array is empty, return the empty string.
const processSorts = (sortBy: FixTypeLater): string => ***REMOVED***
  return sortBy.length
    ? `&sorts=$***REMOVED***sortBy
        .map((s: FixTypeLater) => `$***REMOVED***s.desc ? '-' : ''***REMOVED***$***REMOVED***s.id***REMOVED***`)
        .join(',')***REMOVED***`
    : ''
***REMOVED***

const processFilters = (filters: FixTypeLater): string => ***REMOVED***
  return filters.length
    ? `&filters=$***REMOVED***filters
        .map((f: FixTypeLater) => `$***REMOVED***f.id***REMOVED***@=$***REMOVED***f.value***REMOVED***`)
        .join(',')***REMOVED***`
    : ''
***REMOVED***

const EmployeeListing = (): JSX.Element => ***REMOVED***
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
  const fetchData = React.useCallback((***REMOVED*** pageIndex, sortBy, filters ***REMOVED***) => ***REMOVED***
    console.log('filters', filters)

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Get the sorts argument for the server
    const sortsQsTmp = processSorts(sortBy)
    const filtersQsTmp = processFilters(filters)

    // console.log(filterQs)

    // Set the loading state
    setLoading(true)

    if (fetchId === fetchIdRef.current) ***REMOVED***
      requestJSONWithErrorHandler(
        `api/employees?page=$***REMOVED***pageIndex + 1***REMOVED***$***REMOVED***sortsQsTmp***REMOVED***$***REMOVED***filtersQsTmp***REMOVED***`,
        'get',
        null,
        'EMPLOYEE_NOT_FOUND',
        (responseJSON: IEmployeeJSON[], pagination: FixTypeLater): void => ***REMOVED***
          const pageCount = pagination.PageCount
          const recordCount = pagination.RecordCount

          setData(Employee.deserializeArray(responseJSON))
          setPageCount(pageCount)
          setRecordCount(recordCount)
          setLoading(false)
          setSortsQs(sortsQsTmp)
          setFiltersQs(filtersQsTmp)
      ***REMOVED***
      )
  ***REMOVED***
***REMOVED*** [])

  const downloadData = (): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/employees?pageSize=$***REMOVED***100000***REMOVED***$***REMOVED***sortsQs***REMOVED***$***REMOVED***filtersQs***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: IEmployeeJSON[]): void => ***REMOVED***
        console.log(responseJSON)
        setDownloadedData(Employee.deserializeArray(responseJSON))
        ;(csvLinkRef.current as FixTypeLater).link.click()
    ***REMOVED***
    )
***REMOVED***

  return (
    <>
      <EmployeeTable
        data=***REMOVED***data***REMOVED***
        fetchData=***REMOVED***fetchData***REMOVED***
        loading=***REMOVED***loading***REMOVED***
        controlledPageCount=***REMOVED***pageCount***REMOVED***
        recordCount=***REMOVED***recordCount***REMOVED***
      />
      <div>
        <button className="btn btn-primary mt-2" onClick=***REMOVED***downloadData***REMOVED***>
          Export data
        </button>
        <CSVLink
          data=***REMOVED***downloadedData***REMOVED***
          filename="ExitSurveyAdminData.csv"
          className="hidden"
          ref=***REMOVED***csvLinkRef***REMOVED***
          target="_blank"
        />
      </div>
    </>
  )
***REMOVED***

export default EmployeeListing
