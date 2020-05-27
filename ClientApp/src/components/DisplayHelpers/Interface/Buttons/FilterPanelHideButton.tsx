import React from 'react'
import IconButton from './IconButton'

interface IProps {
  setExpanded: (expanded: boolean) => void
}

const FilterPanelHideButton = ({ setExpanded }: IProps): JSX.Element => {
  return (
    <div className="FilterPanelHideButton">
      <IconButton
        iconType="fas"
        iconName={'caret-right'}
        label={`Expand filters`}
        iconRight
        iconMarginClasses="ml-2"
        colorType="secondary"
        buttonClasses="NoOutline NoBackground Faded"
        iconClasses="fa-lg"
        onClick={(): void => setExpanded(true)}
      />
    </div>
  )
}

export default FilterPanelHideButton
