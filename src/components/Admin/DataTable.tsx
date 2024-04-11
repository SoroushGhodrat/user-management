import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import React from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Dropdown,
  FormControl,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Option,
  Select,
  Table,
  Typography,
} from "@mui/joy";
import { DeleteForever, Edit, MoreVert, Person } from "@mui/icons-material";
import { User } from "../../models/user";
import { phoneFormater, dateFormater } from "../../helper/helper";

interface DataTableProps {
  usersOnCurrentPage: User[];
  headers: (string | JSX.Element)[];
  pageNumber: number;
  rowsPerPage: number;
  totalRows: number;
  handleEditUser: () => void;
  handleDeleteUser: () => void;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null
  ) => void;
}

const TableRow: React.FC<{
  user: User;
  handleEditUser: () => void;
  handleDeleteUser: () => void;
}> = ({ user, handleEditUser, handleDeleteUser }) => {
  const { id, image, name, family, isOwner, role, email, createdOn, countryCode, phone, status } =
    user;

  return (
    <tr key={id}>
      <td>
        <Checkbox label="" variant="outlined" size="sm" />
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
              <Chip sx={{ "--Chip-radius": "6px", background: "#D6EDED", ml: 2 }}>Owner</Chip>
            )}
          </Typography>
        </Box>
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

const DataTable: React.FC<DataTableProps> = ({
  headers,
  pageNumber,
  rowsPerPage,
  totalRows,
  handleChangePage,
  handleChangeRowsPerPage,
  usersOnCurrentPage,
  handleEditUser,
  handleDeleteUser,
}) => {
  return (
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

      {/* Table body */}
      <tbody>
        {usersOnCurrentPage?.map((user) => (
          <TableRow
            key={user.id}
            user={user}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
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
  );
};

export default DataTable;
