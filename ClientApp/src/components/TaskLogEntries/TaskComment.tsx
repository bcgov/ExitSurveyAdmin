import React from 'react'

import Button from '../DisplayHelpers/Interface/Buttons/Button'
import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'

const LONG_COMMENT_LENGTH = 500

interface Props {
  comment: string
}

const TaskComment = ({ comment }: Props): JSX.Element => {
  const commentLength = comment.length

  const isLongComment = comment.length >= LONG_COMMENT_LENGTH

  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleButton = React.useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  const displayComment =
    commentLength < 500 || isExpanded ? comment : comment.slice(0, 500)

  return (
    <div className="TaskComment">
      {displayComment}
      {isLongComment && (
        <div>
          <Button
            onClick={toggleButton}
            marginClasses={'my-2'}
            className="btn-sm"
            colorType="outline-primary"
          >
            {isExpanded ? (
              <>
                <FAIcon name="minus" /> Show less
              </>
            ) : (
              <>
                <FAIcon name="plus" /> Show more{' '}
                <small className="text-muted">
                  ({commentLength.toLocaleString()} chars total)
                </small>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

export default TaskComment
