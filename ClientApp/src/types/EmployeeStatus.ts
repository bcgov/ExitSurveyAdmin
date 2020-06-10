/* globals Map */

import { ISelectOption } from '../components/Employees/EditableSelect'

export enum EmployeeStatusEnum {
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
  code: EmployeeStatusEnum
  state: EmployeeStatusStateEnum
  displayName: string
  description?: string

  constructor(
    statusCode: EmployeeStatusEnum,
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

  static map = (): Map<EmployeeStatusEnum, EmployeeStatus> => {
    return new Map(EmployeeStatus.array().map(s => [s.code, s]))
  }

  static fromKey = (key: EmployeeStatusEnum): EmployeeStatus => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return EmployeeStatus.map().get(key)!
  }

  static toOptions = (): ISelectOption[] => {
    return EmployeeStatus.array().map(status => ({
      name: status.displayName,
      value: status.code
    }))
  }
}
