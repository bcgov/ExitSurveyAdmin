import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'
import ***REMOVED*** Link, useParams ***REMOVED*** from 'react-router'
import ***REMOVED*** plainToInstance ***REMOVED*** from 'class-transformer'
import * as EmailValidator from 'email-validator'

import ***REMOVED*** Employee ***REMOVED*** from '../../../types/Employee'
import ***REMOVED***
  EmployeeStatus,
  EmployeeStatusEnum,
***REMOVED*** from '../../../types/EmployeeStatus'
import ***REMOVED*** labelFor, labelForWithFlag ***REMOVED*** from '../../../helpers/labelHelper'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../../helpers/requestHelpers'
import AddComment from '../AddComment'
import Address from '../Address'
import CLText from '../../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import Date from '../../DisplayHelpers/FormattedDate'
import EditableAddress from '../../DisplayHelpers/Interface/EditableFields/EditableAddress'
import EditableDropdown from '../../DisplayHelpers/Interface/EditableFields/EditableSelect'
import EditableStringField from '../../DisplayHelpers/Interface/EditableFields/EditableStringField'
import LabelledText from '../../DisplayHelpers/Interface/LabelledItems/LabelledText'
import TimelineEntryList from '../TimelineEntryList'

interface IParams ***REMOVED***
  employeeId: string
***REMOVED***

interface Props ***REMOVED***
  employeeId: string
***REMOVED***

interface IState ***REMOVED***
  employee?: Employee
***REMOVED***

class EmployeeDetail extends React.Component<Props, IState> ***REMOVED***
  constructor(props: Props) ***REMOVED***
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
              ***REMOVED***e.preferredFirstName***REMOVED*** ***REMOVED***e.lastName***REMOVED***
            </h2>
          </div>
          <div className="col">
            <LabelledText label=***REMOVED***'Current status'***REMOVED***>
              <h3 className="mt-1">
                <EditableDropdown
                  modelDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName="currentEmployeeStatusCode"
                  fieldValue=***REMOVED***e.currentEmployeeStatusCode!.code***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                  options=***REMOVED***EmployeeStatus.toOptions()***REMOVED***
                  valueToDisplayAccessor=***REMOVED***(value: string): string =>
                    EmployeeStatus.fromKey(value as EmployeeStatusEnum)
                      .displayName
                ***REMOVED***
                />
              </h3>
            </LabelledText>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            <div className="row">
              <CLText label=***REMOVED***labelFor('id')***REMOVED***>***REMOVED***e.id***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('telkey')***REMOVED***>***REMOVED***e.telkey***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('governmentEmployeeId')***REMOVED***>
                ***REMOVED***e.governmentEmployeeId***REMOVED***
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labelFor('firstName')***REMOVED***>***REMOVED***e.firstName***REMOVED***</CLText>
              <CLText label=***REMOVED***labelForWithFlag('preferredFirstName', e)***REMOVED***>
                <EditableStringField
                  modelDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName=***REMOVED***'preferredFirstName'***REMOVED***
                  fieldValue=***REMOVED***e.preferredFirstName!***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***labelFor('lastName')***REMOVED***>***REMOVED***e.lastName***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('gender')***REMOVED***>***REMOVED***e.gender***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('birthDate')***REMOVED***>
                <Date date=***REMOVED***e.birthDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labelFor('age')***REMOVED***>***REMOVED***e.age***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labelFor('governmentEmail')***REMOVED***>
                ***REMOVED***e.governmentEmail***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelForWithFlag('preferredEmail', e)***REMOVED***>
                <EditableStringField
                  validator=***REMOVED***(email: string): boolean =>
                    email.length === 0 || EmailValidator.validate(email)
                ***REMOVED***
                  modelDatabaseId=***REMOVED***e.id!***REMOVED***
                  fieldName=***REMOVED***'preferredEmail'***REMOVED***
                  fieldValue=***REMOVED***e.preferredEmail!***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
              <CLText label=***REMOVED***labelFor('phone')***REMOVED***>***REMOVED***e.phone***REMOVED***</CLText>
              <CLText label=***REMOVED***'Address'***REMOVED***>
                <Address employee=***REMOVED***e***REMOVED*** />
              </CLText>
              <CLText
                label=***REMOVED***labelForWithFlag(
                  'preferredAddress',
                  e,
                  (e: Employee): boolean => ***REMOVED***
                    return (
                      e.preferredAddress1Flag! ||
                      e.preferredAddress2Flag! ||
                      e.preferredAddressCityFlag! ||
                      e.preferredAddressProvinceFlag! ||
                      e.preferredAddressPostCodeFlag!
                    )
                ***REMOVED***
                )***REMOVED***
              >
                <EditableAddress
                  employee=***REMOVED***e***REMOVED***
                  refreshDataCallback=***REMOVED***this.populateData***REMOVED***
                />
              </CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labelFor('originalHireDate')***REMOVED***>
                <Date date=***REMOVED***e.originalHireDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labelFor('lastDayWorkedDate')***REMOVED***>
                <Date date=***REMOVED***e.lastDayWorkedDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labelFor('effectiveDate')***REMOVED***>
                <Date date=***REMOVED***e.effectiveDate***REMOVED*** />
              </CLText>
              <CLText label=***REMOVED***labelFor('reason')***REMOVED***>
                ***REMOVED***e.reason ? e.reason.reasonCode : '[Unknown Reason]'***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelFor('exitCount')***REMOVED***>***REMOVED***e.exitCount***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('recordCount')***REMOVED***>***REMOVED***e.recordCount***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('backDated')***REMOVED***>***REMOVED***e.backDated***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row">
              <CLText label=***REMOVED***labelFor('ministry')***REMOVED***>***REMOVED***e.ministry***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('departmentId')***REMOVED***>***REMOVED***e.departmentId***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('appointmentStatus')***REMOVED***>
                ***REMOVED***e.appointmentStatus!.code***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelFor('classificationGroup')***REMOVED***>
                ***REMOVED***e.classificationGroup***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelFor('classification')***REMOVED***>
                ***REMOVED***e.classification***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelFor('jobFunctionCode')***REMOVED***>
                ***REMOVED***e.jobFunctionCode***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelFor('jobCode')***REMOVED***>***REMOVED***e.jobCode***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('locationCity')***REMOVED***>***REMOVED***e.locationCity***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('serviceYears')***REMOVED***>***REMOVED***e.serviceYears***REMOVED***</CLText>
              <CLText label=***REMOVED***labelFor('positionTitle')***REMOVED***>
                ***REMOVED***e.positionTitle***REMOVED***
              </CLText>
              <CLText label=***REMOVED***labelFor('positionCode')***REMOVED***>***REMOVED***e.positionCode***REMOVED***</CLText>
            </div>
            <hr />
            <div className="row text-muted">
              <CLText label=***REMOVED***labelFor('createdTs')***REMOVED***>
                <small>
                  <Date date=***REMOVED***e.createdTs***REMOVED*** showTime showLocalTimezone />
                </small>
              </CLText>
              <CLText label=***REMOVED***labelFor('modifiedTs')***REMOVED***>
                <small>
                  <Date date=***REMOVED***e.modifiedTs***REMOVED*** showTime showLocalTimezone />
                </small>
              </CLText>
              <CLText label=***REMOVED***labelFor('triedToUpdateInFinalState')***REMOVED***>
                ***REMOVED***e.triedToUpdateInFinalState ? 'True' : 'False'***REMOVED***
              </CLText>
            </div>
          </div>
          <div className="col-4">
            <h3>Timeline</h3>
            <AddComment
              modelDatabaseId=***REMOVED***e.id!***REMOVED***
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

    return <>***REMOVED***contents***REMOVED***</>
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    await requestJSONWithErrorHandler(
      `api/employees/$***REMOVED***this.props.employeeId***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: string): void => ***REMOVED***
        console.log('responseJSON', responseJSON)
        this.setState(***REMOVED*** employee: plainToInstance(Employee, responseJSON) ***REMOVED***)
    ***REMOVED***
    )
***REMOVED***
***REMOVED***

const EmployeeDetailWrapper = () => ***REMOVED***
  const ***REMOVED*** employeeId ***REMOVED*** = useParams()
  return <EmployeeDetail employeeId=***REMOVED***employeeId!***REMOVED*** />
***REMOVED***

export default EmployeeDetailWrapper
