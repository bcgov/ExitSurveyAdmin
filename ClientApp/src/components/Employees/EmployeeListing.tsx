import React from 'react'
import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'

interface IOwnProps ***REMOVED******REMOVED***

interface IStateProps ***REMOVED******REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  employees?: Employee[]
***REMOVED***

const EmployeeListing = (props: any): JSX.Element => ***REMOVED***
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [recordCount, setRecordCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback((***REMOVED*** pageSize, pageIndex ***REMOVED***) => ***REMOVED***
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    if (fetchId === fetchIdRef.current) ***REMOVED***
      requestJSONWithErrorHandler(
        `api/employees?page=$***REMOVED***pageIndex + 1***REMOVED***`,
        'get',
        null,
        'EMPLOYEE_NOT_FOUND',
        (responseJSON: any, pagination: any): void => ***REMOVED***
          const pageCount = pagination.PageCount
          const startRow = pageSize * pageIndex
          const endRow = startRow + pageSize
          const recordCount = pagination.RecordCount
          setData(responseJSON)

          // Your server could send back total page count.
          // For now we'll just fake it, too
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

// render(): JSX.Element ***REMOVED***
//   const contents =
//     this.state.employees === undefined ? (
//       <p>
//         <em>Loading...</em>
//       </p>
//     ) : (
//       EmployeeListing.renderEmployeesTable(this.state.employees)
//     )

//   return (
//     <div>
//       <h1 id="tabelLabel">Employees</h1>
//       ***REMOVED***contents***REMOVED***
//     </div>
//   )
// ***REMOVED***

// async populateData(): Promise<void> ***REMOVED***
//   await requestJSONWithErrorHandler(
//     `api/employees`,
//     'get',
//     null,
//     'EMPLOYEE_NOT_FOUND',
//     (responseJSON: IEmployeeJSON[]): void =>
//       this.setState(***REMOVED*** employees: Employee.deserializeArray(responseJSON) ***REMOVED***)
//   )
// ***REMOVED***

export default EmployeeListing
