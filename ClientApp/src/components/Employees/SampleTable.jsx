import React from 'react'
import styled from 'styled-components'
import ***REMOVED*** useSortBy, useTable ***REMOVED*** from 'react-table'

import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table ***REMOVED***
    border-spacing: 0;
    border: 1px solid black;

    tr ***REMOVED***
      :last-child ***REMOVED***
        td ***REMOVED***
          border-bottom: 0;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

    th,
    td ***REMOVED***
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child ***REMOVED***
        border-right: 0;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
`

function Table(***REMOVED*** columns, data ***REMOVED***) ***REMOVED***
  const ***REMOVED***
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
***REMOVED*** = useTable(
    ***REMOVED***
      columns,
      data
  ***REMOVED***
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table ***REMOVED***...getTableProps()***REMOVED***>
        <thead>
          ***REMOVED***headerGroups.map(headerGroup => (
            <tr ***REMOVED***...headerGroup.getHeaderGroupProps()***REMOVED***>
              ***REMOVED***headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th ***REMOVED***...column.getHeaderProps(column.getSortByToggleProps())***REMOVED***>
                  ***REMOVED***column.render('Header')***REMOVED***
                  ***REMOVED***/* Add a sort direction indicator */***REMOVED***
                  <span>
                    ***REMOVED***column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''***REMOVED***
                  </span>
                </th>
              ))***REMOVED***
            </tr>
          ))***REMOVED***
        </thead>
        <tbody ***REMOVED***...getTableBodyProps()***REMOVED***>
          ***REMOVED***firstPageRows.map((row, i) => ***REMOVED***
            prepareRow(row)
            return (
              <tr ***REMOVED***...row.getRowProps()***REMOVED***>
                ***REMOVED***row.cells.map(cell => ***REMOVED***
                  return <td ***REMOVED***...cell.getCellProps()***REMOVED***>***REMOVED***cell.render('Cell')***REMOVED***</td>
              ***REMOVED***)***REMOVED***
              </tr>
            )
        ***REMOVED***)***REMOVED***
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of ***REMOVED***rows.length***REMOVED*** rows</div>
    </>
  )
***REMOVED***

function App() ***REMOVED***
  const columns = React.useMemo(
    () => [
      ***REMOVED***
        Header: 'Name',
        columns: [
          ***REMOVED***
            Header: 'First Name',
            accessor: 'firstName'
        ***REMOVED***
          ***REMOVED***
            Header: 'Last Name',
            accessor: 'lastName'
        ***REMOVED***
        ]
    ***REMOVED***
      ***REMOVED***
        Header: 'Info',
        columns: [
          ***REMOVED***
            Header: 'Age',
            accessor: 'age'
        ***REMOVED***
          ***REMOVED***
            Header: 'Visits',
            accessor: 'visits'
        ***REMOVED***
          ***REMOVED***
            Header: 'Status',
            accessor: 'status'
        ***REMOVED***
          ***REMOVED***
            Header: 'Profile Progress',
            accessor: 'progress'
        ***REMOVED***
        ]
    ***REMOVED***
    ],
    []
  )

  const data = React.useMemo(() => makeData(2000), [])

  return (
    <Styles>
      <Table columns=***REMOVED***columns***REMOVED*** data=***REMOVED***data***REMOVED*** />
    </Styles>
  )
***REMOVED***

export default App
