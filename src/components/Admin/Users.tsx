import {
  Checkbox,
  Table,
  Avatar,
  Chip,
  Box,
  Button,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Input,
  Typography,
  Stack,
  Sheet,
  Divider,
  FormControl,
  Select,
} from "@mui/joy";
import CustomSkeleton from "../CustomSkeleton/CustomSkeleton";
import {
  Person,
  DeleteForever,
  Edit,
  MoreVert,
  PeopleOutline,
  ViewWeekOutlined,
  DensitySmall,
} from "@mui/icons-material";
import { phoneFormater, dateFormater } from "../../helper/helper";

import { User } from "../../models/user";
import { useEffect, useState } from "react";
import Option from "@mui/joy/Option";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import useTanStackQuery from "../../hooks/useTanStackQuery";

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const { id, image, name, family, isOwner, role, email, createdOn, countryCode, phone, status } =
    user;

  return (
    <tr key={id}>
      <td>
        <Checkbox label="" variant="outlined" size="sm" />
      </td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {image ? (
            <Avatar size="md" src={image} alt={name} />
          ) : (
            <Avatar>
              <Person fontSize="large" />
            </Avatar>
          )}

          <p>
            {name} {family}
            {isOwner && (
              <Chip sx={{ "--Chip-radius": "6px", background: "#D6EDED", ml: 2 }}>Owner</Chip>
            )}
          </p>
        </div>
      </td>
      <td>{role}</td>
      <td>{email}</td>
      <td style={{ width: "auto" }}>{dateFormater(createdOn)}</td>
      <td>{`${countryCode} ${phoneFormater(phone)}`}</td>
      <td>{status}</td>
      <td>
        <Dropdown>
          <MenuButton slots={{ root: IconButton }} slotProps={{ root: { color: "neutral" } }}>
            <MoreVert />
          </MenuButton>
          <Menu placement="bottom-end">
            <MenuItem onClick={handleEditUser}>
              <ListItemDecorator>
                <Edit />
              </ListItemDecorator>
              Edit post
            </MenuItem>
            <ListDivider />
            <MenuItem variant="soft" color="danger" onClick={handleDeleteUser}>
              <ListItemDecorator sx={{ color: "inherit" }}>
                <DeleteForever />
              </ListItemDecorator>
              Delete
            </MenuItem>
          </Menu>
        </Dropdown>
      </td>
    </tr>
  );
};
const handleEditUser = () => {
  console.log("Open actions");
};

const handleDeleteUser = () => {
  console.log("Delete user");
};

const Users: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [allUsers, setAllUsers] = useState<T>([]);

  const { data, isLoading, isError, error, isSuccess } = useTanStackQuery({
    queryKey: "Users List",
    API: `http://localhost:8000/DUMMY_USERS`,
    retry: 2,
    gcTime: 5000,
  });

  const handleChangeRowsPerPage = (
    _event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null
  ) => {
    setRowsPerPage(value as number);
  };

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    if (data) {
      setAllUsers(data);
    }
  }, [data]);

  const usersOnCurrentPage = allUsers.slice(
    (pageNumber - 1) * rowsPerPage,
    pageNumber * rowsPerPage
  );

  console.log("data", data);

  return (
    <>
      {isLoading && <CustomSkeleton />}

      {isError && <Typography>Error: {error.message}</Typography>}

      {isSuccess && (
        <Sheet variant="outlined" sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              mt: 3,
              mb: 3,
              ml: 2,
              mr: 2,
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <PeopleOutline />
              <Typography level="title-lg">Users</Typography>
            </Stack>
            <Button>Invite users</Button>
          </Box>

          <Divider />

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

          <Table
            hoverRow={true}
            aria-label="users table"
            stickyFooter={false}
            stickyHeader={false}
            // borderAxis="x"
            variant="plain"
            sx={{ tableLayout: "auto" }}
          >
            <thead>
              <tr>
                <th>
                  <Checkbox variant="outlined" size="sm" />
                </th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Created on</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersOnCurrentPage?.map((user: User) => (
                <UserRow user={user} key={user.id} />
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={8} style={{ backgroundColor: "white" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: "space-between",
                      backgroundColor: "white",
                    }}
                  >
                    <Typography>
                      {`Showing ${(pageNumber - 1) * rowsPerPage + 1} to ${Math.min(
                        pageNumber * rowsPerPage,
                        allUsers.length
                      )} of ${allUsers.length}`}
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
                        disabled={pageNumber >= Math.ceil(allUsers.length / rowsPerPage)}
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

export default Users;
