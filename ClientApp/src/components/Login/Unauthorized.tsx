import React from 'react'

import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'

const Unauthorized = (): JSX.Element => ***REMOVED***
  return (
    <div className="Centered row">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-4 my-5">Exit Survey Admin</h1>
        <h1 className="mb-4">
          <FAIcon name="exclamation-circle text-danger" /> Not authorized
        </h1>
        <p className="lead">
          You successfully logged in via Keycloak, but you do not have the
          correct permissions to use this application.
        </p>
        <p className="lead">
          Please contact the BC Stats team to obtain access.
        </p>
      </div>
    </div>
  )
***REMOVED***

export default Unauthorized
