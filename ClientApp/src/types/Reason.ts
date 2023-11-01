import ***REMOVED*** SelectOption ***REMOVED*** from '../components/DisplayHelpers/Interface/EditableFields/EditableSelect'
import ***REMOVED*** AppointmentStatusEnum ***REMOVED*** from './AppointmentStatus'

export enum ExitTypeEnum ***REMOVED***
  Involuntary = 'Involuntary',
  Voluntary = 'Voluntary',
***REMOVED***

export enum ReasonEnum ***REMOVED***
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
  SpecialRetirementIncentive = 'Special Retirement Incentive',
***REMOVED***

export type LeaveCode = 1 | 2 | 3

export class Reason ***REMOVED***
  appointmentStatusCode: AppointmentStatusEnum
  exitTypeCode: ExitTypeEnum
  reasonCode: ReasonEnum
  leaveCode: LeaveCode

  constructor(
    appointmentStatusCode: AppointmentStatusEnum,
    exitTypeCode: ExitTypeEnum,
    reasonCode: ReasonEnum,
    leaveCode: LeaveCode
  ) ***REMOVED***
    this.appointmentStatusCode = appointmentStatusCode
    this.exitTypeCode = exitTypeCode
    this.reasonCode = reasonCode
    this.leaveCode = leaveCode
***REMOVED***

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
    Reason.AUX_VOL_RETIRED,
  ]

  static map = (): Map<ReasonEnum, Reason> => ***REMOVED***
    return new Map(Reason.array().map((r) => [r.reasonCode, r]))
***REMOVED***

  static fromKey = (key: ReasonEnum): Reason => ***REMOVED***
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Reason.map().get(key)!
***REMOVED***

  static byAppointmentStatus = (code: AppointmentStatusEnum): Reason[] => ***REMOVED***
    return Reason.array().filter((r) => r.appointmentStatusCode === code)
***REMOVED***

  static toOptions = (): SelectOption[] => ***REMOVED***
    const vals = Array.from(Reason.map().values()).map((reason) => (***REMOVED***
      name: reason.reasonCode,
      value: reason.reasonCode,
  ***REMOVED***))
    return vals
***REMOVED***

  static toOptionsByAppointmentStatus = (
    appointmentStatusCode: AppointmentStatusEnum
  ): SelectOption[] => ***REMOVED***
    return Reason.byAppointmentStatus(appointmentStatusCode).map((status) => (***REMOVED***
      name: `$***REMOVED***status.exitTypeCode***REMOVED***: $***REMOVED***status.reasonCode***REMOVED***`,
      value: status.reasonCode,
  ***REMOVED***))
***REMOVED***
***REMOVED***
