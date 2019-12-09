import React from 'react'

interface IProps {}

interface IState {
  employees: any[]
}

export class EmployeeListing extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { employees: [] }
  }

  componentDidMount(): void {
    this.populateData()
  }

  static renderEmployeesTable(employees): JSX.Element {
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
    const contents =
      this.state.employees.length === 0 ? (
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

  async populateData(): Promise<any> {
    const response = await fetch('api/employees')
    const data = await response.json()
    this.setState({ employees: data })
  }
}
