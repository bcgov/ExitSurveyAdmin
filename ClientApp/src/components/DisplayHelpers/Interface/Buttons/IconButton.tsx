import React from 'react'
import FAIcon from '../Icons/FAIcon'
import Button, { ICommonButtonProps } from './Button'

import './IconButton.scss'

interface IProps extends ICommonButtonProps {
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
}

class IconButton extends React.Component<IProps> {
  public render(): JSX.Element {
    const {
      buttonClasses,
      iconClasses,
      iconMarginClasses,
      iconName,
      iconRight,
      iconType,
      label
    } = this.props

    const icon = (
      <FAIcon
        name={iconName}
        type={iconType}
        classes={iconClasses}
        marginClasses={iconMarginClasses}
      />
    )

    return (
      <Button {...this.props} className={buttonClasses}>
        {!iconRight && icon}
        {label}
        {iconRight && icon}
      </Button>
    )
  }
}

export default IconButton
