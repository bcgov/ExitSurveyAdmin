import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** RouteComponentProps ***REMOVED*** from 'react-router-dom'

interface IParams ***REMOVED***
  employeeId: string
***REMOVED***

interface IOwnProps extends RouteComponentProps<IParams> ***REMOVED******REMOVED***

interface IStateProps ***REMOVED******REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  employee?: Employee
***REMOVED***

class EmployeeDetail extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)
    this.state = ***REMOVED*** employee: undefined ***REMOVED***

    this.populateData = this.populateData.bind(this)
***REMOVED***

  componentDidMount(): void ***REMOVED***
    this.populateData()
***REMOVED***

  static renderEmployee(employee: Employee): JSX.Element ***REMOVED***
    return (
      <h2>
        ***REMOVED***employee.firstName***REMOVED*** ***REMOVED***employee.lastName***REMOVED***
      </h2>
    )
***REMOVED***

  render(): JSX.Element ***REMOVED***
    const contents =
      this.state.employee === undefined ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        EmployeeDetail.renderEmployee(this.state.employee)
      )

    return (
      <div>
        <h3 id="tabelLabel" className="text-muted">
          Employee
        </h3>
        ***REMOVED***contents***REMOVED***
      </div>
    )
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    const response = await fetch(
      `api/employees/$***REMOVED***this.props.match.params.employeeId***REMOVED***`
    )
    const data = await response.json()
    this.setState(***REMOVED*** employee: data ***REMOVED***)
***REMOVED***
***REMOVED***

export default EmployeeDetail
