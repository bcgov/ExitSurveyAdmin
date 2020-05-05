import React from 'react'

import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import ExportData from '../DisplayHelpers/ExportData'

/** Maps the sortBy array produced by the react-table to a string that can be
used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
a desc sort. If the sortBy array is empty, return the empty string. */
const processSorts = (sortBy: FixTypeLater): string => ***REMOVED***
  return sortBy.length
    ? `&sorts=$***REMOVED***sortBy
        .map((s: FixTypeLater) => `$***REMOVED***s.desc ? '-' : ''***REMOVED***$***REMOVED***s.id***REMOVED***`)
        .join(',')***REMOVED***`
    : ''
***REMOVED***

/** Maps the filters array produced by the react-table to a string that can be
used by the server API, of the kind &filters=Col1@=someString. The @=
operator means 'Col1 contains someString'. For a full list of operators see
the documentation for Sieve: https://github.com/Biarity/Sieve/#operators */
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
  const [sortQuery, setSortQuery] = React.useState<string>('')
  const [filterQuery, setFilterQuery] = React.useState<string>('')
  const fetchIdRef = React.useRef<number>(0)

  // Called when the table needs new data
  const fetchData = React.useCallback((***REMOVED*** pageIndex, sortBy, filters ***REMOVED***) => ***REMOVED***
    // Give this fetch an ID and set the loading state
    const fetchId = ++fetchIdRef.current
    setLoading(true)

    // Get the sort and filter querystrings for the server call
    setSortQuery(processSorts(sortBy))
    setFilterQuery(processFilters(filters))

    if (fetchId === fetchIdRef.current) ***REMOVED***
      requestJSONWithErrorHandler(
        `api/employees?page=$***REMOVED***pageIndex + 1***REMOVED***$***REMOVED***sortQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`,
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
      ***REMOVED***
      )
  ***REMOVED***
***REMOVED*** [])

  return (
    <>
      <EmployeeTable
        data=***REMOVED***data***REMOVED***
        fetchData=***REMOVED***fetchData***REMOVED***
        loading=***REMOVED***loading***REMOVED***
        controlledPageCount=***REMOVED***pageCount***REMOVED***
        recordCount=***REMOVED***recordCount***REMOVED***
      />
      <ExportData sortQuery=***REMOVED***sortQuery***REMOVED*** filterQuery=***REMOVED***filterQuery***REMOVED*** />
    </>
  )
***REMOVED***

export default EmployeeListing
