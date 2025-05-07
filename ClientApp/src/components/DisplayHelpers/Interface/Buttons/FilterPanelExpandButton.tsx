import React from 'react'
import IconButton from './IconButton'

interface Props ***REMOVED***
  toggleExpanded: () => void
***REMOVED***

const FilterPanelExpandButton = (***REMOVED*** toggleExpanded ***REMOVED***: Props): JSX.Element => ***REMOVED***
  return (
    <div className="FilterPanelExpandButton">
      <IconButton
        iconType="fas"
        iconName=***REMOVED***'caret-down'***REMOVED***
        label=***REMOVED***`Hide filters`***REMOVED***
        iconRight
        iconMarginClasses="ms-2"
        colorType="secondary"
        buttonClasses="NoOutline NoBackground Faded"
        iconClasses="fa-lg"
        onClick=***REMOVED***(): void => toggleExpanded()***REMOVED***
      />
    </div>
  )
***REMOVED***

export default FilterPanelExpandButton
