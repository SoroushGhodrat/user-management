import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/joy'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'

type EditUserPermissionModalProps = {
  isOpen: boolean
  onClose: () => void
}

const EditUserPermissionModal: React.FC<EditUserPermissionModalProps> = ({ isOpen, onClose }) => {
  const userRoles = {
    admin: ['Manage users', 'Manage roles', 'View reports', 'Edit settings'],
    electrician: ['View tasks', 'Update task status', 'Add notes to tasks', 'View schedule'],
    projectManager: [
      'Create tasks',
      'Assign tasks',
      'View project progress',
      'Edit project details',
    ],
    technicalManager: [
      'View technical specs',
      'Update technical specs',
      'Approve tasks',
      'View schedule',
    ],
    supervisor: [
      'View workers',
      'Assign tasks to workers',
      'Approve completed tasks',
      'View reports',
    ],
  }

  const [selectedRole, setSelectedRole] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole((event.target as HTMLInputElement).value)
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog variant='outlined' role='alertdialog' size={'lg'} sx={{ p: 3, minWidth: 700 }}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DriveFileRenameOutlineOutlinedIcon sx={{ pr: 1 }} />
            Edit:
          </Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: 'pointer' }} />
        </DialogTitle>

        <Divider inset='none' />
        <Box>
          {Object.entries(userRoles).map(([userGroup, roles]) => (
            <FormControl key={userGroup}>
              <FormLabel>{userGroup}</FormLabel>
              <RadioGroup aria-label={userGroup} value={selectedRole} onChange={handleChange}>
                {roles.map((role) => (
                  <Box key={role}>
                    <Radio value={role} />
                    <label>{role}</label>
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
          ))}
        </Box>

        <Divider inset='none' />

        <DialogActions>
          <Button variant='outlined' color='neutral' onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

export default EditUserPermissionModal
