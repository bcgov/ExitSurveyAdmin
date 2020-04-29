import React from 'react'
import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import Date from '../DisplayHelpers/Date'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'

interface IOwnProps ***REMOVED******REMOVED***

interface IStateProps ***REMOVED******REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  employees?: Employee[]
***REMOVED***

class EmployeeListing extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)
    this.state = ***REMOVED*** employees: undefined ***REMOVED***
***REMOVED***

  componentDidMount(): void ***REMOVED***
    this.populateData()
***REMOVED***

  static renderEmployeesTable(employees: Employee[]): JSX.Element ***REMOVED***
    console.log(employees)
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Telkey</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Classification</th>
            <th>Leave date</th>
            <th>Leave reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ***REMOVED***employees.map(employee => (
            <tr key=***REMOVED***employee.id***REMOVED***>
              <td>***REMOVED***employee.telkey***REMOVED***</td>
              <td>
                <Link to=***REMOVED***`/employees/$***REMOVED***employee.id***REMOVED***`***REMOVED***>
                  ***REMOVED***employee.firstName***REMOVED***
                </Link>
              </td>
              <td>
                <Link to=***REMOVED***`/employees/$***REMOVED***employee.id***REMOVED***`***REMOVED***>
                  ***REMOVED***employee.lastName***REMOVED***
                </Link>
              </td>
              <td>***REMOVED***employee.governmentEmail***REMOVED***</td>
              <td>***REMOVED***employee.classification***REMOVED***</td>
              <td>
                <Date date=***REMOVED***employee.effectiveDate***REMOVED*** />
              </td>
              <td>***REMOVED***employee.reason***REMOVED***</td>
              <td>***REMOVED***employee.currentEmployeeStatusCode***REMOVED***</td>
            </tr>
          ))***REMOVED***
        </tbody>
      </table>
    )
***REMOVED***

  render(): JSX.Element ***REMOVED***
    const contents =
      this.state.employees === undefined ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        EmployeeListing.renderEmployeesTable(this.state.employees)
      )

    return (
      <div>
        <h1 id="tabelLabel">Employees</h1>
        ***REMOVED***contents***REMOVED***
      </div>
    )
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    await requestJSONWithErrorHandler(
      `api/employees`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: IEmployeeJSON[]): void =>
        this.setState(***REMOVED*** employees: Employee.deserializeArray(responseJSON) ***REMOVED***)
    )
***REMOVED***
***REMOVED***

export default EmployeeListing
