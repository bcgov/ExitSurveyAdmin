import React from 'react'

const SEPARATOR = ' • '

interface IProps {
  pageSize: number
  currentPage: number
  resultCount: number
}

class PaginationLinks extends React.Component<IProps> {
  public render(): JSX.Element {
    const { pageSize, currentPage, resultCount } = this.props

    const nums = []

    for (let i = 0; i < resultCount / pageSize; i++) {
      if (i !== 0) nums.push(SEPARATOR)
      if (currentPage === i) {
        nums.push(i + 1)
      } else {
        nums.push(
          <a key={i} href={window.location.href}>
            {i + 1}
          </a>
        )
      }
    }

    return <div className="PaginationLinks text-muted">{nums}</div>
  }
}

export default PaginationLinks
