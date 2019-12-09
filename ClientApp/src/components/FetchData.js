import React, ***REMOVED*** Component ***REMOVED*** from "react";

export class FetchData extends Component ***REMOVED***
  static displayName = FetchData.name;

  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED*** employees: [], loading: true ***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    this.populateEmployeeData();
***REMOVED***

  static renderEmployeesTable(employees) ***REMOVED***
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
                ***REMOVED***new Date(employee.birthDate).toLocaleDateString("en-CA", ***REMOVED***
                  timeZone: "UTC"
              ***REMOVED***)***REMOVED***
              </td>
            </tr>
          ))***REMOVED***
        </tbody>
      </table>
    );
***REMOVED***

  render() ***REMOVED***
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderEmployeesTable(this.state.employees)
    );

    return (
      <div>
        <h1 id="tabelLabel">Employees</h1>
        <p>This component demonstrates fetching data from the server.</p>
        ***REMOVED***contents***REMOVED***
      </div>
    );
***REMOVED***

  async populateEmployeeData() ***REMOVED***
    const response = await fetch("api/employees");
    const data = await response.json();
    console.log(data);
    this.setState(***REMOVED*** employees: data, loading: false ***REMOVED***);
***REMOVED***
***REMOVED***
