import React, ***REMOVED*** Component ***REMOVED*** from "react";

export class AdminUserListing extends Component ***REMOVED***
  static displayName = AdminUserListing.name;

  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED*** adminUsers: [], loading: true ***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    this.populateData();
***REMOVED***

  static renderEmployeesTable(adminUsers) ***REMOVED***
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ***REMOVED***adminUsers.map(adminUser => (
            <tr key=***REMOVED***adminUser.id***REMOVED***>
              <td>***REMOVED***adminUser.id***REMOVED***</td>
              <td>***REMOVED***adminUser.firstName***REMOVED***</td>
              <td>***REMOVED***adminUser.lastName***REMOVED***</td>
              <td>***REMOVED***adminUser.email***REMOVED***</td>
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
      AdminUserListing.renderEmployeesTable(this.state.adminUsers)
    );

    return (
      <div>
        <h1 id="tabelLabel">Admin users</h1>
        <p>This component demonstrates fetching data from the server.</p>
        ***REMOVED***contents***REMOVED***
      </div>
    );
***REMOVED***

  async populateData() ***REMOVED***
    const response = await fetch("api/AdminUsers");
    const data = await response.json();
    console.log(data);
    this.setState(***REMOVED*** adminUsers: data, loading: false ***REMOVED***);
***REMOVED***
***REMOVED***
