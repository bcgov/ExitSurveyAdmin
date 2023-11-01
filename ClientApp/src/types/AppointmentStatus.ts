import { SelectOption } from '../components/DisplayHelpers/Interface/EditableFields/EditableSelect'

export enum AppointmentStatusEnum {
  Regular = 'Regular',
  Auxiliary = 'Auxiliary',
}

export class AppointmentStatus {
  code: AppointmentStatusEnum

  constructor(appointmentStatus: AppointmentStatusEnum) {
    this.code = appointmentStatus
  }

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

  static map = (): Map<AppointmentStatusEnum, AppointmentStatus> => {
    return new Map(AppointmentStatus.array().map((s) => [s.code, s]))
  }

  static fromKey = (key: AppointmentStatusEnum): AppointmentStatus => {
    return AppointmentStatus.map().get(key)!
  }

  static toOptions = (): SelectOption[] => {
    return AppointmentStatus.array().map((status) => ({
      name: status.code,
      value: status.code,
    }))
  }
}
