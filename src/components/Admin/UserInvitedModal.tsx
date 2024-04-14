import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import ForwardToInboxOutlined from "@mui/icons-material/ForwardToInboxOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Add from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { emailValidator } from "../../helper/helper";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface Email {
  id: number;
  email: string;
}

const UserInvitedModal: React.FC<DeleteModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [emailsList, setEmailsList] = useState<Email[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputEmails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCollectEmail = () => {
    // it just a simple email validation. we need to check the email is already exist or not, duplicate email, etc.
    if (!emailValidator(email)) {
      return setError("Invalid email");
    }

    setEmailsList((prevEmails) => [...prevEmails, { id: Date.now(), email }]);

    setEmail("");
    setError("");
  };

  const handleDeleteEmail = () => {
    console.log("delete email");
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog" size={"lg"} sx={{ p: 3, minWidth: 500 }}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ForwardToInboxOutlined sx={{ pr: 1 }} />
            Invite users
          </Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: "pointer" }} />
        </DialogTitle>

        <Divider inset="none" />

        <FormControl>
          <FormLabel>Email *</FormLabel>
          <Box display="flex" justifyContent="space-between">
            <Input
              name="email"
              type="email"
              value={email}
              required
              placeholder="example@email.com"
              style={{ width: "100%" }}
              onChange={handleInputEmails}
            />
            <Button
              variant="outlined"
              color="neutral"
              sx={{ p: 1, ml: 1 }}
              onClick={handleCollectEmail}
            >
              <Add />
            </Button>
            {/* <Button variant="outlined" color="neutral" sx={{ p: 1, ml: 1 }}>
              <DeleteOutlineOutlinedIcon />
            </Button> */}
          </Box>
          <Typography color="danger">{error}</Typography>
        </FormControl>

        {/* <Box>
          <Button variant="outlined" color="neutral" startDecorator={<Add />}>
            Add more
          </Button>
        </Box> */}

        <Box>
          {emailsList.length !== 0 && <Typography>Invitation List</Typography>}

          <List marker="circle">
            {emailsList.map((email) => (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItem key={email.id}>{email.email}</ListItem>
                <Button variant="outlined" color="neutral" sx={{ p: 1, ml: 1 }}>
                  <DeleteOutlineOutlinedIcon onClick={handleDeleteEmail} />
                </Button>
              </Box>
            ))}
          </List>
        </Box>

        <DialogActions>
          <Button disabled={emailsList.length === 0} variant="solid" color="neutral">
            Send invite
          </Button>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default UserInvitedModal;
