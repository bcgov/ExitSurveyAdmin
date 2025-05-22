import React from 'react'
import FAIcon from '../Icons/FAIcon'
import Button, { ICommonButtonProps } from './Button'

import './IconButton.scss'

interface Props extends ICommonButtonProps {
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
}

// Convert IconButton to a function component for compatibility with React 18+ JSX
const IconButton: React.FC<Props> = (props) => {
  const {
    buttonClasses,
    iconClasses,
    iconMarginClasses,
    iconName,
    iconRight,
    iconType,
    label,
    children,
    ...rest
  } = props

  const icon = (
    <FAIcon
      name={iconName}
      type={iconType}
      classes={iconClasses}
      marginClasses={iconMarginClasses}
    />
  )

  return (
    <Button {...rest} className={buttonClasses}>
      {!iconRight && icon}
      {label}
      {iconRight && icon}
      {children}
    </Button>
  )
}

export default IconButton
