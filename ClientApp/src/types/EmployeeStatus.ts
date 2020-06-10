/* globals Map */

import ***REMOVED*** ISelectOption ***REMOVED*** from '../components/Employees/EditableSelect'

export enum EmployeeStatusEnum ***REMOVED***
  New = 'New',
  WelcomeEmailSent = 'WelcomeEmailSent',
  Reminder1Sent = 'Reminder1Sent',
  Reminder2Sent = 'Reminder2Sent',
  SurveyComplete = 'SurveyComplete',
  SnailMailSent = 'SnailMailSent',
  NotExiting = 'NotExiting',
  IneligibleOther = 'IneligibleOther',
  Declined = 'Declined',
  Expired = 'Expired'
***REMOVED***

export enum EmployeeStatusStateEnum ***REMOVED***
  Initial = 'Initial',
  InProgress = 'InProgress',
  Final = 'Final'
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

  static NEW: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.New,
    EmployeeStatusStateEnum.Initial,
    'New',
    'Newly-added. No email sent yet. Initial state for all employees.'
  )
  static WELCOME_EMAIL_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.WelcomeEmailSent,
    EmployeeStatusStateEnum.InProgress,
    'Welcome email sent',
    'First email sent.'
  )
  static REMINDER_1_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Reminder1Sent,
    EmployeeStatusStateEnum.InProgress,
    'Reminder 1 sent',
    'First reminder sent.'
  )
  static REMINDER_2_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Reminder2Sent,
    EmployeeStatusStateEnum.InProgress,
    'Reminder 2 sent',
    'Second reminder sent.'
  )
  static SURVEY_COMPLETE: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.SurveyComplete,
    EmployeeStatusStateEnum.Final,
    'Survey complete',
    'Survey has been finished.'
  )
  static SNAIL_MAIL_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.SnailMailSent,
    EmployeeStatusStateEnum.Final,
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
    EmployeeStatusEnum.IneligibleOther,
    EmployeeStatusStateEnum.Final,
    'Ineligible (other)',
    'Other ineligibility reason.'
  )
  static DECLINED: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Declined,
    EmployeeStatusStateEnum.Final,
    'Employee declined',
    'The employee has asked not to complete the survey.'
  )
  static EXPIRED: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Expired,
    EmployeeStatusStateEnum.Final,
    'Expired',
    "The employee's effective date has passed without completing the survey."
  )

  static array = (): EmployeeStatus[] => [
    EmployeeStatus.NEW,
    EmployeeStatus.WELCOME_EMAIL_SENT,
    EmployeeStatus.REMINDER_1_SENT,
    EmployeeStatus.REMINDER_2_SENT,
    EmployeeStatus.SURVEY_COMPLETE,
    EmployeeStatus.SNAIL_MAIL_SENT,
    EmployeeStatus.NOT_EXITING,
    EmployeeStatus.INELIGIBLE_OTHER,
    EmployeeStatus.DECLINED,
    EmployeeStatus.EXPIRED
  ]

  static map = (): Map<EmployeeStatusEnum, EmployeeStatus> => ***REMOVED***
    return new Map(EmployeeStatus.array().map(s => [s.code, s]))
***REMOVED***

  static fromKey = (key: EmployeeStatusEnum): EmployeeStatus => ***REMOVED***
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return EmployeeStatus.map().get(key)!
***REMOVED***

  static toOptions = (): ISelectOption[] => ***REMOVED***
    return EmployeeStatus.array().map(status => (***REMOVED***
      name: status.displayName,
      value: status.code
  ***REMOVED***))
***REMOVED***
***REMOVED***
