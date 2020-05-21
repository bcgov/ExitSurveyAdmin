import ***REMOVED*** ISelectOption ***REMOVED*** from '../components/Employees/EditableSelect'

export enum AppointmentStatusEnum ***REMOVED***
  Regular = 'Regular',
  Auxiliary = 'Auxiliary'
***REMOVED***

export class AppointmentStatus ***REMOVED***
  appointmentStatusCode: AppointmentStatusEnum

  constructor(appointmentStatus: AppointmentStatusEnum) ***REMOVED***
    this.appointmentStatusCode = appointmentStatus
***REMOVED***

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

  static statusDictionary = (): ***REMOVED***
    [key in AppointmentStatusEnum]?: AppointmentStatus
***REMOVED*** => ***REMOVED***
    const dictionary: ***REMOVED***
      [key in AppointmentStatusEnum]?: AppointmentStatus
  ***REMOVED*** = ***REMOVED******REMOVED***

    AppointmentStatus.statusArray().forEach(
      (status: AppointmentStatus): void => ***REMOVED***
        dictionary[status.appointmentStatusCode] = status
    ***REMOVED***
    )

    return dictionary
***REMOVED***

  static statusByKey = (
    key: AppointmentStatusEnum
  ): AppointmentStatus | undefined => ***REMOVED***
    return AppointmentStatus.statusDictionary()[key]
***REMOVED***

  static toOptions = (): ISelectOption[] => ***REMOVED***
    return AppointmentStatus.statusArray().map(status => (***REMOVED***
      name: status.appointmentStatusCode,
      value: status.appointmentStatusCode
  ***REMOVED***))
***REMOVED***
***REMOVED***
