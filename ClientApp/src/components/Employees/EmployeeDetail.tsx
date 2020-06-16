/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import { Employee } from '../../types/Employee'
import { labelFor } from '../../helpers/labelHelper'
import { Link, RouteComponentProps } from 'react-router-dom'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'
import CLText from '../DisplayHelpers/ColumnarLabelledText'
import Date from '../DisplayHelpers/FormattedDate'
import Address from '../DisplayHelpers/Address'
import EditableAddress from './EditableAddress'
import LabelledText from '../DisplayHelpers/LabelledText'
import TimelineEntryList from './TimelineEntryList'
import AddComment from './AddComment'
import EditableStringField from './EditableStringField'
import EditableDropdown from './EditableSelect'
import { EmployeeStatus } from '../../types/EmployeeStatus'
import { plainToClass } from 'class-transformer'

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
              <CLText label={labelFor('id')}>{e.id}</CLText>
              <CLText label={labelFor('telkey')}>{e.telkey}</CLText>
              <CLText label={labelFor('governmentEmployeeId')}>
                {e.governmentEmployeeId}
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labelFor('firstName')}>{e.firstName}</CLText>
              <CLText label={labelFor('preferredFirstName')}>
                <EditableStringField
                  employeeDatabaseId={e.id!}
                  fieldName={'preferredFirstName'}
                  fieldValue={e.preferredFirstName!}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
              <CLText label={labelFor('lastName')}>{e.lastName}</CLText>
              <CLText label={labelFor('gender')}>{e.gender}</CLText>
              <CLText label={labelFor('birthDate')}>
                <Date date={e.birthDate} />
              </CLText>
              <CLText label={labelFor('age')}>{e.age}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labelFor('governmentEmail')}>
                {e.governmentEmail}
              </CLText>
              <CLText label={labelFor('preferredEmail')}>
                <EditableStringField
                  employeeDatabaseId={e.id!}
                  fieldName={'preferredEmail'}
                  fieldValue={e.preferredEmail!}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
              <CLText label={labelFor('phone')}>{e.phone}</CLText>
              <CLText label={'Address'}>
                <Address employee={e} />
              </CLText>
              <CLText label={'Preferred address'}>
                <EditableAddress
                  employee={e}
                  refreshDataCallback={this.populateData}
                />
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labelFor('originalHireDate')}>
                <Date date={e.originalHireDate} />
              </CLText>
              <CLText label={labelFor('lastDayWorkedDate')}>
                <Date date={e.lastDayWorkedDate} />
              </CLText>
              <CLText label={labelFor('effectiveDate')}>
                <Date date={e.effectiveDate} />
              </CLText>
              <CLText label={labelFor('reason')}>{e.reason!.reasonCode}</CLText>
              <CLText label={labelFor('exitCount')}>{e.exitCount}</CLText>
              <CLText label={labelFor('recordCount')}>{e.recordCount}</CLText>
              <CLText label={labelFor('backDated')}>{e.backDated}</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label={labelFor('ministry')}>{e.ministry}</CLText>
              <CLText label={labelFor('departmentId')}>{e.departmentId}</CLText>
              <CLText label={labelFor('appointmentStatus')}>
                {e.appointmentStatus!.code}
              </CLText>
              <CLText label={labelFor('classificationGroup')}>
                {e.classificationGroup}
              </CLText>
              <CLText label={labelFor('classification')}>
                {e.classification}
              </CLText>
              <CLText label={labelFor('jobFunctionCode')}>
                {e.jobFunctionCode}
              </CLText>
              <CLText label={labelFor('jobCode')}>{e.jobCode}</CLText>
              <CLText label={labelFor('locationCity')}>{e.locationCity}</CLText>
              <CLText label={labelFor('serviceYears')}>{e.serviceYears}</CLText>
              <CLText label={labelFor('positionTitle')}>
                {e.positionTitle}
              </CLText>
              <CLText label={labelFor('positionCode')}>{e.positionCode}</CLText>
            </div>
            <hr />
            <div className="row text-muted">
              <CLText label={labelFor('createdTs')}>
                <small>
                  <Date date={e.createdTs} showTime showLocalTimezone />
                </small>
              </CLText>
              <CLText label={labelFor('modifiedTs')}>
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
      (responseJSON: string): void => {
        this.setState({ employee: plainToClass(Employee, responseJSON) })
      }
    )
  }
}

export default EmployeeDetail
