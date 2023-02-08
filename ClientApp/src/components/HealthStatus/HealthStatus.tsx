import React from 'react'

import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithoutAuth } from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'

type Props = {}

interface State {
  status?: string
}

class HealthStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { status: undefined }

    this.populateData = this.populateData.bind(this)
  }

  componentDidMount(): void {
    this.populateData()
  }

  render(): JSX.Element {
    const contents =
      this.state.status === undefined ? (
        <p>
          <em>
            Loading health check; if this does not disappear soon, API is
            probably down.
          </em>
        </p>
      ) : (
        <p>{this.state.status}</p>
      )

    return (
      <ContentWrapper>
        <h1>Health status</h1>
        {contents}
      </ContentWrapper>
    )
  }

  async populateData(): Promise<void> {
    await requestJSONWithoutAuth(
      `api/healthstatus/status`,
      'get',
      null,
      'HEALTH_STATUS_FAILED',
      (responseJSON: FixTypeLater): void => {
        this.setState({ status: responseJSON.msg })
      }
    )
  }
}

export default HealthStatus
