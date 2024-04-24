import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { Button, Table } from '@mui/joy'
import { setSelectedRows } from '@/store/features/table/selectedRowsSlice'
import { useGetAllUsersQuery } from '@/store/features/users/usersSlice'
import CustomSkeleton from '@/components/UI/CustomSkeleton'
import TableRow from './Table/TableRow'
import TableFooter from './Table/TableFooter'
import TableColumnsName from './Table/TableColumnsName'
import TableHeader from './Table/TableHeader'
import TableViewMode from './Table/TableViewMode'
import TableMultipleDelete from './Table/TableMultipleDelete'

const UsersTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedRows = useSelector((state: RootState) => state.table.selectedRows)
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
  const rowsPerPage = useSelector((state: RootState) => state.pagination.rowsPerPage)

  // Using a query hook automatically fetches data and returns query values
  const { data: users = [], isLoading, isError, error, refetch } = useGetAllUsersQuery()

  // Slice the users array to get the users on the current page
  const usersOnCurrentPage = users?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  )

  // Check if any row is selected or not
  const areRowsSelected = Object.keys(selectedRows).length > 0

  const toggleRowSelected = (id: string) => {
    const newSelectedRows = { ...selectedRows }
    if (selectedRows[id]) {
      // If the user is already selected, remove them
      delete newSelectedRows[id]
    } else {
      // If the user is not selected, add them
      newSelectedRows[id] = true
    }
    // Dispatch setSelectedRows
    dispatch(setSelectedRows(newSelectedRows))
  }

  if (isLoading) {
    return <CustomSkeleton />
  }

  if (isError) {
    // Type guard to check if error is of type FetchBaseQueryError
    if ('status' in error) {
      console.warn('Error Details:', error)
      return (
        <div>
          <h2>Error occurred while fetching users</h2>
          <Button sx={{ backgroundColor: '#3E8A8B' }} onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )
    } else {
      // Handle other types of errors (e.g., SerializedError)
      return <div>An unexpected error occurred.</div>
    }
  }

  return (
    <>
      {/* Render table name and invite users CTA */}
      <TableHeader />

      {/* Render columns and Density CTA */}
      <TableViewMode />

      {/* Render multiple deletion CTA */}
      {areRowsSelected && <TableMultipleDelete selectedRows={selectedRows} users={users} />}

      <Table
        hoverRow={true}
        aria-label='users table'
        stickyFooter={false}
        stickyHeader={false}
        variant='plain'
        sx={{ tableLayout: 'auto' }}>
        <thead>
          <TableColumnsName />
        </thead>

        <tbody>
          {usersOnCurrentPage?.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isRowSelected={selectedRows[user.id] || false}
              toggleRowSelected={() => toggleRowSelected(user.id)}
              selectedRows={selectedRows}
            />
          ))}
        </tbody>

        <tfoot>
          <TableFooter users={users} />
        </tfoot>
      </Table>
    </>
  )
}

export default UsersTable
