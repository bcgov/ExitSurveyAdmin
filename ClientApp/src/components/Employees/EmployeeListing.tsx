import React from 'react'
import { Employee, IEmployeeJSON } from '../../types/Employee'
import { Link } from 'react-router-dom'
import Date from '../DisplayHelpers/Date'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'

interface IOwnProps {}

interface IStateProps {}

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
            <th>Leave reason</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>
                <Link to={`/employees/${employee.id}`}>{employee.id}</Link>
              </td>
              <td>
                <Link to={`/employees/${employee.id}`}>
                  {employee.firstName}
                </Link>
              </td>
              <td>
                <Link to={`/employees/${employee.id}`}>
                  {employee.lastName}
                </Link>
              </td>
              <td>{employee.reason}</td>
              <td>{employee.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render(): JSX.Element {
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
    await requestJSONWithErrorHandler(
      `api/employees`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: IEmployeeJSON[]): void =>
        this.setState({ employees: Employee.deserializeArray(responseJSON) })
    )
  }
}

export default EmployeeListing
