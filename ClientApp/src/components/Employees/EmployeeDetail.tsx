import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** RouteComponentProps ***REMOVED*** from 'react-router-dom'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'

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
    this.populateData(this.props.match.params.employeeId)
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
      <ContentWrapper>
        <h3 id="tabelLabel" className="text-muted">
          Employee
        </h3>
        ***REMOVED***contents***REMOVED***
      </ContentWrapper>
    )
***REMOVED***

  async populateData(employeeId: string): Promise<void> ***REMOVED***
    await requestJSONWithErrorHandler(
      `api/employees/$***REMOVED***employeeId***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: any): void => this.setState(***REMOVED*** employee: responseJSON ***REMOVED***)
    )
***REMOVED***
***REMOVED***

export default EmployeeDetail
