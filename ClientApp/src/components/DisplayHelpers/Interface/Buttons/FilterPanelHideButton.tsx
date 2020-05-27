import React from 'react'
import IconButton from './IconButton'

interface IProps ***REMOVED***
  setExpanded: (expanded: boolean) => void
***REMOVED***

const FilterPanelHideButton = (***REMOVED*** setExpanded ***REMOVED***: IProps): JSX.Element => ***REMOVED***
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
        onClick=***REMOVED***(): void => setExpanded(true)***REMOVED***
      />
    </div>
  )
***REMOVED***

export default FilterPanelHideButton
