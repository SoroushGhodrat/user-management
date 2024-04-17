import { Box, Typography } from '@mui/joy'
import UserManagement from './UserManagement.page'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import {
  setDeleteMultipleUsersStatus,
  setDeleteUserStatus,
  setUpdateUserStatus,
} from '@/store/features/users/usersSlice'
import Snackbar from '@/components/UI/SnackBar'

const Admin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isDeleteUserSuccess, isUpdateUserSuccess, isDeleteMultipleUsersSuccess } = useSelector(
    (state: RootState) => state.users,
  )
  const onClose = () => {
    dispatch(setDeleteUserStatus(false))
    dispatch(setUpdateUserStatus(false))
    dispatch(setDeleteMultipleUsersStatus(false))
  }

  return (
    <>
      {isDeleteUserSuccess && (
        <Snackbar
          message='User deleted successfully!'
          vertical='top'
          horizontal='center'
          variant='soft'
          color='success'
          autoHideDuration={3000}
          open={isDeleteUserSuccess}
          onClose={onClose}
        />
      )}

      {isDeleteMultipleUsersSuccess && (
        <Snackbar
          message='Users deleted successfully!'
          vertical='top'
          horizontal='center'
          variant='soft'
          color='success'
          autoHideDuration={3000}
          open={isDeleteMultipleUsersSuccess}
          onClose={onClose}
        />
      )}

      {isUpdateUserSuccess && (
        <Snackbar
          message='User updated successfully!'
          vertical='top'
          horizontal='center'
          variant='soft'
          color='success'
          autoHideDuration={3000}
          open={isUpdateUserSuccess}
          onClose={onClose}
        />
      )}

      <Box sx={{ bgcolor: '#FBFCFE', p: 2, borderRadius: 20 }}>
        <header>
          <Typography level='h3'>User management</Typography>
          <Typography level='body-md' sx={{ py: 2 }}>
            Invite, manage and update users.
          </Typography>
        </header>
        <UserManagement />
      </Box>
    </>
  )
}

export default Admin
