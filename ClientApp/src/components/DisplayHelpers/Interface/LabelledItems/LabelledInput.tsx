import React from 'react'
import slugify from 'slugify'

import LabelledItem from './LabelledItem'

interface Props ***REMOVED***
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  title: string
***REMOVED***

const LabelledInput = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED*** title, name, placeholder, onChange ***REMOVED*** = props
  const id = slugify(title)
  return (
    <LabelledItem>
      <label htmlFor=***REMOVED***id***REMOVED***>***REMOVED***title***REMOVED***</label>
      <input
        id=***REMOVED***id***REMOVED***
        name=***REMOVED***name***REMOVED***
        className="form-control form-control-sm"
        type="text"
        placeholder=***REMOVED***placeholder || title***REMOVED***
        onInput=***REMOVED***onChange***REMOVED*** // onInput, unlike onChange, fires upon pasting text
      />
    </LabelledItem>
  )
***REMOVED***

export default LabelledInput
