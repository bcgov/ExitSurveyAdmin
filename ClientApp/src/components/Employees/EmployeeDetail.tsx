import React from 'react'
import { Employee } from '../../types/Employee'
import { RouteComponentProps } from 'react-router-dom'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'

interface IParams {
  employeeId: string
}

interface IOwnProps extends RouteComponentProps<IParams> {}

interface IStateProps {}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

interface IState {
  employee?: Employee
}

class EmployeeDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { employee: undefined }

    this.populateData = this.populateData.bind(this)
  }

  componentDidMount(): void {
    this.populateData(this.props.match.params.employeeId)
  }

  static renderEmployee(employee: Employee): JSX.Element {
    return (
      <h2>
        {employee.firstName} {employee.lastName}
      </h2>
    )
  }

  render(): JSX.Element {
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
        {contents}
      </ContentWrapper>
    )
  }

  async populateData(employeeId: string): Promise<void> {
    await requestJSONWithErrorHandler(
      `api/employees/${employeeId}`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: any): void => this.setState({ employee: responseJSON })
    )
  }
}

export default EmployeeDetail
