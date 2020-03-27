import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'

interface IProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  employees?: Employee[]
***REMOVED***

export class EmployeeListing extends React.Component<IProps, IState> ***REMOVED***
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
              <td>***REMOVED***employee.id***REMOVED***</td>
              <td>***REMOVED***employee.firstName***REMOVED***</td>
              <td>***REMOVED***employee.lastName***REMOVED***</td>
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
