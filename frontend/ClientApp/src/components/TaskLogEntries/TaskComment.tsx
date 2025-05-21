import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'

import Button from '../DisplayHelpers/Interface/Buttons/Button'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'

const LONG_COMMENT_LENGTH = 500

interface Props ***REMOVED***
  comment: string
***REMOVED***

const TaskComment = (***REMOVED*** comment ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const commentLength = comment.length

  const isLongComment = comment.length >= LONG_COMMENT_LENGTH

  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleButton = React.useCallback(() => ***REMOVED***
    setIsExpanded(!isExpanded)
***REMOVED*** [isExpanded])

  const displayComment =
    commentLength < 500 || isExpanded ? comment : comment.slice(0, 500)

  return (
    <div className="TaskComment">
      ***REMOVED***displayComment***REMOVED***
      ***REMOVED***isLongComment && (
        <div>
          <Button
            onClick=***REMOVED***toggleButton***REMOVED***
            marginClasses=***REMOVED***'my-2'***REMOVED***
            className="btn-sm"
            colorType="outline-primary"
          >
            ***REMOVED***isExpanded ? (
              <>
                <FAIcon name="minus" /> Show less
              </>
            ) : (
              <>
                <FAIcon name="plus" /> Show more***REMOVED***' '***REMOVED***
                <small className="text-muted">
                  (***REMOVED***commentLength.toLocaleString()***REMOVED*** chars total)
                </small>
              </>
            )***REMOVED***
          </Button>
        </div>
      )***REMOVED***
    </div>
  )
***REMOVED***

export default TaskComment
