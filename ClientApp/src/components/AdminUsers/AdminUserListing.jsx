import React, { Component } from "react";

export class AdminUserListing extends Component {
  static displayName = AdminUserListing.name;

  constructor(props) {
    super(props);
    this.state = { adminUsers: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  static renderEmployeesTable(adminUsers) {
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
          {adminUsers.map(adminUser => (
            <tr key={adminUser.id}>
              <td>{adminUser.id}</td>
              <td>{adminUser.firstName}</td>
              <td>{adminUser.lastName}</td>
              <td>{adminUser.email}</td>
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
      AdminUserListing.renderEmployeesTable(this.state.adminUsers)
    );

    return (
      <div>
        <h1 id="tabelLabel">Admin users</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateData() {
    const response = await fetch("api/AdminUsers");
    const data = await response.json();
    console.log(data);
    this.setState({ adminUsers: data, loading: false });
  }
}
