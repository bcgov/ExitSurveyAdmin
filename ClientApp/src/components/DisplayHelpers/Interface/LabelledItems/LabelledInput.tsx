import React from 'react'
import slugify from 'slugify'

import LabelledItem from './LabelledItem'

interface IProps ***REMOVED***
  title: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
***REMOVED***

const LabelledInput = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** title, name, placeholder, onChange ***REMOVED*** = props
  const id = slugify(title)
  return (
    <LabelledItem>
      <label htmlFor=***REMOVED***id***REMOVED***>***REMOVED***title***REMOVED***</label>
      <input
        id=***REMOVED***id***REMOVED***
        name=***REMOVED***name***REMOVED***
        className="form-control"
        type="text"
        placeholder=***REMOVED***placeholder***REMOVED***
        onChange=***REMOVED***onChange***REMOVED***
      />
    </LabelledItem>
  )
***REMOVED***

export default LabelledInput
