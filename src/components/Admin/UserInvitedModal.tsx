import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy'
import ForwardToInboxOutlined from '@mui/icons-material/ForwardToInboxOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Add from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import { emailValidator, emailNormalizer } from '@/utils/helpers/index'
import { InvitationType } from '@/models/user'

type DeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  invitationType: InvitationType
  resendEmail?: string
}

interface Email {
  id: number
  email: string
}

const UserInvitedModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  invitationType,
  resendEmail,
}) => {
  const [email, setEmail] = useState<string>('')
  const [emailsList, setEmailsList] = useState<Email[]>([])
  const [error, setError] = useState<string>('')

  const handleInputEmails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleCollectEmail = () => {
    // This is just a simple email validation. We need to check if the email already exists, if it's a duplicate, etc.
    if (!emailValidator(email)) {
      return setError('Invalid email format!')
    }

    setEmailsList((prevEmails) => {
      const sanitizedEmail = emailNormalizer(email)

      return [...prevEmails, { id: Date.now(), email: sanitizedEmail }]
    })

    setEmail('')
    setError('')
  }

  const handleDeleteEmail = (email_id: number) => {
    return () => {
      setEmailsList((prevEmails) => prevEmails.filter((email) => email.id !== email_id))
    }
  }

  const handleSentInvitation = () => {
    console.log('invitation sent!', emailsList)
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
            <ForwardToInboxOutlined sx={{ pr: 1 }} />
            {invitationType === 'multy' ? 'Invite users' : 'Resend invitation'}
          </Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: 'pointer' }} />
        </DialogTitle>

        <Divider inset='none' />

        {invitationType === 'multy' && (
          <Box>
            <FormLabel sx={{ mb: 1 }}>Email *</FormLabel>

            {/* Added email's list */}
            {emailsList.length !== 0 &&
              emailsList.map((email) => (
                <Box key={email.id} display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
                  <Input
                    name='email'
                    type='email'
                    value={email.email}
                    required
                    placeholder='example@email.com'
                    style={{ width: '100%' }}
                    onChange={handleInputEmails}
                  />
                  <Button
                    variant='outlined'
                    color='danger'
                    sx={{ p: 1, ml: 2 }}
                    onClick={handleDeleteEmail(email.id)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </Box>
              ))}

            {/* Add email form */}
            <Box display='flex' justifyContent='space-between'>
              <Input
                name='email'
                type='email'
                value={email}
                required
                placeholder='example@email.com'
                style={{ width: '100%' }}
                onChange={handleInputEmails}
              />
              <Button
                variant='outlined'
                color='neutral'
                sx={{ p: 1, ml: 1 }}
                onClick={handleCollectEmail}>
                <Add />
              </Button>
            </Box>
            <Typography color='danger' level='body-md'>
              {error}
            </Typography>
          </Box>
        )}

        {invitationType === 'resent' && (
          <Box>
            <Input name='email' type='email' value={resendEmail} required placeholder='' />
          </Box>
        )}

        <DialogActions>
          <Button
            disabled={invitationType === 'multy' && emailsList.length === 0}
            variant='solid'
            sx={{
              backgroundColor: emailsList.length < 0 ? 'neutral' : '#3E8A8B',
              color: emailsList.length < 0 ? 'neutral' : 'white',
            }}
            onClick={handleSentInvitation}>
            {invitationType === 'multy' ? 'Send invite' : 'Resend'}
            {emailsList.length > 0 && `(${emailsList.length})`}
          </Button>
          <Button variant='outlined' color='neutral' onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

export default UserInvitedModal
