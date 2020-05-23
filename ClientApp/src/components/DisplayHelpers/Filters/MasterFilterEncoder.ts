import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'

export class MasterFilterEncoder ***REMOVED***
  static encode(filterField: IFilterField): string ***REMOVED***
    switch (filterField.type) ***REMOVED***
      case 'string':
      default:
        return TextFilterHandler.instance().encode(
          (filterField as unknown) as IFilterField
        )
  ***REMOVED***
***REMOVED***
***REMOVED***
