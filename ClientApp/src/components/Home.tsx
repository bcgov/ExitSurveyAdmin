import React from 'react'

import './Home.scss'

export class Home extends React.Component ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <div className="Home">
        <h1 className="mt-5">Exit Survey Admin web interface</h1>
        <div className="row">
          <div className="col-4">
            <h2>Task logs</h2>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>
                    Tuesday
                    <br />
                    <span className="text-muted">2019/12/10 10:32am</span>
                  </td>
                  <td>
                    Reconcile CSV
                    <br />
                    Send email
                    <br />
                    Pull survey status
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>
                    Monday
                    <br />
                    <span className="text-muted">2019/12/09 10:32am</span>
                  </td>
                  <td>
                    Reconcile CSV
                    <br />
                    Send email
                    <br />
                    Pull survey status
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>
                    Sunday
                    <br />
                    <span className="text-muted">2019/12/08 10:32am</span>
                  </td>
                  <td>
                    Reconcile CSV
                    <br />
                    Send email
                    <br />
                    Pull survey status
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>
                    Saturday
                    <br />
                    <span className="text-muted">2019/12/07 10:32am</span>
                  </td>
                  <td>
                    Reconcile CSV
                    <br />
                    Send email
                    <br />
                    Pull survey status
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>
                    Friday
                    <br />
                    <span className="text-muted">2019/12/06 10:32am</span>
                  </td>
                  <td>
                    Reconcile CSV
                    <br />
                    Send email
                    <br />
                    Pull survey status
                  </td>
                  <td>Success</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-secondary">View more</button>
          </div>
        </div>
      </div>
    )
***REMOVED***
***REMOVED***
