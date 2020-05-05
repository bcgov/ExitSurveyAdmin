import React from 'react'
import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'

const processSorts = (sortBy: FixTypeLater): string => ***REMOVED***
  return sortBy.length
    ? `&sorts=$***REMOVED***sortBy
        .map((s: FixTypeLater) => `$***REMOVED***s.desc ? '-' : ''***REMOVED***$***REMOVED***s.id***REMOVED***`)
        .join(',')***REMOVED***`
    : ''
***REMOVED***

const EmployeeListing = (): JSX.Element => ***REMOVED***
  // Set up the table with no data to start
  const [data, setData] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const fetchIdRef = React.useRef<number>(0)

  // Called when the table needs new data
  const fetchData = React.useCallback((***REMOVED*** pageIndex, sortBy ***REMOVED***) => ***REMOVED***
    // console.log('filters', filters)

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Get the sorts argument for the server
    const sorts = processSorts(sortBy)

    // Set the loading state
    setLoading(true)

    if (fetchId === fetchIdRef.current) ***REMOVED***
      requestJSONWithErrorHandler(
        `api/employees?page=$***REMOVED***pageIndex + 1***REMOVED***$***REMOVED***sorts***REMOVED***`,
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
    <EmployeeTable
      data=***REMOVED***data***REMOVED***
      fetchData=***REMOVED***fetchData***REMOVED***
      loading=***REMOVED***loading***REMOVED***
      controlledPageCount=***REMOVED***pageCount***REMOVED***
      recordCount=***REMOVED***recordCount***REMOVED***
    />
  )
***REMOVED***

export default EmployeeListing
