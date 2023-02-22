import React from 'react'
import slugify from 'slugify'

import LabelledItem from './LabelledItem'

interface IProps {
  title: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

const LabelledInput = (props: IProps): JSX.Element => {
  const { title, name, placeholder, onChange } = props
  const id = slugify(title)
  return (
    <LabelledItem>
      <label htmlFor={id}>{title}</label>
      <input
        id={id}
        name={name}
        className="form-control form-control-sm"
        type="text"
        placeholder={placeholder || title}
        onChange={onChange}
      />
    </LabelledItem>
  )
}

export default LabelledInput
