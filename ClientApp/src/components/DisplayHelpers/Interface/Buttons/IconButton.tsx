import React from 'react'
import FAIcon from '../Icons/FAIcon'
import Button, ***REMOVED*** ICommonButtonProps ***REMOVED*** from './Button'

import './IconButton.scss'

interface IProps extends ICommonButtonProps ***REMOVED***
  iconClasses?: string
  iconMarginClasses?: string
  iconName: string
  iconRight?: boolean
  iconType?: string
  label: React.ReactNode
***REMOVED***

class IconButton extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const ***REMOVED***
      iconClasses,
      iconMarginClasses,
      iconName,
      iconRight,
      iconType,
      label
  ***REMOVED*** = this.props

    const icon = (
      <FAIcon
        name=***REMOVED***iconName***REMOVED***
        type=***REMOVED***iconType***REMOVED***
        classes=***REMOVED***iconClasses***REMOVED***
        marginClasses=***REMOVED***iconMarginClasses***REMOVED***
      />
    )

    return (
      <Button ***REMOVED***...this.props***REMOVED***>
        ***REMOVED***!iconRight && icon***REMOVED***
        ***REMOVED***label***REMOVED***
        ***REMOVED***iconRight && icon***REMOVED***
      </Button>
    )
***REMOVED***
***REMOVED***

export default IconButton
