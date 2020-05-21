import React from 'react'
import IconButton from './IconButton'

interface IProps ***REMOVED***
  filter: string
  value: string
***REMOVED***

class ActiveFilterButton extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const ***REMOVED*** filter, value ***REMOVED*** = this.props

    return (
      <IconButton
        label=***REMOVED***
          <React.Fragment>
            ***REMOVED***filter***REMOVED***: <strong>***REMOVED***value***REMOVED***</strong>
          </React.Fragment>
      ***REMOVED***
        iconName="times"
        marginClasses="mr-1 mb-0"
        iconMarginClasses="ml-2"
        colorType="brand-secondary"
        iconRight
        size="sm"
      />
    )
***REMOVED***
***REMOVED***

export default ActiveFilterButton
