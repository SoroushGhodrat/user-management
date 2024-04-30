import { Box, Button, Typography } from '@mui/joy'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useState } from 'react'
import UserDeleteModal from '../UserManagement/UserDetails/UserDeleteModal'
import { User } from '@/models/user'
import { setSelectedRows } from '@/store/features/table/selectedRowsSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'

interface SelectedRows {
  selectedRows: Record<string, boolean>
  setSelectedRows?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  users: User[]
}

const TableMultipleDelete: React.FC<SelectedRows> = ({ users, selectedRows }) => {
  const dispatch: AppDispatch = useDispatch()

  const userIds = Object.keys(selectedRows)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeMultipleDeleteRow = () => {
    dispatch(setSelectedRows({}))
  }

  const filterSelectedUsers = users.filter((user) => selectedRows[user.id])

  return (
    <>
      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={filterSelectedUsers}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,

          backgroundColor: '#e1eded',
        }}>
        <Typography sx={{ color: '#3E8A8B', m: 2 }}>
          {`${userIds.length} ${userIds.length !== 1 ? 'rows' : 'row'} selected`}
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Button sx={{ m: 2 }} color='neutral' variant='soft' onClick={closeMultipleDeleteRow}>
            Cancle
          </Button>

          <Button
            sx={{ m: 2 }}
            color='danger'
            variant='soft'
            onClick={openDeleteModal}
            startDecorator={<DeleteOutlineOutlinedIcon />}>
            Delete
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default TableMultipleDelete
