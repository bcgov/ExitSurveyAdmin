import React from 'react'

export interface ICommonButtonProps ***REMOVED***
  colorType?: string
  className?: string
  marginClasses?: string
  onClick?: () => void
  size?: string
  submit?: boolean
  reset?: boolean
  disabled?: boolean
***REMOVED***

interface Props extends ICommonButtonProps ***REMOVED***
  children: React.ReactNode
  icon?: string
***REMOVED***

// Convert Button to a function component for React 18+ compatibility
const Button: React.FC<Props> = (props) => ***REMOVED***
  const ***REMOVED*** onClick, children, submit, reset, className, colorType, marginClasses, size, disabled ***REMOVED*** = props
  const btnClass = className ?? ''
  const btnColorType = colorType ?? 'primary'
  const btnMarginClasses = marginClasses ?? ''
  const btnSize = size ? `btn-$***REMOVED***size***REMOVED***` : ''
  let buttonType: 'button' | 'submit' | 'reset' = 'button'
  if (submit) buttonType = 'submit'
  else if (reset) buttonType = 'reset'
  return (
    <button
      className=***REMOVED***`btn $***REMOVED***btnSize***REMOVED*** btn-$***REMOVED***btnColorType***REMOVED*** $***REMOVED***btnMarginClasses***REMOVED*** $***REMOVED***btnClass***REMOVED***`***REMOVED***
      onClick=***REMOVED***onClick***REMOVED***
      type=***REMOVED***buttonType***REMOVED***
      disabled=***REMOVED***disabled***REMOVED***
    >
      ***REMOVED***children***REMOVED***
    </button>
  )
***REMOVED***

export default Button
