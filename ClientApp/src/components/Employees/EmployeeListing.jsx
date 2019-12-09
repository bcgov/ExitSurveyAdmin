import React, { Component } from "react";

export class EmployeeListing extends Component {
  static displayName = EmployeeListing.name;

  constructor(props) {
    super(props);
    this.state = { employees: [], loading: true };
  }

  componentDidMount() {
    this.populateEmployeeData();
  }

  static renderEmployeesTable(employees) {
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
                {new Date(employee.birthDate).toLocaleDateString("en-CA", {
                  timeZone: "UTC"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      EmployeeListing.renderEmployeesTable(this.state.employees)
    );

    return (
      <div>
        <h1 id="tabelLabel">Employees</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateEmployeeData() {
    const response = await fetch("api/employees");
    const data = await response.json();
    console.log(data);
    this.setState({ employees: data, loading: false });
  }
}
