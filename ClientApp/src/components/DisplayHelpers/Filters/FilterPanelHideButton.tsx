import React from 'react'
import IconButton from '../Interface/Buttons/IconButton'

interface IProps ***REMOVED***
  toggleExpanded: () => void
***REMOVED***

const FilterPanelHideButton = (***REMOVED*** toggleExpanded ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  return (
    <div className="FilterPanelHideButton">
      <IconButton
        iconType="fas"
        iconName=***REMOVED***'caret-right'***REMOVED***
        label=***REMOVED***`Expand filters`***REMOVED***
        iconRight
        iconMarginClasses="ml-2"
        colorType="secondary"
        buttonClasses="NoOutline NoBackground Faded"
        iconClasses="fa-lg"
        onClick=***REMOVED***(): void => toggleExpanded()***REMOVED***
      />
    </div>
  )
***REMOVED***

export default FilterPanelHideButton
