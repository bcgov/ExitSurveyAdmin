import React from 'react'
import { AdminUser } from '../../types/AdminUser'

interface IProps {}

interface IState {
  adminUsers: AdminUser[]
}

export class AdminUserListing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { adminUsers: [] }
  }

  componentDidMount(): void {
    this.populateData()
  }

  static renderEmployeesTable(adminUsers: AdminUser[]): JSX.Element {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map(
            (adminUser: AdminUser): JSX.Element => (
              <tr key={adminUser.id}>
                <td>{adminUser.id}</td>
                <td>{adminUser.name}</td>
                <td>{adminUser.email}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    )
  }

  render(): JSX.Element {
    const contents =
      this.state.adminUsers.length === 0 ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        AdminUserListing.renderEmployeesTable(this.state.adminUsers)
      )

    return (
      <div>
        <h1 id="tabelLabel">Admin users</h1>
        {contents}
      </div>
    )
  }

  async populateData(): Promise<void> {
    const response = await fetch('api/AdminUsers')
    const data = await response.json()
    this.setState({ adminUsers: data })
  }
}
