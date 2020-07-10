/* globals Map */

import { ISelectOption } from '../components/Employees/EditableSelect'
import { AppointmentStatusEnum } from './AppointmentStatus'

export enum ExitTypeEnum {
  Involuntary = 'Involuntary',
  Voluntary = 'Voluntary'
}

export enum ReasonEnum {
  Abandonment = 'Abandonment',
  CareForFamily = 'Care For/Raise Family',
  JobEnds = 'Job Ends/End of Recall Limit',
  JustCause = 'Just Cause',
  LayoffWithRecall = 'Layoff (With Recall)',
  PreLayoffCanvass = 'Pre-Layoff Canvass',
  Redundant = 'Redundant',
  RejectionOnProbation = 'Rejection on Probation',
  Resignation = 'Resignation',
  Retired = 'Retired',
  SpecialRetirementIncentive = 'Special Retirement Incentive'
}

export type LeaveCode = 1 | 2 | 3

export class Reason {
  appointmentStatusCode: AppointmentStatusEnum
  exitTypeCode: ExitTypeEnum
  reasonCode: ReasonEnum
  leaveCode: LeaveCode

  constructor(
    appointmentStatusCode: AppointmentStatusEnum,
    exitTypeCode: ExitTypeEnum,
    reasonCode: ReasonEnum,
    leaveCode: LeaveCode
  ) {
    this.appointmentStatusCode = appointmentStatusCode
    this.exitTypeCode = exitTypeCode
    this.reasonCode = reasonCode
    this.leaveCode = leaveCode
  }

  static REG_INV_JUST_CAUSE: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Involuntary,
    ReasonEnum.JustCause,
    3
  )
  static REG_INV_REDUNDANT: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Involuntary,
    ReasonEnum.Redundant,
    3
  )
  static REG_INV_REJECTION_ON_PROBATION: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Involuntary,
    ReasonEnum.RejectionOnProbation,
    3
  )
  static REG_VOL_ABANDONMENT: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Voluntary,
    ReasonEnum.Abandonment,
    1
  )
  static REG_VOL_CARE_FOR_FAMILY: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Voluntary,
    ReasonEnum.CareForFamily,
    1
  )
  static REG_VOL_RESIGNATION: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Voluntary,
    ReasonEnum.Resignation,
    1
  )
  static REG_VOL_RETIRED: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Voluntary,
    ReasonEnum.Retired,
    1
  )
  static REG_VOL_PRE_LAYOFF_CANVASS: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Voluntary,
    ReasonEnum.PreLayoffCanvass,
    1
  )
  static REG_VOL_SPECIAL_RETIREMENT_INCENTIVE: Reason = new Reason(
    AppointmentStatusEnum.Regular,
    ExitTypeEnum.Voluntary,
    ReasonEnum.SpecialRetirementIncentive,
    1
  )
  static AUX_INV_LAYOFF_WITH_RECALL: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Involuntary,
    ReasonEnum.LayoffWithRecall,
    2
  )
  static AUX_INV_JOB_ENDS: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Involuntary,
    ReasonEnum.JobEnds,
    2
  )
  static AUX_INV_JUST_CAUSE: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Involuntary,
    ReasonEnum.JustCause,
    3
  )
  static AUX_INV_REJECTION_ON_PROBATION: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Involuntary,
    ReasonEnum.RejectionOnProbation,
    3
  )
  static AUX_VOL_ABANDONMENT: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Voluntary,
    ReasonEnum.Abandonment,
    1
  )
  static AUX_VOL_RESIGNATION: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Voluntary,
    ReasonEnum.Resignation,
    1
  )
  static AUX_VOL_RETIRED: Reason = new Reason(
    AppointmentStatusEnum.Auxiliary,
    ExitTypeEnum.Voluntary,
    ReasonEnum.Retired,
    1
  )

  static array = (): Reason[] => [
    Reason.REG_INV_JUST_CAUSE,
    Reason.REG_INV_REDUNDANT,
    Reason.REG_INV_REJECTION_ON_PROBATION,
    Reason.REG_VOL_ABANDONMENT,
    Reason.REG_VOL_CARE_FOR_FAMILY,
    Reason.REG_VOL_RESIGNATION,
    Reason.REG_VOL_RETIRED,
    Reason.REG_VOL_PRE_LAYOFF_CANVASS,
    Reason.REG_VOL_SPECIAL_RETIREMENT_INCENTIVE,
    Reason.AUX_INV_LAYOFF_WITH_RECALL,
    Reason.AUX_INV_JOB_ENDS,
    Reason.AUX_INV_JUST_CAUSE,
    Reason.AUX_INV_REJECTION_ON_PROBATION,
    Reason.AUX_VOL_ABANDONMENT,
    Reason.AUX_VOL_RESIGNATION,
    Reason.AUX_VOL_RETIRED
  ]

  static map = (): Map<ReasonEnum, Reason> => {
    return new Map(Reason.array().map(r => [r.reasonCode, r]))
  }

  static fromKey = (key: ReasonEnum): Reason => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Reason.map().get(key)!
  }

  static byAppointmentStatus = (code: AppointmentStatusEnum): Reason[] => {
    return Reason.array().filter(r => r.appointmentStatusCode === code)
  }

  static toOptions = (): ISelectOption[] => {
    const vals = Array.from(Reason.map().values()).map(reason => ({
      name: reason.reasonCode,
      value: reason.reasonCode
    }))
    return vals
  }

  static toOptionsByAppointmentStatus = (
    appointmentStatusCode: AppointmentStatusEnum
  ): ISelectOption[] => {
    return Reason.byAppointmentStatus(appointmentStatusCode).map(status => ({
      name: `${status.exitTypeCode}: ${status.reasonCode}`,
      value: status.reasonCode
    }))
  }
}
