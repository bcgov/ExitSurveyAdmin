import React from 'react'

import ***REMOVED***
  Button,
  Card,
  CardBody,
  CardDeck,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle
***REMOVED*** from 'reactstrap'

import './Home.scss'

export class Home extends React.Component ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <div>
        <h1 className="mt-5">Exit Survey Admin web interface</h1>
        <div className="row">
          <div className="col-4">
            <h2>Task logs</h2>
            <table className="table">
              <thead>
                <th></th>
                <th>Date</th>
                <th>Status</th>
              </thead>
              <tbody>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>2019/12/10 Tue </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>2019/12/09 Mon </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>2019/12/08 Sun </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>2019/12/07 Sat </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td className="text-success">&#x2B24;</td>
                  <td>2019/12/06 Fri </td>
                  <td>Success</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary">View more</button>
          </div>
        </div>
      </div>
    )
***REMOVED***
***REMOVED***
