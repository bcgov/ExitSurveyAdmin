import React from 'react'
import { Employee, IEmployeeJSON } from '../../types/Employee'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

interface IState {
  employees?: Employee[]
}

const processSorts = (sortBy: any) => {
  return sortBy.length
    ? `&sorts=${sortBy
        .map((s: any) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',')}`
    : ''
}

const EmployeeListing = (props: any): JSX.Element => {
  // We'll start our table without any data
  const [data, setData] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [recordCount, setRecordCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    console.log('sortBy', sortBy)
    // console.log('filters', filters)

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    const sorts = processSorts(sortBy)

    // Set the loading state
    // setLoading(true)

    if (fetchId === fetchIdRef.current) {
      requestJSONWithErrorHandler(
        `api/employees?page=${pageIndex + 1}${sorts}`,
        'get',
        null,
        'EMPLOYEE_NOT_FOUND',
        (responseJSON: IEmployeeJSON[], pagination: any): void => {
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

// render(): JSX.Element {
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
//       {contents}
//     </div>
//   )
// }

// async populateData(): Promise<void> {
//   await requestJSONWithErrorHandler(
//     `api/employees`,
//     'get',
//     null,
//     'EMPLOYEE_NOT_FOUND',
//     (responseJSON: IEmployeeJSON[]): void =>
//       this.setState({ employees: Employee.deserializeArray(responseJSON) })
//   )
// }

export default EmployeeListing
