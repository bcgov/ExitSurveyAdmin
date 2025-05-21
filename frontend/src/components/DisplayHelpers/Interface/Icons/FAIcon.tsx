import React from 'react'

interface Props ***REMOVED***
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
 *   'me-2', for a 2-unit right margin in Bootstrap.
 */
const FAIcon: React.FC<Props> = (***REMOVED*** type = 'fas', name, classes = '', marginClasses = 'me-1' ***REMOVED***) => ***REMOVED***
  return <i className=***REMOVED***`$***REMOVED***type***REMOVED*** fa-$***REMOVED***name***REMOVED*** $***REMOVED***classes***REMOVED*** $***REMOVED***marginClasses***REMOVED***`***REMOVED***></i>
***REMOVED***

export default FAIcon
