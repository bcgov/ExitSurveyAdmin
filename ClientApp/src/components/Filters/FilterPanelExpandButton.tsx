import React from 'react'

import IconButton from '../DisplayHelpers/Interface/Buttons/IconButton'

interface Props {
  toggleExpanded: () => void
}

const FilterPanelExpandButton = ({ toggleExpanded }: Props): JSX.Element => {
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
        onClick={(): void => toggleExpanded()}
      />
    </div>
  )
}

export default FilterPanelExpandButton
