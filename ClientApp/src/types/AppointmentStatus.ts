import { ISelectOption } from '../components/Employees/EditableSelect'

export enum AppointmentStatusEnum {
  Regular = 'Regular',
  Auxiliary = 'Auxiliary'
}

export class AppointmentStatus {
  appointmentStatusCode: AppointmentStatusEnum

  constructor(appointmentStatus: AppointmentStatusEnum) {
    this.appointmentStatusCode = appointmentStatus
  }

  static REGULAR: AppointmentStatus = new AppointmentStatus(
    AppointmentStatusEnum.Regular
  )
  static AUXILIARY: AppointmentStatus = new AppointmentStatus(
    AppointmentStatusEnum.Auxiliary
  )

  static statusArray = (): AppointmentStatus[] => [
    AppointmentStatus.AUXILIARY,
    AppointmentStatus.REGULAR
  ]

  static statusDictionary = (): {
    [key in AppointmentStatusEnum]?: AppointmentStatus
  } => {
    const dictionary: {
      [key in AppointmentStatusEnum]?: AppointmentStatus
    } = {}

    AppointmentStatus.statusArray().forEach(
      (status: AppointmentStatus): void => {
        dictionary[status.appointmentStatusCode] = status
      }
    )

    return dictionary
  }

  static statusByKey = (
    key?: AppointmentStatusEnum
  ): AppointmentStatus | undefined => {
    if (!key) return undefined
    return AppointmentStatus.statusDictionary()[key]
  }

  static toOptions = (): ISelectOption[] => {
    return AppointmentStatus.statusArray().map(status => ({
      name: status.appointmentStatusCode,
      value: status.appointmentStatusCode
    }))
  }
}
