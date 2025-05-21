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

interface Props extends ICommonButtonProps {
  children: React.ReactNode
}

// Convert Button to a function component for React 18+ compatibility
const Button: React.FC<Props> = (props) => {
  const { onClick, children, submit, reset, className, colorType, marginClasses, size, disabled } = props
  const btnClass = className ?? ''
  const btnColorType = colorType ?? 'primary'
  const btnMarginClasses = marginClasses ?? ''
  const btnSize = size ? `btn-${size}` : ''
  let buttonType: 'button' | 'submit' | 'reset' = 'button'
  if (submit) buttonType = 'submit'
  else if (reset) buttonType = 'reset'
  return (
    <button
      className={`btn ${btnSize} btn-${btnColorType} ${btnMarginClasses} ${btnClass}`}
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
