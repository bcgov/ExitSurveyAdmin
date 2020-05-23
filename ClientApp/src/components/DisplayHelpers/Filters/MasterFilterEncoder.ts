import { IFilterField } from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'

export class MasterFilterEncoder {
  static encode(filterField: IFilterField): string {
    switch (filterField.type) {
      case 'string':
      default:
        return TextFilterHandler.instance().encode(
          (filterField as unknown) as IFilterField
        )
    }
  }
}
