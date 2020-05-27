import React from 'react'
import IconButton from './IconButton'

interface IProps ***REMOVED***
  setExpanded: (expanded: boolean) => void
***REMOVED***

const FilterPanelExpandButton = (***REMOVED*** setExpanded ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  return (
    <div className="FilterPanelExpandButton">
      <IconButton
        iconType="fas"
        iconName=***REMOVED***'caret-down'***REMOVED***
        label=***REMOVED***`Hide filters`***REMOVED***
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

export default FilterPanelExpandButton
