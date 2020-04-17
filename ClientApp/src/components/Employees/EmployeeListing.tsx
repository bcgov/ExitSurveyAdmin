import React from 'react'
import { Employee } from '../../types/Employee'

import { connect } from 'react-redux'
// import Login from '../Login/Login'

interface IOwnProps {}

interface IStateProps {
  user: any
}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

interface IState {
  employees?: Employee[]
}

class EmployeeListing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { employees: undefined }
  }

  componentDidMount(): void {
    this.populateData()
  }

  static renderEmployeesTable(employees: Employee[]): JSX.Element {
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
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>
                {new Date(employee.birthDate).toLocaleDateString('en-CA', {
                  timeZone: 'UTC'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render(): JSX.Element {
    const user = this.props.user
    console.log(`--> ${user}`)

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
        {contents}
      </div>
    )
  }

  async populateData(): Promise<void> {
    const response = await fetch('api/employees')
    const data = await response.json()
    this.setState({ employees: data })
  }
}

const mapStateToProps = (state: any): IStateProps => {
  console.log('--> state', state)
  if (state && state.oidc && state.oidc.user) {
    return { user: state.oidc.user }
  } else {
    return { user: undefined }
  }
}

export default connect(mapStateToProps)(EmployeeListing)
