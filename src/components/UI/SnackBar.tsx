import { Box, Snackbar, Typography } from '@mui/joy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ClearIcon from '@mui/icons-material/Clear'

type VerticalPosition = 'top' | 'bottom'
type HorizontalPosition = 'left' | 'center' | 'right'
type Variant = 'plain' | 'outlined' | 'soft' | 'solid'
type Color = 'primary' | 'neutral' | 'danger' | 'success' | 'warning'

interface SnackbarProps {
  message: string
  open: boolean
  variant: Variant
  color: Color
  autoHideDuration: number
  vertical: VerticalPosition
  horizontal: HorizontalPosition
  onClose: () => void
}
// Based on the naming convention, the component name could be Snackbar or CustomSnackbar
const SnakeBar: React.FC<SnackbarProps> = ({
  message,
  vertical,
  horizontal,
  variant,
  color,
  open,
  autoHideDuration,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      variant={variant}
      color={color}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: vertical,
        horizontal: horizontal,
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          minWidth: 300,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DeleteOutlineIcon sx={{ pr: 1 }} />
          <Typography color='success'>{message}</Typography>
        </Box>
        <Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: 'pointer' }} />
        </Box>
      </Box>
    </Snackbar>
  )
}

export default SnakeBar
