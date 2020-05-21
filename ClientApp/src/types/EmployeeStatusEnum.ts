import { ISelectOption } from '../components/Employees/EditableDropdown'

export enum EmployeeStatusCodeEnum {
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
}

export enum EmployeeStatusStateEnum {
  Initial = 'Initial',
  InProgress = 'InProgress',
  Final = 'Final'
}

export class EmployeeStatus {
  code: EmployeeStatusCodeEnum
  state: EmployeeStatusStateEnum
  displayName: string
  description?: string

  constructor(
    statusCode: EmployeeStatusCodeEnum,
    statusState: EmployeeStatusStateEnum,
    displayName: string,
    description: string
  ) {
    this.code = statusCode
    this.state = statusState
    this.displayName = displayName
    this.description = description
  }

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

  static statusDictionary = (): { [key: string]: EmployeeStatus } => {
    const dictionary: { [key: string]: EmployeeStatus } = {}

    EmployeeStatus.statusArray().forEach((status: EmployeeStatus): void => {
      dictionary[status.code.toString()] = status
    })

    return dictionary
  }

  static statusByKey = (key: string): EmployeeStatus => {
    return EmployeeStatus.statusDictionary()[key]
  }

  static toOptions = (): ISelectOption[] => {
    return EmployeeStatus.statusArray().map(status => ({
      name: status.displayName,
      value: status.code
    }))
  }
}
