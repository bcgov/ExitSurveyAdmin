import React from 'react'

interface IProps ***REMOVED***
  type?: string
  name: string
  classes?: string
  marginClasses?: string
***REMOVED***

/**
 * A Font Awesome icon, represented by an <i> tag. Font Awesome must be included
 * in the project for these to work.
 *
 * @param type The style of the icon, e.g. 'fas', 'far', 'fal', 'fad', 'fab'.
 *   Defaults to 'fas'.
 * @param name The name of the icon, e.g. 'camera'. Does not need to be prefixed
 *   with 'fa-'.
 * @param classes Custom classes to apply to the icon. Defaults to empty string.
 * @param marginClasses The margin classes to apply to the icon. Defaults to
 *   'mr-2', for a 2-unit right margin in Bootstrap.
 */
class FAIcon extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const type = this.props.type || 'fas'
    const name = this.props.name
    const classes = this.props.classes || ''
    const marginClasses = this.props.marginClasses || 'mr-1'
    return <i className=***REMOVED***`$***REMOVED***type***REMOVED*** fa-$***REMOVED***name***REMOVED*** $***REMOVED***classes***REMOVED*** $***REMOVED***marginClasses***REMOVED***`***REMOVED***></i>
***REMOVED***
***REMOVED***

export default FAIcon
