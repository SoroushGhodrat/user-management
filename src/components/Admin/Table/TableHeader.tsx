import { TabName } from '@/models/user'
import { PeopleOutline } from '@mui/icons-material'
import { Box, Button, Divider, Typography } from '@mui/joy'
import { useState } from 'react'
import UserInvitedModal from '../UserInvitedModal'

const TableHeader = () => {
  const tabName = (localStorage.getItem('tab_name') as TabName) || 'users'
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const openInviteModal = () => {
    setIsInviteModalOpen(true)
  }

  return (
    <>
      <UserInvitedModal
        invitationType='multy'
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          my: 3,
          mx: 2,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}>
          <PeopleOutline />
          <Typography level='title-lg'>{tabName === 'users' ? 'Users' : 'User Roles'}</Typography>
        </Box>
        {tabName === 'users' && <Button onClick={openInviteModal}>Invite users</Button>}
        {tabName === 'userRoles' && <Button>New user role</Button>}
      </Box>
      <Divider />
    </>
  )
}

export default TableHeader
