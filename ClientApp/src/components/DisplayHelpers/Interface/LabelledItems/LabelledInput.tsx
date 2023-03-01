import React from 'react'
import slugify from 'slugify'

import LabelledItem from './LabelledItem'

interface Props {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  title: string
}

const LabelledInput = (props: Props): JSX.Element => {
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
        onInput={onChange} // onInput, unlike onChange, fires upon pasting text
      />
    </LabelledItem>
  )
}

export default LabelledInput
