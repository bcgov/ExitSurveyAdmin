import { FilterHandler, IFilterField } from './FilterTypes'

const OR_OPERATOR = '|'

export default class EnumFilterHandler extends FilterHandler {
  static _instance: EnumFilterHandler

  encode(filterField: IFilterField): string {
    if (!filterField.values || filterField.values.length < 1) {
      console.warn(
        'EnumFilter: filterField.values is falsy or < 1 length',
        filterField
      )
      return ''
    }
    const filterFieldValues = filterField.values.filter(
      (ff: string): boolean => ff !== null && ff.length > 0
    )
    if (filterFieldValues.length > 0) {
      // Joins the items with ORs, e.g. status@=new|email_sent|reminder_1
      return `${filterField.fieldName}@=${filterFieldValues.join(OR_OPERATOR)}`
    } else {
      return ``
    }
  }

  decode(input: string[]): IFilterField {
    // This takes multiple values, but will only use the first one.
    const [column, filterValue] = input[0].split('@=')
    if (!column || !filterValue) {
      throw new Error(`TextFilter: Could not parse input '${input}'`)
    }

    const orValues = filterValue.split(OR_OPERATOR)
    console.log('orValues', orValues)

    return {
      fieldName: column,
      type: 'string',
      values: orValues
    }
  }

  static instance(): EnumFilterHandler {
    if (!this._instance) {
      this._instance = new EnumFilterHandler()
    }
    return this._instance
  }
}
