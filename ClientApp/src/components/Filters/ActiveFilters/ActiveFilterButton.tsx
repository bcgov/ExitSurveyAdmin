/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'

import ***REMOVED*** Filter ***REMOVED*** from '../FilterClasses/FilterTypes'
import ***REMOVED*** labelFor ***REMOVED*** from '../../../helpers/labelHelper'
import IconButton from '../../DisplayHelpers/Interface/Buttons/IconButton'

interface Props ***REMOVED***
  filter: Filter
  removeFilter: (filter: Filter) => void
***REMOVED***

const ActiveFilterButton = (***REMOVED*** filter, removeFilter ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const remove = (): void => ***REMOVED***
    removeFilter(filter)
***REMOVED***

  const label = (
    <>
      ***REMOVED***labelFor(filter.fieldName)***REMOVED***: <strong>***REMOVED***filter.displayString***REMOVED***</strong>
    </>
  )

  return (
    <IconButton
      label=***REMOVED***label***REMOVED***
      iconName="times"
      marginClasses="me-1 my-1 mb-0"
      iconMarginClasses="ms-2"
      colorType="primary"
      iconRight
      size="sm"
      onClick=***REMOVED***remove***REMOVED***
    />
  )
***REMOVED***

export default ActiveFilterButton
