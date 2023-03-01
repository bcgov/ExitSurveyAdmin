import ***REMOVED*** SelectOption ***REMOVED*** from '../components/DisplayHelpers/Interface/EditableFields/EditableSelect'

export enum EmployeeStatusEnum ***REMOVED***
  Exiting = 'Exiting',
  SurveyComplete = 'SurveyComplete',
  SnailMailSent = 'SnailMailSent',
  NotExiting = 'NotExiting',
  OutOfScope = 'OutOfScope',
  Declined = 'Declined',
  Expired = 'Expired',
***REMOVED***

export enum EmployeeStatusStateEnum ***REMOVED***
  Active = 'Active',
  Final = 'Final',
***REMOVED***

export class EmployeeStatus ***REMOVED***
  code: EmployeeStatusEnum
  state: EmployeeStatusStateEnum
  displayName: string
  description?: string

  constructor(
    statusCode: EmployeeStatusEnum,
    statusState: EmployeeStatusStateEnum,
    displayName: string,
    description: string
  ) ***REMOVED***
    this.code = statusCode
    this.state = statusState
    this.displayName = displayName
    this.description = description
***REMOVED***

  static EXITING: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Exiting,
    EmployeeStatusStateEnum.Active,
    'Exiting',
    'Employee is exiting.'
  )
  static SURVEY_COMPLETE: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.SurveyComplete,
    EmployeeStatusStateEnum.Final,
    'Survey: Complete',
    'Survey has been finished.'
  )
  static SNAIL_MAIL_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.SnailMailSent,
    EmployeeStatusStateEnum.Active,
    'Snail mail sent',
    'Snail mail has been sent.'
  )
  static NOT_EXITING: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.NotExiting,
    EmployeeStatusStateEnum.Final,
    'Employee not exiting',
    'This employee is not actually exiting.'
  )
  static INELIGIBLE_OTHER: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.OutOfScope,
    EmployeeStatusStateEnum.Final,
    'Out of scope',
    'Other ineligibility reason.'
  )
  static DECLINED: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Declined,
    EmployeeStatusStateEnum.Active,
    'Survey: Do not remind / declined',
    'The employee has asked not to complete the survey.'
  )
  static EXPIRED: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Expired,
    EmployeeStatusStateEnum.Final,
    'Survey: Expired',
    "The employee's effective date has passed without completing the survey."
  )

  static array = (): EmployeeStatus[] => [
    EmployeeStatus.EXITING,
    EmployeeStatus.SURVEY_COMPLETE,
    EmployeeStatus.SNAIL_MAIL_SENT,
    EmployeeStatus.NOT_EXITING,
    EmployeeStatus.INELIGIBLE_OTHER,
    EmployeeStatus.DECLINED,
    EmployeeStatus.EXPIRED,
  ]

  static map = (): Map<EmployeeStatusEnum, EmployeeStatus> => ***REMOVED***
    return new Map(EmployeeStatus.array().map((s) => [s.code, s]))
***REMOVED***

  static fromKey = (key: EmployeeStatusEnum): EmployeeStatus => ***REMOVED***
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return EmployeeStatus.map().get(key)!
***REMOVED***

  static toOptions = (): SelectOption[] => ***REMOVED***
    return EmployeeStatus.array()
      .map((status) => (***REMOVED***
        name: status.displayName,
        value: status.code,
    ***REMOVED***))
      .sort((a, b) => a.name.localeCompare(b.name))
***REMOVED***
***REMOVED***
