import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Dropdown,
  FormControl,
  IconButton,
  Input,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Option,
  Select,
  Sheet,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import {
  DeleteForever,
  DensitySmall,
  Edit,
  MoreVert,
  PeopleOutline,
  Person,
  ViewWeekOutlined,
  ForwardToInboxOutlined,
} from "@mui/icons-material";
import { User } from "@/models/user";
import { phoneFormater, dateFormater, firstLetterUppercase } from "@/utils/helpers/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteMultipleUsers, fetchUsers } from "@/store/features/users/usersSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomSkeleton from "@/components/UI/CustomSkeleton";
import StatusChip from "@/components/UI/StatusChip";
import UserDeleteModal from "./UserDeleteModal";
import EditUserModal from "./EditUserModal";
import UserInvitedModal from "./UserInvitedModal";

type TabName = "users" | "userRoles";
interface DataTableProps {
  usersOnCurrentPage: User[];
  headers: (string | JSX.Element)[];
  pageNumber: number;
  rowsPerPage: number;
  totalRows: number;
  tabName: TabName;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null
  ) => void;
}

const TableRow: React.FC<{
  user: User;
  tabName: TabName;
  handleMultipleDelete: (id: string) => void;
  isRowSelected: boolean;
  toggleRowSelected: () => void;
}> = ({ user, tabName, handleMultipleDelete, isRowSelected, toggleRowSelected }) => {
  const { id, image, name, family, isOwner, role, email, createdOn, countryCode, phone, status } =
    user;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
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

      <UserInvitedModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />

      <tr key={id} style={{ backgroundColor: isRowSelected ? "#e1eded" : "default" }}>
        {tabName === "users" && (
          <>
            <td>
              <Checkbox
                label=""
                variant="outlined"
                size="sm"
                checked={isRowSelected}
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
                <MenuButton slots={{ root: IconButton }} slotProps={{ root: { color: "neutral" } }}>
                  <MoreVert />
                </MenuButton>
                <Menu placement="bottom-end">
                  {status === "invited" && (
                    <MenuItem onClick={openInviteModal}>
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
                  <MenuItem variant="soft" color="danger" onClick={openDeleteModal}>
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
                <MenuButton slots={{ root: IconButton }} slotProps={{ root: { color: "neutral" } }}>
                  <MoreVert />
                </MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem>
                    <ListItemDecorator>
                      <Edit />
                    </ListItemDecorator>
                    Edit post
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

const DataTable: React.FC<DataTableProps> = ({
  headers,
  pageNumber,
  rowsPerPage,
  totalRows,
  tabName,
  handleChangePage,
  handleChangeRowsPerPage,
  usersOnCurrentPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, errorMessage, isSuccess } = useSelector(
    (state: RootState) => state.users
  );

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const toggleRowSelected = (id: string) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
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

  const handleDeleteMultiple = () => {
    dispatch(deleteMultipleUsers(selectedIds));
    setSelectedIds([]);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <UserInvitedModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />

      {isLoading && <CustomSkeleton />}

      {isError && <Typography color="danger">Error: {errorMessage}</Typography>}

      {!isLoading && isSuccess && (
        <Sheet variant="outlined" sx={{ minWidth: 1000, boxShadow: "sm", borderRadius: "sm" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              my: 3,
              mx: 2,
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <PeopleOutline />
              <Typography level="title-lg">
                {tabName === "users" ? "Users" : "User roles"}
              </Typography>
            </Stack>
            {tabName === "users" && (
              <Button sx={{ backgroundColor: "#3E8A8B" }} onClick={openInviteModal}>
                Invite users
              </Button>
            )}
            {tabName === "userRoles" && (
              <Button sx={{ backgroundColor: "#3E8A8B" }}>New user role</Button>
            )}
          </Box>

          <Divider />

          {/* Table view mode and search bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              m: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                border={1}
                padding={0.75}
                borderRadius="sm"
                color={"#5F5876"}
              >
                <ViewWeekOutlined fontSize="small" />
                <Typography level="body-xs" fontWeight="md">
                  Columns
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                border={1}
                padding={0.75}
                borderRadius="sm"
                color={"#5F5876"}
              >
                <DensitySmall fontSize="small" />
                <Typography level="body-xs" fontWeight="md">
                  Density
                </Typography>
              </Stack>
            </div>

            <Input placeholder="Search"></Input>
          </Box>

          <Divider />

          {/* Multiple user deletion */}
          {selectedIds.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,

                backgroundColor: "#e1eded",
              }}
            >
              <Typography sx={{ color: "#3E8A8B", m: 2 }}>
                {selectedIds.length} rows selected
              </Typography>

              <Button
                sx={{ m: 2 }}
                color="danger"
                variant="soft"
                onClick={handleDeleteMultiple}
                startDecorator={<DeleteOutlineOutlinedIcon />}
              >
                Delete
              </Button>
            </Box>
          )}

          <Divider />

          <Table
            hoverRow={true}
            aria-label="users table"
            stickyFooter={false}
            stickyHeader={false}
            variant="plain"
            sx={{ tableLayout: "auto" }}
          >
            {/* Table header */}
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>

            {/* Table rows */}
            <tbody>
              {usersOnCurrentPage?.map((user) => (
                <TableRow
                  key={user.id}
                  user={user}
                  tabName={tabName}
                  handleMultipleDelete={handleMultipleDelete}
                  isRowSelected={selectedRows[user.id] || false}
                  toggleRowSelected={() => {
                    setSelectedRows((prev) => ({
                      ...prev,
                      [user.id]: !prev[user.id],
                    }));
                  }}
                />
              ))}
            </tbody>

            {/* Table footer */}
            <tfoot>
              <tr>
                <td colSpan={headers.length} style={{ backgroundColor: "white" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      px: 2,
                    }}
                  >
                    <Typography>
                      {`Showing ${(pageNumber - 1) * rowsPerPage + 1} to ${Math.min(
                        pageNumber * rowsPerPage,
                        totalRows
                      )} of ${totalRows}`}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="plain"
                        disabled={pageNumber === 1}
                        onClick={() => handleChangePage(pageNumber - 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <KeyboardArrowLeftIcon />
                        <Typography>Back</Typography>
                      </IconButton>
                      <Typography>{pageNumber}</Typography>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="plain"
                        disabled={pageNumber >= Math.ceil(totalRows / rowsPerPage)}
                        onClick={() => handleChangePage(pageNumber + 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <Typography>Next</Typography>
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </Box>

                    <FormControl
                      orientation="horizontal"
                      size="sm"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography sx={{ mr: 1 }}>Show</Typography>
                      <Select
                        onChange={handleChangeRowsPerPage}
                        value={rowsPerPage}
                        defaultValue={10}
                        variant="plain"
                      >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                      </Select>
                      <Typography sx={{ ml: 1 }}>Show</Typography>
                    </FormControl>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
      )}
    </>
  );
};

export default DataTable;
