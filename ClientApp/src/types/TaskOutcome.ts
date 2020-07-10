/* globals Map */

import ***REMOVED*** ISelectOption ***REMOVED*** from '../components/Employees/EditableSelect'

export enum TaskOutcomeEnum ***REMOVED***
  Success = 'Success',
  Warn = 'Warn',
  Fail = 'Fail'
***REMOVED***

export class TaskOutcome ***REMOVED***
  code: TaskOutcomeEnum

  constructor(code: TaskOutcomeEnum) ***REMOVED***
    this.code = code
***REMOVED***

  static SUCCESS: TaskOutcome = new TaskOutcome(TaskOutcomeEnum.Success)
  static WARN: TaskOutcome = new TaskOutcome(TaskOutcomeEnum.Warn)
  static FAIL: TaskOutcome = new TaskOutcome(TaskOutcomeEnum.Fail)

  static array = (): TaskOutcome[] => [
    TaskOutcome.SUCCESS,
    TaskOutcome.WARN,
    TaskOutcome.FAIL
  ]

  static map = (): Map<TaskOutcomeEnum, TaskOutcome> => ***REMOVED***
    return new Map(TaskOutcome.array().map(s => [s.code, s]))
***REMOVED***

  static fromKey = (key: TaskOutcomeEnum): TaskOutcome => ***REMOVED***
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return TaskOutcome.map().get(key)!
***REMOVED***

  static toOptions = (): ISelectOption[] => ***REMOVED***
    return TaskOutcome.array().map(status => (***REMOVED***
      name: status.code,
      value: status.code
  ***REMOVED***))
***REMOVED***
***REMOVED***
