import { User } from '@/models/user'
import { Box, FormControl, IconButton, Select, Typography, Option } from '@mui/joy'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentPage,
  setRowsPerPage,
  setTotalPages,
} from '@/store/features/table/paginationSlice'
interface TableHeaderProps {
  users: User[]
}

const TableFooter: React.FC<TableHeaderProps> = ({ users }) => {
  const dispatch: AppDispatch = useDispatch()
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
  const rowsPerPage = useSelector((state: RootState) => state.pagination.rowsPerPage)

  // Calculate the start and end of the current page
  const start = Math.min((currentPage - 1) * rowsPerPage + 1, users.length)
  const end = Math.min(currentPage * rowsPerPage, users.length)

  // Update the current page whenever the users change
  const handleChangePage = (newPage: number) => {
    dispatch(setCurrentPage(newPage))
  }
  // Update the total pages whenever the users change
  const handleChangeRowsPerPage = (
    _event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null,
  ) => {
    dispatch(setRowsPerPage(value as number))
  }

  // Update the total pages whenever the users change
  useEffect(() => {
    dispatch(setTotalPages(Math.ceil(users.length / 10)))
  }, [users, dispatch])

  return (
    <tr>
      <td colSpan={8} style={{ backgroundColor: 'white' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'space-between',
            backgroundColor: 'white',
            px: 2,
          }}>
          <Typography>{`Showing ${start} to ${end} of ${users.length}`}</Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton
              size='sm'
              color='neutral'
              variant='plain'
              disabled={currentPage === 1}
              onClick={() => handleChangePage(currentPage - 1)}
              sx={{ bgcolor: 'background.surface' }}>
              <KeyboardArrowLeftIcon />
              <Typography>Back</Typography>
            </IconButton>
            <Typography>{currentPage}</Typography>
            <IconButton
              size='sm'
              color='neutral'
              variant='plain'
              disabled={end >= users.length}
              onClick={() => handleChangePage(currentPage + 1)}
              sx={{ bgcolor: 'background.surface' }}>
              <Typography>Next</Typography>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>

          <FormControl
            orientation='horizontal'
            size='sm'
            sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>Show</Typography>
            <Select
              onChange={handleChangeRowsPerPage}
              value={rowsPerPage}
              defaultValue={10}
              variant='plain'>
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={25}>25</Option>
            </Select>
            <Typography sx={{ ml: 1 }}>Show</Typography>
          </FormControl>
        </Box>
      </td>
    </tr>
  )
}

export default TableFooter
