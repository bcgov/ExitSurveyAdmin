/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** employeeFieldLabels as labels ***REMOVED*** from '../../helpers/labelHelper'
import ***REMOVED*** Link, RouteComponentProps ***REMOVED*** from 'react-router-dom'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
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
import ***REMOVED*** EmployeeStatus ***REMOVED*** from '../../types/EmployeeStatus'
import ***REMOVED***
  AppointmentStatus,
  AppointmentStatusEnum
***REMOVED*** from '../../types/AppointmentStatus'
import ***REMOVED*** Reason ***REMOVED*** from '../../types/Reason'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'

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

  renderEmployee(e: Employee): JSX.Element ***REMOVED***
    return (
      <div>
        <div className="mb-3">
          <Link to="/employees">&larr; Back to exiting employees list</Link>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="text-muted">Employee</h3>
            <h2>
              ***REMOVED***e.firstName***REMOVED*** ***REMOVED***e.lastName***REMOVED***
            </h2>
          </div>
          <div className="col">
            <LabelledText label=***REMOVED***'Current status'***REMOVED***>
              <h3 className="mt-1">
                <EditableDropdown
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName="currentEmployeeStatusCode"
                  fieldValue=***REMOVED***e.currentEmployeeStatusCode!.displayName***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                  options=***REMOVED***EmployeeStatus.toOptions()***REMOVED***
                />
              </h3>
            </LabelledText>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            <div className="row">
              <CLText label=***REMOVED***labels.id***REMOVED***>***REMOVED***e.id***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.telkey***REMOVED***>***REMOVED***e.telkey***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.governmentEmployeeId***REMOVED***>
                ***REMOVED***e.governmentEmployeeId***REMOVED***
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labels.firstName***REMOVED***>***REMOVED***e.firstName***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.preferredFirstName***REMOVED***>
                <EditableStringField
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName=***REMOVED***'preferredFirstName'***REMOVED***
                  fieldValue=***REMOVED***e.preferredFirstName!***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***labels.lastName***REMOVED***>***REMOVED***e.lastName***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.gender***REMOVED***>***REMOVED***e.gender***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.birthDate***REMOVED***>
                <Date date=***REMOVED***e.birthDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labels.age***REMOVED***>***REMOVED***e.age***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labels.governmentEmail***REMOVED***>***REMOVED***e.preferredEmail***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.preferredEmail***REMOVED***>
                <EditableStringField
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName=***REMOVED***'preferredEmail'***REMOVED***
                  fieldValue=***REMOVED***e.preferredEmail!***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***labels.phone***REMOVED***>***REMOVED***e.phone***REMOVED***</CLText>
              <CLText label=***REMOVED***'Address'***REMOVED***>
                <Address employee=***REMOVED***e***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***'Preferred address'***REMOVED***>
                <EditableAddress
                  employee=***REMOVED***e***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labels.originalHireDate***REMOVED***>
                <Date date=***REMOVED***e.originalHireDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labels.lastDayWorkedDate***REMOVED***>
                <Date date=***REMOVED***e.lastDayWorkedDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labels.effectiveDate***REMOVED***>
                <Date date=***REMOVED***e.effectiveDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labels.reason***REMOVED***>
                <EditableDropdown
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName="reason"
                  fieldValue=***REMOVED***e.reason!.reasonCode***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                  options=***REMOVED***Reason.toOptionsByAppointmentStatus(
                    (AppointmentStatusEnum as FixTypeLater)[
                      e.appointmentStatus!.code
                    ]
                  )***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***labels.exitCount***REMOVED***>***REMOVED***e.exitCount***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.recordCount***REMOVED***>***REMOVED***e.recordCount***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.backDated***REMOVED***>***REMOVED***e.backDated***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labels.ministry***REMOVED***>***REMOVED***e.ministry***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.departmentId***REMOVED***>***REMOVED***e.departmentId***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.appointmentStatus***REMOVED***>
                <EditableDropdown
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName="appointmentStatus"
                  fieldValue=***REMOVED***e.appointmentStatus!.code***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                  options=***REMOVED***AppointmentStatus.toOptions()***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***labels.classificationGroup***REMOVED***>
                ***REMOVED***e.classificationGroup***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labels.classification***REMOVED***>***REMOVED***e.classification***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.jobFunctionCode***REMOVED***>
                ***REMOVED***e.jobFunctionCode***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labels.jobCode***REMOVED***>***REMOVED***e.jobCode***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.locationCity***REMOVED***>***REMOVED***e.locationCity***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.serviceYears***REMOVED***>***REMOVED***e.serviceYears***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.positionTitle***REMOVED***>***REMOVED***e.positionTitle***REMOVED***</CLText>
              <CLText label=***REMOVED***labels.positionCode***REMOVED***>***REMOVED***e.positionCode***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row text-muted">
              <CLText label=***REMOVED***labels.createdTs***REMOVED***>
                <small>
                  <Date date=***REMOVED***e.createdTs***REMOVED*** showTime showLocalTimezone />
                </small>
              </CLText>
              <CLText label=***REMOVED***labels.modifiedTs***REMOVED***>
                <small>
                  <Date date=***REMOVED***e.modifiedTs***REMOVED*** showTime showLocalTimezone />
                </small>
              </CLText>
            </div>
          </div>
          <div className="col-4">
            <h3>Timeline</h3>
            <AddComment
              employeeDatabaseId=***REMOVED***e.id!***REMOVED***
              employeeStatusCode=***REMOVED***e.currentEmployeeStatusCode!.code***REMOVED***
              refreshDataCallback=***REMOVED***this.populateData***REMOVED***
            />
            ***REMOVED***e.timelineEntries && (
              <TimelineEntryList timelineEntries=***REMOVED***e.timelineEntries***REMOVED*** />
            )***REMOVED***
          </div>
        </div>
      </div>
    )
***REMOVED***

  render(): JSX.Element ***REMOVED***
    const contents =
      this.state.employee === undefined ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        this.renderEmployee(this.state.employee)
      )

    return <ContentWrapper>***REMOVED***contents***REMOVED***</ContentWrapper>
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    await requestJSONWithErrorHandler(
      `api/employees/$***REMOVED***this.props.match.params.employeeId***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: string): void => ***REMOVED***
        this.setState(***REMOVED*** employee: plainToClass(Employee, responseJSON) ***REMOVED***)
    ***REMOVED***
    )
***REMOVED***
***REMOVED***

export default EmployeeDetail
