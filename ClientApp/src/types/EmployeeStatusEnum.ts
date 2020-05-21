import ***REMOVED*** ISelectOption ***REMOVED*** from '../components/Employees/EditableSelect'

export enum EmployeeStatusCodeEnum ***REMOVED***
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
  code: EmployeeStatusCodeEnum
  state: EmployeeStatusStateEnum
  displayName: string
  description?: string

  constructor(
    statusCode: EmployeeStatusCodeEnum,
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
    EmployeeStatusCodeEnum.New,
    EmployeeStatusStateEnum.Initial,
    'New',
    'Newly-added. No email sent yet. Initial state for all employees.'
  )
  static WELCOME_EMAIL_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.WelcomeEmailSent,
    EmployeeStatusStateEnum.InProgress,
    'Welcome Email Sent',
    'First email sent.'
  )
  static REMINDER_1_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.Reminder1Sent,
    EmployeeStatusStateEnum.InProgress,
    'Reminder 1 Sent',
    'First reminder sent.'
  )
  static REMINDER_2_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.Reminder2Sent,
    EmployeeStatusStateEnum.InProgress,
    'Reminder 2 Sent',
    'Second reminder sent.'
  )
  static SURVEY_COMPLETE: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.SurveyComplete,
    EmployeeStatusStateEnum.Final,
    'Survey Complete',
    'Survey has been finished.'
  )
  static SNAIL_MAIL_SENT: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.SnailMailSent,
    EmployeeStatusStateEnum.Final,
    'Snail Mail Sent',
    'Snail mail has been sent.'
  )
  static NOT_EXITING: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.NotExiting,
    EmployeeStatusStateEnum.Final,
    'Employee Not Exiting',
    'This employee is not actually exiting.'
  )
  static INELIGIBLE_OTHER: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.IneligibleOther,
    EmployeeStatusStateEnum.Final,
    'Ineligible (Other)',
    'Other ineligibility reason.'
  )
  static DECLINED: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.Declined,
    EmployeeStatusStateEnum.Final,
    'Employee Declined',
    'The employee has asked not to complete the survey.'
  )
  static EXPIRED: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusCodeEnum.Expired,
    EmployeeStatusStateEnum.Final,
    'Expired',
    "The employee's effective date has passed without completing the survey."
  )

  static statusArray = (): EmployeeStatus[] => [
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

  static statusDictionary = (): ***REMOVED*** [key: string]: EmployeeStatus ***REMOVED*** => ***REMOVED***
    const dictionary: ***REMOVED*** [key: string]: EmployeeStatus ***REMOVED*** = ***REMOVED******REMOVED***

    EmployeeStatus.statusArray().forEach((status: EmployeeStatus): void => ***REMOVED***
      dictionary[status.code.toString()] = status
  ***REMOVED***)

    return dictionary
***REMOVED***

  static statusByKey = (key?: string): EmployeeStatus | undefined => ***REMOVED***
    if (!key) return undefined
    return EmployeeStatus.statusDictionary()[key]
***REMOVED***

  static toOptions = (): ISelectOption[] => ***REMOVED***
    return EmployeeStatus.statusArray().map(status => (***REMOVED***
      name: status.displayName,
      value: status.code
  ***REMOVED***))
***REMOVED***
***REMOVED***
