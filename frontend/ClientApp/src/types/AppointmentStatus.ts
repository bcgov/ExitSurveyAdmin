import ***REMOVED*** SelectOption ***REMOVED*** from '../components/DisplayHelpers/Interface/EditableFields/EditableSelect'

export enum AppointmentStatusEnum ***REMOVED***
  Regular = 'Regular',
  Auxiliary = 'Auxiliary',
***REMOVED***

export class AppointmentStatus ***REMOVED***
  code: AppointmentStatusEnum

  constructor(appointmentStatus: AppointmentStatusEnum) ***REMOVED***
    this.code = appointmentStatus
***REMOVED***

  static REGULAR: AppointmentStatus = new AppointmentStatus(
    AppointmentStatusEnum.Regular
  )
  static AUXILIARY: AppointmentStatus = new AppointmentStatus(
    AppointmentStatusEnum.Auxiliary
  )

  static array = (): AppointmentStatus[] => [
    AppointmentStatus.AUXILIARY,
    AppointmentStatus.REGULAR,
  ]

  static map = (): Map<AppointmentStatusEnum, AppointmentStatus> => ***REMOVED***
    return new Map(AppointmentStatus.array().map((s) => [s.code, s]))
***REMOVED***

  static fromKey = (key: AppointmentStatusEnum): AppointmentStatus => ***REMOVED***
    return AppointmentStatus.map().get(key)!
***REMOVED***

  static toOptions = (): SelectOption[] => ***REMOVED***
    return AppointmentStatus.array().map((status) => (***REMOVED***
      name: status.code,
      value: status.code,
  ***REMOVED***))
***REMOVED***
***REMOVED***
