import React from 'react'
import FAIcon from '../Icons/FAIcon'
import Button, ***REMOVED*** ICommonButtonProps ***REMOVED*** from './Button'

import './IconButton.scss'

interface Props extends ICommonButtonProps ***REMOVED***
  buttonClasses?: string
  iconClasses?: string
  iconMarginClasses?: string
  iconName: string
  iconRight?: boolean
  iconType?: string
  label?: React.ReactNode
  submit?: boolean
  reset?: boolean
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
***REMOVED***

// Convert IconButton to a function component for compatibility with React 18+ JSX
const IconButton: React.FC<Props> = (props) => ***REMOVED***
  const ***REMOVED***
    buttonClasses,
    iconClasses,
    iconMarginClasses,
    iconName,
    iconRight,
    iconType,
    label,
    children,
    ...rest
***REMOVED*** = props

  const icon = (
    <FAIcon
      name=***REMOVED***iconName***REMOVED***
      type=***REMOVED***iconType***REMOVED***
      classes=***REMOVED***iconClasses***REMOVED***
      marginClasses=***REMOVED***iconMarginClasses***REMOVED***
    />
  )

  return (
    <Button ***REMOVED***...rest***REMOVED*** className=***REMOVED***buttonClasses***REMOVED***>
      ***REMOVED***!iconRight && icon***REMOVED***
      ***REMOVED***label***REMOVED***
      ***REMOVED***iconRight && icon***REMOVED***
      ***REMOVED***children***REMOVED***
    </Button>
  )
***REMOVED***

export default IconButton
