import React from 'react'

export interface ICommonButtonProps {
  colorType?: string
  className?: string
  marginClasses?: string
  onClick?: () => void
  size?: string
  submit?: boolean
  reset?: boolean
  disabled?: boolean
}

interface IProps extends ICommonButtonProps {
  children: React.ReactNode
  icon?: string
}

class Button extends React.Component<IProps> {
  public render(): JSX.Element {
    const { onClick, children, submit, reset } = this.props
    const className = this.props.className || ''
    const colorType = this.props.colorType || 'primary'
    const marginClasses = this.props.marginClasses || ''
    const size = this.props.size ? `btn-${this.props.size}` : ''
    return (
      <button
        className={`btn ${size} btn-${colorType} ${marginClasses} ${className}`}
        onClick={onClick}
        type={submit ? 'submit' : reset ? 'reset' : 'button'}
        disabled={this.props.disabled}
      >
        {children}
      </button>
    )
  }
}

export default Button
