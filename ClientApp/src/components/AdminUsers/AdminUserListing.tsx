import React from 'react'
import ***REMOVED*** AdminUser ***REMOVED*** from '../../types/AdminUser'

interface IProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  adminUsers: AdminUser[]
***REMOVED***

export class AdminUserListing extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)
    this.state = ***REMOVED*** adminUsers: [] ***REMOVED***
***REMOVED***

  componentDidMount(): void ***REMOVED***
    this.populateData()
***REMOVED***

  static renderEmployeesTable(adminUsers: AdminUser[]): JSX.Element ***REMOVED***
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
          ***REMOVED***adminUsers.map(
            (adminUser: AdminUser): JSX.Element => (
              <tr key=***REMOVED***adminUser.id***REMOVED***>
                <td>***REMOVED***adminUser.id***REMOVED***</td>
                <td>***REMOVED***adminUser.firstName***REMOVED***</td>
                <td>***REMOVED***adminUser.lastName***REMOVED***</td>
                <td>***REMOVED***adminUser.email***REMOVED***</td>
              </tr>
            )
          )***REMOVED***
        </tbody>
      </table>
    )
***REMOVED***

  render(): JSX.Element ***REMOVED***
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
        ***REMOVED***contents***REMOVED***
      </div>
    )
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    const response = await fetch('api/AdminUsers')
    const data = await response.json()
    this.setState(***REMOVED*** adminUsers: data ***REMOVED***)
***REMOVED***
***REMOVED***
