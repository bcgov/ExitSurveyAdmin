/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import {
  Employee,
  IEmployeeJSON,
  employeeFieldLabels as labels
} from '../../types/Employee'
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
import EditableDropdown from './EditableSelect'
import { EmployeeStatus } from '../../types/EmployeeStatusEnum'
import {
  AppointmentStatus,
  AppointmentStatusEnum
} from '../../types/AppointmentStatus'
import { Reason } from '../../types/ReasonEnum'
import { FixTypeLater } from '../../types/FixTypeLater'

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
              <h3 className="mt-1">
                <EditableDropdown
                  employeeDatabaseId={e.id!}
                  fieldName="currentEmployeeStatusCode"
                  fieldValue={e.currentEmployeeStatusCode!.displayName}
                  refreshDataCallback={this.populateData}
                  options={EmployeeStatus.toOptions()}
                />
              </h3>
            </LabelledText>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            <div className="row">
              <CLText label={labels.id}>{e.id}</CLText>
              <CLText label={labels.telkey}>{e.telkey}</CLText>
              <CLText label={labels.governmentEmployeeId}>
                {e.governmentEmployeeId}
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labels.firstName}>
                <EditableStringField
                  employeeDatabaseId={e.id!}
                  fieldName={'firstName'}
                  fieldValue={e.firstName!}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
              <CLText label={labels.lastName}>{e.lastName}</CLText>
              <CLText label={labels.gender}>{e.gender}</CLText>
              <CLText label={labels.birthDate}>
                <Date date={e.birthDate} />
              </CLText>
              <CLText label={labels.age}>{e.age}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labels.governmentEmail}>
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
              <CLText label={labels.phone}>{e.phone}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labels.originalHireDate}>
                <Date date={e.originalHireDate} />
              </CLText>
              <CLText label={labels.lastDayWorkedDate}>
                <Date date={e.lastDayWorkedDate} />
              </CLText>
              <CLText label={labels.effectiveDate}>
                <Date date={e.effectiveDate} />
              </CLText>
              <CLText label={labels.reason}>
                <EditableDropdown
                  employeeDatabaseId={e.id!}
                  fieldName="reason"
                  fieldValue={e.reason!.reasonCode}
                  refreshDataCallback={this.populateData}
                  options={Reason.toOptionsByAppointmentStatus(
                    (AppointmentStatusEnum as FixTypeLater)[
                      e.appointmentStatus!.appointmentStatusCode
                    ]
                  )}
                />
              </CLText>
              <CLText label={labels.exitCount}>{e.exitCount}</CLText>
              <CLText label={labels.recordCount}>{e.recordCount}</CLText>
              <CLText label={labels.backDated}>{e.backDated}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labels.ministry}>{e.ministry}</CLText>
              <CLText label={labels.departmentId}>{e.departmentId}</CLText>
              <CLText label={labels.appointmentStatus}>
                <EditableDropdown
                  employeeDatabaseId={e.id!}
                  fieldName="appointmentStatus"
                  fieldValue={e.appointmentStatus!.appointmentStatusCode}
                  refreshDataCallback={this.populateData}
                  options={AppointmentStatus.toOptions()}
                />
              </CLText>
              <CLText label={labels.classificationGroup}>
                {e.classificationGroup}
              </CLText>
              <CLText label={labels.classification}>{e.classification}</CLText>
              <CLText label={labels.jobFunctionCode}>
                {e.jobFunctionCode}
              </CLText>
              <CLText label={labels.jobCode}>{e.jobCode}</CLText>
              <CLText label={labels.locationCity}>{e.locationCity}</CLText>
              <CLText label={labels.serviceYears}>{e.serviceYears}</CLText>
              <CLText label={labels.positionCode}>{e.positionCode}</CLText>
            </div>
            <hr />
            <div className="row text-muted">
              <CLText label={labels.createdTs}>
                <small>
                  <Date date={e.createdTs} showTime showLocalTimezone />
                </small>
              </CLText>
              <CLText label={labels.modifiedTs}>
                <small>
                  <Date date={e.modifiedTs} showTime showLocalTimezone />
                </small>
              </CLText>
            </div>
          </div>
          <div className="col-4">
            <h3>Timeline</h3>
            <AddComment
              employeeDatabaseId={e.id!}
              employeeStatusCode={e.currentEmployeeStatusCode!.code}
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
