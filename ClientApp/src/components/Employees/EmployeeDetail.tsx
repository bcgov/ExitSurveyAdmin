/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** Link, RouteComponentProps ***REMOVED*** from 'react-router-dom'

import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'
import CLText from '../DisplayHelpers/ColumnarLabelledText'
import Date from '../DisplayHelpers/FormattedDate'
import EditableAddress from './EditableAddress'
import LabelledText from '../DisplayHelpers/LabelledText'
import TimelineEntryList from './TimelineEntryList'
import AddComment from './AddComment'
import EditableStringField from './EditableStringField'
import EditableDropdown from './EditableSelect'
import ***REMOVED*** EmployeeStatus ***REMOVED*** from '../../types/EmployeeStatusEnum'
import ***REMOVED***
  AppointmentStatus,
  AppointmentStatusEnum
***REMOVED*** from '../../types/AppointmentStatus'
import ***REMOVED*** Reason ***REMOVED*** from '../../types/ReasonEnum'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'

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
              <CLText label="Database ID">***REMOVED***e.id***REMOVED***</CLText>
              <CLText label="Telkey">***REMOVED***e.telkey***REMOVED***</CLText>
              <CLText label="Employee ID">***REMOVED***e.governmentEmployeeId***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label="First name">
                <EditableStringField
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName=***REMOVED***'firstName'***REMOVED***
                  fieldValue=***REMOVED***e.firstName!***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label="Last name">***REMOVED***e.lastName***REMOVED***</CLText>
              <CLText label="Gender">***REMOVED***e.gender***REMOVED***</CLText>
              <CLText label="Birth date">
                <Date date=***REMOVED***e.birthDate***REMOVED*** />
              </CLText>
              <CLText label="Age">***REMOVED***e.age***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***'Email'***REMOVED***>
                <EditableStringField
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName=***REMOVED***'governmentEmail'***REMOVED***
                  fieldValue=***REMOVED***e.governmentEmail!***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***'Address'***REMOVED***>
                <EditableAddress
                  employee=***REMOVED***e***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***'Phone'***REMOVED***>***REMOVED***e.phone***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label="Original hire date">
                <Date date=***REMOVED***e.originalHireDate***REMOVED*** />
              </CLText>
              <CLText label="Last day worked date">
                <Date date=***REMOVED***e.lastDayWorkedDate***REMOVED*** />
              </CLText>
              <CLText label="Effective date">
                <Date date=***REMOVED***e.effectiveDate***REMOVED*** />
              </CLText>
              <CLText label="Reason">
                <EditableDropdown
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName="reason"
                  fieldValue=***REMOVED***e.reason!.reasonCode***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                  options=***REMOVED***Reason.toOptionsByAppointmentStatus(
                    (AppointmentStatusEnum as FixTypeLater)[
                      e.appointmentStatus!.appointmentStatusCode
                    ]
                  )***REMOVED***
                />
              </CLText>
              <CLText label="Exit count">***REMOVED***e.exitCount***REMOVED***</CLText>
              <CLText label="Record count">***REMOVED***e.recordCount***REMOVED***</CLText>
              <CLText label="Back dated">***REMOVED***e.backDated***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label="Ministry">***REMOVED***e.ministry***REMOVED***</CLText>
              <CLText label="Department ID">***REMOVED***e.departmentId***REMOVED***</CLText>
              <CLText label="Appointment status">
                <EditableDropdown
                  employeeDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName="appointmentStatus"
                  fieldValue=***REMOVED***e.appointmentStatus!.appointmentStatusCode***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                  options=***REMOVED***AppointmentStatus.toOptions()***REMOVED***
                />
              </CLText>
              <CLText label="Classification group">
                ***REMOVED***e.classificationGroup***REMOVED***
              </CLText>
              <CLText label="Classification">***REMOVED***e.classification***REMOVED***</CLText>
              <CLText label="Job function code">***REMOVED***e.jobFunctionCode***REMOVED***</CLText>
              <CLText label="Job code">***REMOVED***e.jobCode***REMOVED***</CLText>
              <CLText label="Location city">***REMOVED***e.locationCity***REMOVED***</CLText>
              <CLText label="Service years">***REMOVED***e.serviceYears***REMOVED***</CLText>
              <CLText label="Position code">***REMOVED***e.positionCode***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row text-muted">
              <CLText label="Created date">
                <small>
                  <Date date=***REMOVED***e.createdTs***REMOVED*** showTime showLocalTimezone />
                </small>
              </CLText>
              <CLText label="Last modified date">
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
      (responseJSON: IEmployeeJSON): void => ***REMOVED***
        console.log(responseJSON)
        this.setState(***REMOVED*** employee: new Employee(responseJSON) ***REMOVED***)
    ***REMOVED***
    )
***REMOVED***
***REMOVED***

export default EmployeeDetail
