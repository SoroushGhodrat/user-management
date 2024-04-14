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
} from "@mui/joy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { User } from "../../models/user";
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store/features/users/usersSlice'; 

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog" size={"lg"} sx={{ p: 3, minWidth: 500 }}>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DeleteOutlineIcon sx={{ pr: 1 }} />
            Delete: {user.name} {user.family}
          </Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: "pointer" }} />
        </DialogTitle>

        <Divider inset="none" />

        <DialogContent>Are you sure you want to delete:</DialogContent>

        <List marker="circle">
          <ListItem>
            {user.name} {user.family}
          </ListItem>
        </List>

        <DialogContent>
          <Typography color="danger">NOTE: This action is permanent.</Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => dispatch(deleteUser(user.id))}>
            Yes, delete
          </Button>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
