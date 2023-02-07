import React from 'react'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithoutAuth ***REMOVED*** from '../../helpers/requestHelpers'
import ContentWrapper from '../Wrappers/ContentWrapper'

type Props = ***REMOVED******REMOVED***

interface State ***REMOVED***
  status?: string
***REMOVED***

class HealthStatus extends React.Component<Props, State> ***REMOVED***
  constructor(props: Props) ***REMOVED***
    super(props)
    this.state = ***REMOVED*** status: undefined ***REMOVED***

    this.populateData = this.populateData.bind(this)
***REMOVED***

  componentDidMount(): void ***REMOVED***
    this.populateData()
***REMOVED***

  render(): JSX.Element ***REMOVED***
    const contents =
      this.state.status === undefined ? (
        <p>
          <em>
            Loading health check; if this does not disappear soon, API is
            probably down.
          </em>
        </p>
      ) : (
        <p>***REMOVED***this.state.status***REMOVED***</p>
      )

    return (
      <ContentWrapper>
        <h1>Health status</h1>
        ***REMOVED***contents***REMOVED***
      </ContentWrapper>
    )
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    await requestJSONWithoutAuth(
      `api/healthstatus/status`,
      'get',
      null,
      'HEALTH_STATUS_FAILED',
      (responseJSON: FixTypeLater): void => ***REMOVED***
        this.setState(***REMOVED*** status: responseJSON.msg ***REMOVED***)
    ***REMOVED***
    )
***REMOVED***
***REMOVED***

export default HealthStatus
