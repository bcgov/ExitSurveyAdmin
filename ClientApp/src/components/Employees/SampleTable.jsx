/* eslint react/jsx-key: "off" */

import React from 'react'
import styled from 'styled-components'
import ***REMOVED*** usePagination, useTable ***REMOVED*** from 'react-table'

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

  .pagination ***REMOVED***
    padding: 0.5rem;
***REMOVED***
`

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table(***REMOVED***
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount
***REMOVED***) ***REMOVED***
  const ***REMOVED***
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: ***REMOVED*** pageIndex, pageSize ***REMOVED***
***REMOVED*** = useTable(
    ***REMOVED***
      columns,
      data,
      initialState: ***REMOVED*** pageIndex: 0 ***REMOVED***, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount
  ***REMOVED***
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => ***REMOVED***
    fetchData(***REMOVED*** pageIndex, pageSize ***REMOVED***)
***REMOVED*** [fetchData, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <>
      <pre>
        <code>
          ***REMOVED***JSON.stringify(
            ***REMOVED***
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage
          ***REMOVED***
            null,
            2
          )***REMOVED***
        </code>
      </pre>
      <table ***REMOVED***...getTableProps()***REMOVED***>
        <thead>
          ***REMOVED***headerGroups.map(headerGroup => (
            <tr ***REMOVED***...headerGroup.getHeaderGroupProps()***REMOVED***>
              ***REMOVED***headerGroup.headers.map(column => (
                <th ***REMOVED***...column.getHeaderProps()***REMOVED***>
                  ***REMOVED***column.render('Header')***REMOVED***
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
          ***REMOVED***page.map((row, i) => ***REMOVED***
            prepareRow(row)
            return (
              <tr ***REMOVED***...row.getRowProps()***REMOVED***>
                ***REMOVED***row.cells.map(cell => ***REMOVED***
                  return <td ***REMOVED***...cell.getCellProps()***REMOVED***>***REMOVED***cell.render('Cell')***REMOVED***</td>
              ***REMOVED***)***REMOVED***
              </tr>
            )
        ***REMOVED***)***REMOVED***
          <tr>
            ***REMOVED***loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing ***REMOVED***page.length***REMOVED*** of ~***REMOVED***controlledPageCount * pageSize***REMOVED******REMOVED***' '***REMOVED***
                results
              </td>
            )***REMOVED***
          </tr>
        </tbody>
      </table>
      ***REMOVED***/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */***REMOVED***
      <div className="pagination">
        <button onClick=***REMOVED***() => gotoPage(0)***REMOVED*** disabled=***REMOVED***!canPreviousPage***REMOVED***>
          ***REMOVED***'<<'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <button onClick=***REMOVED***() => previousPage()***REMOVED*** disabled=***REMOVED***!canPreviousPage***REMOVED***>
          ***REMOVED***'<'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <button onClick=***REMOVED***() => nextPage()***REMOVED*** disabled=***REMOVED***!canNextPage***REMOVED***>
          ***REMOVED***'>'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <button onClick=***REMOVED***() => gotoPage(pageCount - 1)***REMOVED*** disabled=***REMOVED***!canNextPage***REMOVED***>
          ***REMOVED***'>>'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <span>
          Page***REMOVED***' '***REMOVED***
          <strong>
            ***REMOVED***pageIndex + 1***REMOVED*** of ***REMOVED***pageOptions.length***REMOVED***
          </strong>***REMOVED***' '***REMOVED***
        </span>
        <span>
          | Go to page:***REMOVED***' '***REMOVED***
          <input
            type="number"
            defaultValue=***REMOVED***pageIndex + 1***REMOVED***
            onChange=***REMOVED***e => ***REMOVED***
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
          ***REMOVED******REMOVED***
            style=***REMOVED******REMOVED*** width: '100px' ***REMOVED******REMOVED***
          />
        </span>***REMOVED***' '***REMOVED***
        <select
          value=***REMOVED***pageSize***REMOVED***
          onChange=***REMOVED***e => ***REMOVED***
            setPageSize(Number(e.target.value))
        ***REMOVED******REMOVED***
        >
          ***REMOVED***[10, 20, 30, 40, 50].map(pageSize => (
            <option key=***REMOVED***pageSize***REMOVED*** value=***REMOVED***pageSize***REMOVED***>
              Show ***REMOVED***pageSize***REMOVED***
            </option>
          ))***REMOVED***
        </select>
      </div>
    </>
  )
***REMOVED***

// Let's simulate a large dataset on the server (outside of our component)
const serverData = makeData(10000)

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

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback((***REMOVED*** pageSize, pageIndex ***REMOVED***) => ***REMOVED***
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => ***REMOVED***
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) ***REMOVED***
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize
        setData(serverData.slice(startRow, endRow))

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(serverData.length / pageSize))

        setLoading(false)
    ***REMOVED***
  ***REMOVED*** 1000)
***REMOVED*** [])

  return (
    <Styles>
      <Table
        columns=***REMOVED***columns***REMOVED***
        data=***REMOVED***data***REMOVED***
        fetchData=***REMOVED***fetchData***REMOVED***
        loading=***REMOVED***loading***REMOVED***
        pageCount=***REMOVED***pageCount***REMOVED***
      />
    </Styles>
  )
***REMOVED***

export default App
