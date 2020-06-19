/* globals Map */

import { ISelectOption } from '../components/Employees/EditableSelect'

export enum EmployeeStatusEnum {
  Exiting = 'Exiting',
  SurveyComplete = 'SurveyComplete',
  SnailMailSent = 'SnailMailSent',
  NotExiting = 'NotExiting',
  IneligibleOther = 'IneligibleOther',
  Declined = 'Declined',
  Expired = 'Expired'
}

export enum EmployeeStatusStateEnum {
  Active = 'Active',
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

  static EXITING: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.Exiting,
    EmployeeStatusStateEnum.Active,
    'Exiting',
    'Employee is exiting.'
  )
  static SURVEY_COMPLETE: EmployeeStatus = new EmployeeStatus(
    EmployeeStatusEnum.SurveyComplete,
    EmployeeStatusStateEnum.Final,
    'Survey complete',
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
    EmployeeStatus.EXITING,
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
