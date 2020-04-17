import React from 'react'
import { Employee } from '../../types/Employee'
import { RouteComponentProps } from 'react-router-dom'

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
    this.populateData()
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
      <div>
        <h3 id="tabelLabel" className="text-muted">
          Employee
        </h3>
        {contents}
      </div>
    )
  }

  async populateData(): Promise<void> {
    const response = await fetch(
      `api/employees/${this.props.match.params.employeeId}`
    )
    const data = await response.json()
    this.setState({ employee: data })
  }
}

export default EmployeeDetail
