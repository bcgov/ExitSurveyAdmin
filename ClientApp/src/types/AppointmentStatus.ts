/* globals Map */

import { ISelectOption } from '../components/Employees/EditableSelect'

export enum AppointmentStatusEnum {
  Regular = 'Regular',
  Auxiliary = 'Auxiliary'
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
    AppointmentStatus.REGULAR
  ]

  static map = (): Map<AppointmentStatusEnum, AppointmentStatus> => {
    return new Map(AppointmentStatus.array().map(s => [s.code, s]))
  }

  static fromKey = (key: AppointmentStatusEnum): AppointmentStatus => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return AppointmentStatus.map().get(key)!
  }

  static toOptions = (): ISelectOption[] => {
    return AppointmentStatus.array().map(status => ({
      name: status.code,
      value: status.code
    }))
  }
}
