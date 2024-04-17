import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  FormControl,
  Input,
  FormLabel,
  Select,
  Option,
} from "@mui/joy";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { User } from "@/models/user";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/features/users/usersSlice";
import { Role } from "@/models/user";
import { useState } from "react";
import { AppDispatch } from "@/store";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

// role value should call from backend through API
const role: Role[] = ["admin", "electrician", "project manager", "technical manager", "supervisor"];

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState({
    name: user.name,
    family: user.family,
    email: user.email,
    phone: user.phone,
    role: user.role,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
  // check if the data has been changed
  // const isDataChanged = () => {
  //   if (JSON.stringify(formValues) === JSON.stringify(formValues)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const handleSelectChange = (_event: React.SyntheticEvent | null, newValue: string | null) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      role: newValue as Role,
    }));
  };

  // dispatch the updated user to the store
  const handleUpdateUser = () => {
    const updatedUser = {
      ...user,
      ...formValues,
    };
    dispatch(updateUser(updatedUser));
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog" size={"lg"} sx={{ p: 3, minWidth: 700 }}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DriveFileRenameOutlineOutlinedIcon sx={{ pr: 1 }} />
            Edit: {user.name} {user.family}
          </Box>
          <ClearIcon onClick={onClose} sx={{ pr: 1, cursor: "pointer" }} />
        </DialogTitle>

        <Divider inset="none" />

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Placeholder"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Family</FormLabel>
          <Input
            name="family"
            placeholder="Placeholder"
            value={formValues.family}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            placeholder="Placeholder"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            placeholder="Placeholder"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select name="role" defaultValue={user.role} onChange={handleSelectChange}>
            {role.map((roleName) => (
              <Option key={roleName} value={roleName}>
                {roleName}
              </Option>
            ))}
          </Select>
        </FormControl>

        <DialogActions>
          <Button variant="solid" color="danger" onClick={handleUpdateUser}>
            Update
          </Button>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancle
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default EditUserModal;
