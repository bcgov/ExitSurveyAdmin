/* globals Map */

import { ISelectOption } from '../components/Employees/EditableSelect'

export enum TaskOutcomeEnum {
  Success = 'Success',
  Warn = 'Warn',
  Fail = 'Fail'
}

export class TaskOutcome {
  code: TaskOutcomeEnum

  constructor(code: TaskOutcomeEnum) {
    this.code = code
  }

  static SUCCESS: TaskOutcome = new TaskOutcome(TaskOutcomeEnum.Success)
  static WARN: TaskOutcome = new TaskOutcome(TaskOutcomeEnum.Warn)
  static FAIL: TaskOutcome = new TaskOutcome(TaskOutcomeEnum.Fail)

  static array = (): TaskOutcome[] => [
    TaskOutcome.SUCCESS,
    TaskOutcome.WARN,
    TaskOutcome.FAIL
  ]

  static map = (): Map<TaskOutcomeEnum, TaskOutcome> => {
    return new Map(TaskOutcome.array().map(s => [s.code, s]))
  }

  static fromKey = (key: TaskOutcomeEnum): TaskOutcome => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return TaskOutcome.map().get(key)!
  }

  static toOptions = (): ISelectOption[] => {
    return TaskOutcome.array().map(status => ({
      name: status.code,
      value: status.code
    }))
  }
}
