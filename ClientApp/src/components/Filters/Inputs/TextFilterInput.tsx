import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'
import ***REMOVED*** labelFor ***REMOVED*** from '../../../helpers/labelHelper'
import LabelledInput from '../../DisplayHelpers/Interface/LabelledItems/LabelledInput'
import TextFilter from '../FilterClasses/TextFilter'

interface IProps ***REMOVED***
  filter: TextFilter
***REMOVED***

const TextFilterInput = (***REMOVED*** filter ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
      const clone = filter.clone()
      clone.values = [event.target.value]
      dispatch(***REMOVED*** type: 'setFilter', filter: clone ***REMOVED***)
  ***REMOVED***
    [filter, dispatch]
  )

  return (
    <LabelledInput
      title=***REMOVED***labelFor(filter.fieldName)***REMOVED***
      name=***REMOVED***filter.fieldName***REMOVED***
      onChange=***REMOVED***handleChange***REMOVED***
    />
  )
***REMOVED***

export default TextFilterInput
