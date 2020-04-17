import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'

import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
// import Login from '../Login/Login'

interface IOwnProps ***REMOVED******REMOVED***

interface IStateProps ***REMOVED***
  user: any
***REMOVED***

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
    const user = this.props.user
    console.log(`--> $***REMOVED***user***REMOVED***`)

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

const mapStateToProps = (state: any): IStateProps => ***REMOVED***
  console.log('--> state', state)
  if (state && state.oidc && state.oidc.user) ***REMOVED***
    return ***REMOVED*** user: state.oidc.user ***REMOVED***
***REMOVED*** else ***REMOVED***
    return ***REMOVED*** user: undefined ***REMOVED***
***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(EmployeeListing)
