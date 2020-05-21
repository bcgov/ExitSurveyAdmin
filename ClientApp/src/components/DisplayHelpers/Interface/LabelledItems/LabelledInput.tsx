import React from 'react'
import slugify from 'slugify'

import LabelledItem from './LabelledItem'

interface IProps {
  title: string
  placeholder: string
}

class LabelledInput extends React.Component<IProps> {
  public render(): JSX.Element {
    const { title, placeholder } = this.props
    const id = slugify(title)
    return (
      <LabelledItem>
        <label htmlFor={id}>{title}</label>
        <input
          id={id}
          className="form-control"
          type="text"
          placeholder={`e.g. ${placeholder}`}
        />
      </LabelledItem>
    )
  }
}

export default LabelledInput
