/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import { Employee, IEmployeeJSON } from '../../types/Employee'
import { Link, RouteComponentProps } from 'react-router-dom'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'
import CLText from '../DisplayHelpers/ColumnarLabelledText'
import Date from '../DisplayHelpers/FormattedDate'
import EditableAddress from './EditableAddress'
import LabelledText from '../DisplayHelpers/LabelledText'
import TimelineEntryList from './TimelineEntryList'
import AddComment from './AddComment'
import EditableStringField from './EditableStringField'
import { EEXIST } from 'constants'

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

  renderEmployee(e: Employee): JSX.Element {
    return (
      <div>
        <div className="mb-3">
          <Link to="/employees">&larr; Back to exiting employees list</Link>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="text-muted">Employee</h3>
            <h2>
              {e.firstName} {e.lastName}
            </h2>
          </div>
          <div className="col">
            <LabelledText label={'Current status'}>
              <h3>{e.currentEmployeeStatusCode}</h3>
            </LabelledText>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            <div className="row">
              <CLText label="Database ID">{e.id}</CLText>
              <CLText label="Telkey">{e.telkey}</CLText>
              <CLText label="Employee ID">{e.governmentEmployeeId}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label="First name">
                <EditableStringField
                  employeeDatabaseId={e.id!}
                  fieldName={'firstName'}
                  fieldValue={e.firstName!}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
              <CLText label="Last name">{e.lastName}</CLText>
              <CLText label="Gender">{e.gender}</CLText>
              <CLText label="Birth date">
                <Date date={e.birthDate} />
              </CLText>
              <CLText label="Age">{e.age}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={'Email'}>
                <EditableStringField
                  employeeDatabaseId={e.id!}
                  fieldName={'governmentEmail'}
                  fieldValue={e.governmentEmail!}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
              <CLText label={'Address'}>
                <EditableAddress
                  employee={e}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
              <CLText label={'Phone'}>{e.phone}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label="Original hire date">
                <Date date={e.originalHireDate} />
              </CLText>
              <CLText label="Last day worked date">
                <Date date={e.lastDayWorkedDate} />
              </CLText>
              <CLText label="Effective date">
                <Date date={e.effectiveDate} />
              </CLText>
              <CLText label="Reason">{e.reason}</CLText>
              <CLText label="Exit count">{e.exitCount}</CLText>
              <CLText label="Record count">{e.recordCount}</CLText>
              <CLText label="Back dated">{e.backDated}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label="Ministry">{e.ministry}</CLText>
              <CLText label="Department ID">{e.departmentId}</CLText>
              <CLText label="Appointment status">{e.appointmentStatus}</CLText>
              <CLText label="Classification group">
                {e.classificationGroup}
              </CLText>
              <CLText label="Classification">{e.classification}</CLText>
              <CLText label="Job function code">{e.jobFunctionCode}</CLText>
              <CLText label="Job code">{e.jobCode}</CLText>
              <CLText label="Location city">{e.locationCity}</CLText>
              <CLText label="Service years">{e.serviceYears}</CLText>
              <CLText label="Position code">{e.positionCode}</CLText>
            </div>
            <hr />
            <div className="row text-muted">
              <CLText label="Created date">
                <Date date={e.createdTs} showTime showLocalTimezone />
              </CLText>
              <CLText label="Last modified date">
                <Date date={e.modifiedTs} showTime showLocalTimezone />
              </CLText>
            </div>
          </div>
          <div className="col-4">
            <h3>Timeline</h3>
            <AddComment
              employeeDatabaseId={e.id!}
              employeeStatusCode={e.currentEmployeeStatusCode!}
              refreshDataCallback={this.populateData}
            />
            {e.timelineEntries && (
              <TimelineEntryList timelineEntries={e.timelineEntries} />
            )}
          </div>
        </div>
      </div>
    )
  }

  render(): JSX.Element {
    const contents =
      this.state.employee === undefined ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        this.renderEmployee(this.state.employee)
      )

    return <ContentWrapper>{contents}</ContentWrapper>
  }

  async populateData(): Promise<void> {
    await requestJSONWithErrorHandler(
      `api/employees/${this.props.match.params.employeeId}`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: IEmployeeJSON): void => {
        console.log(responseJSON)
        this.setState({ employee: new Employee(responseJSON) })
      }
    )
  }
}

export default EmployeeDetail
