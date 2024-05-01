import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ClearIcon from '@mui/icons-material/Clear'
import { User } from '@/models/user'
import { useDispatch } from 'react-redux'
import {
  deleteMultipleUsers,
  deleteUser,
  useGetAllUsersQuery,
} from '@/store/features/users/usersSlice'

import { setSelectedRows } from '@/store/features/table/selectedRowsSlice'
import { AppDispatch } from '@/store'

type UserDeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  user: User[] | Record<string, boolean> | User
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({ isOpen, onClose, user }) => {
  const dispatch: AppDispatch = useDispatch()
  const { refetch } = useGetAllUsersQuery()

  const userIds = Array.isArray(user) ? user.map((_user: User) => _user.id) : []

  const handleDeleteUser = (userId: string) => {
    if (Array.isArray(user)) {
      dispatch(deleteMultipleUsers(userIds))
      dispatch(setSelectedRows({}))
      refetch()
    } else {
      dispatch(deleteUser(userId))
      refetch()
      onClose()
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog variant='outlined' role='alertdialog' size={'lg'} sx={{ p: 3, minWidth: 500 }}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DeleteOutlineIcon sx={{ pr: 1 }} />
            {Array.isArray(user) && user.length > 1 && 'Delete Multiple Users'}
            {Array.isArray(user) &&
              user.length === 1 &&
              `Delete: ${user[0].name} ${user[0].family}`}
            {!Array.isArray(user) && `${user.name} ${user.family}`}
          </Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: 'pointer' }} />
        </DialogTitle>

        <Divider inset='none' />

        <DialogContent>Are you sure you want to delete:</DialogContent>

        {/* List of user(s) to be deleted */}
        <List marker='circle'>
          {Array.isArray(user) ? (
            user.map((u) => <ListItem key={u.id}>{`${u.name} ${u.family}`}</ListItem>)
          ) : (
            <ListItem>{`${user.name} ${user.family}`}</ListItem>
          )}
        </List>

        <DialogContent>
          <Typography color='danger'>NOTE: This action is permanent.</Typography>
        </DialogContent>

        <DialogActions>
          <Button variant='solid' color='danger' onClick={() => handleDeleteUser(user.id)}>
            Yes, delete
          </Button>
          <Button variant='outlined' color='neutral' onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

export default UserDeleteModal
