import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'

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
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Birth date</th>
          </tr>
        </thead>
        <tbody>
          ***REMOVED***employees.map(employee => (
            <tr key=***REMOVED***employee.id***REMOVED***>
              <td>
                <Link to=***REMOVED***`/employees/$***REMOVED***employee.id***REMOVED***`***REMOVED***>***REMOVED***employee.id***REMOVED***</Link>
              </td>
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
              <td>
                ***REMOVED***new Date(employee.birthDate).toLocaleDateString('en-CA', ***REMOVED***
                  timeZone: 'UTC'
              ***REMOVED***)***REMOVED***
              </td>
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
    const response = await fetch('api/employees')
    const data = await response.json()
    this.setState(***REMOVED*** employees: data ***REMOVED***)
***REMOVED***
***REMOVED***

export default EmployeeListing
