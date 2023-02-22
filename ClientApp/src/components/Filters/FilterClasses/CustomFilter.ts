/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { FilterType, IFilter } from './FilterTypes'

export default class CustomFilter implements IFilter {
  _type = FilterType.Custom
  _fieldName: string

  constructor(fieldName: string) {
    this._fieldName = fieldName
  }

  get type(): FilterType {
    return this._type
  }

  get fieldName(): string {
    return this._fieldName
  }

  reset(): void {
    // No-op
  }

  get isSet(): boolean {
    return true
  }

  get mustReplace(): boolean {
    return true
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`CustomFilter for ${this._fieldName}: value is 0-length`)
      return ''
    }
    return `${this._fieldName}`
  }

  decode(inputs: string[]): CustomFilter {
    const fieldName = inputs[0]
    return new CustomFilter(fieldName)
  }

  clone(): CustomFilter {
    return new CustomFilter(this._fieldName)
  }

  get displayString(): string {
    return 'is blank'
  }
}
