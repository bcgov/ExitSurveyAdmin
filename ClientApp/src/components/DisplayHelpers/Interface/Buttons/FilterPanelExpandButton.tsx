import React from 'react'
import IconButton from './IconButton'

interface IProps {
  setExpanded: (expanded: boolean) => void
}

const FilterPanelExpandButton = ({ setExpanded }: IProps): JSX.Element => {
  return (
    <div className="FilterPanelExpandButton">
      <IconButton
        iconType="fas"
        iconName={'caret-down'}
        label={`Hide filters`}
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

export default FilterPanelExpandButton
