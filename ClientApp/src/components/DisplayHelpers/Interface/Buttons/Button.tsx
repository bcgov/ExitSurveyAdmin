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

class Button extends React.Component<Props> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const ***REMOVED*** onClick, children, submit, reset ***REMOVED*** = this.props
    const className = this.props.className || ''
    const colorType = this.props.colorType || 'primary'
    const marginClasses = this.props.marginClasses || ''
    const size = this.props.size ? `btn-$***REMOVED***this.props.size***REMOVED***` : ''
    return (
      <button
        className=***REMOVED***`btn $***REMOVED***size***REMOVED*** btn-$***REMOVED***colorType***REMOVED*** $***REMOVED***marginClasses***REMOVED*** $***REMOVED***className***REMOVED***`***REMOVED***
        onClick=***REMOVED***onClick***REMOVED***
        type=***REMOVED***submit ? 'submit' : reset ? 'reset' : 'button'***REMOVED***
        disabled=***REMOVED***this.props.disabled***REMOVED***
      >
        ***REMOVED***children***REMOVED***
      </button>
    )
***REMOVED***
***REMOVED***

export default Button
