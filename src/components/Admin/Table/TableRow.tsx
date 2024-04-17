import { useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import {
  DeleteForever,
  Edit,
  MoreVert,
  Person,
  ForwardToInboxOutlined,
} from "@mui/icons-material";
import { User } from "@/models/user";
import {
  phoneFormater,
  dateFormater,
  firstLetterUppercase,
} from "@/utils/helpers/index";
import StatusChip from "@/components/UI/StatusChip";
import UserDeleteModal from "../UserDeleteModal";
import EditUserModal from "../EditUserModal";
import UserInvitedModal from "../UserInvitedModal";
import { TabName } from "@/models/user";

const TableRow: React.FC<{
  user: User;
  handleMultipleDelete?: (id: string) => void;
  isRowSelected?: any;
  toggleRowSelected: () => void;
  selectedRows: Record<string, boolean>;
}> = ({ user, toggleRowSelected, selectedRows }) => {
  const {
    id,
    image,
    name,
    family,
    isOwner,
    role,
    email,
    createdOn,
    countryCode,
    phone,
    status,
  } = user;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [resendEmail, setResendEmail] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tabName = (localStorage.getItem("tabName") as TabName) || "users";

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openInviteModal = (email: string) => {
    setIsInviteModalOpen(true);
    setResendEmail(email);
  };

  const handleMultipleDelete = (id: string) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        // If the id is already in the array, remove it
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        // If the id is not in the array, add it
        return [...prevIds, id];
      }
    });
  };

  const handleCheckboxChange = () => {
    handleMultipleDelete(id);
    toggleRowSelected();
  };

  return (
    <>
      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={user}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />

      <UserInvitedModal
        invitationType="resent"
        resendEmail={resendEmail}
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <tr
        key={id}
        style={{ backgroundColor: user.id in selectedRows ? "#e1eded" : "" }}
      >
        {tabName === "users" && (
          <>
            <td>
              <Checkbox
                label=""
                variant="outlined"
                size="sm"
                // checked={isRowSelected}
                onChange={handleCheckboxChange}
              />
            </td>
            <td>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {image ? (
                  <Avatar size="md" src={image} alt={name} />
                ) : (
                  <Avatar>
                    <Person fontSize="large" />
                  </Avatar>
                )}
                <Typography>
                  {name} {family}
                  {isOwner && (
                    <Chip
                      sx={{
                        "--Chip-radius": "6px",
                        background: "#D6EDED",
                        ml: 2,
                      }}
                    >
                      Owner
                    </Chip>
                  )}
                </Typography>
              </Box>
            </td>
            <td>{firstLetterUppercase(role)}</td>
            <td>{email}</td>
            <td style={{ width: "auto" }}>{dateFormater(createdOn)}</td>
            <td>{`${countryCode} ${phoneFormater(phone)}`}</td>
            <td>
              <StatusChip status={status}>{status}</StatusChip>
            </td>
            <td>
              {/* Actions */}
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { color: "neutral" } }}
                >
                  <MoreVert />
                </MenuButton>
                <Menu placement="bottom-end">
                  {status === "invited" && (
                    <MenuItem onClick={() => openInviteModal(email)}>
                      <ListItemDecorator>
                        <ForwardToInboxOutlined />
                      </ListItemDecorator>
                      Resend invite
                    </MenuItem>
                  )}

                  <MenuItem onClick={openEditModal}>
                    <ListItemDecorator>
                      <Edit />
                    </ListItemDecorator>
                    Edit
                  </MenuItem>

                  <ListDivider />
                  <MenuItem
                    variant="soft"
                    color="danger"
                    onClick={openDeleteModal}
                  >
                    <ListItemDecorator sx={{ color: "inherit" }}>
                      <DeleteForever />
                    </ListItemDecorator>
                    Delete
                  </MenuItem>
                </Menu>
              </Dropdown>
            </td>
          </>
        )}
        {tabName === "userRoles" && (
          <>
            <td>
              <Checkbox label="" variant="outlined" size="sm" />
            </td>
            <td>{role}</td>
            <td style={{ width: "auto" }}>{dateFormater(createdOn)}</td>
            <td>{status}</td>
            <td>
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { color: "neutral" } }}
                >
                  <MoreVert />
                </MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem>
                    <ListItemDecorator>
                      <Edit />
                    </ListItemDecorator>
                    Edit permissions
                  </MenuItem>
                  <ListDivider />
                  <MenuItem variant="soft" color="danger">
                    <ListItemDecorator sx={{ color: "inherit" }}>
                      <DeleteForever />
                    </ListItemDecorator>
                    Delete
                  </MenuItem>
                </Menu>
              </Dropdown>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default TableRow;
