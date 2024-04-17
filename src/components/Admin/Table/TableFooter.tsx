import { User } from "@/models/user";
import {
  Box,
  FormControl,
  IconButton,
  Select,
  Typography,
  Option,
} from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

interface TableHeaderProps {
  users: User[];
}

const TableFooter: React.FC<TableHeaderProps> = ({ users }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (
    _event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null,
  ) => {
    setRowsPerPage(value as number);
  };

  const usersOnCurrentPage = users.slice(
    (pageNumber - 1) * rowsPerPage,
    pageNumber * rowsPerPage,
  );

  return (
    <tr>
      {/* <td colSpan={headers.length} style={{ backgroundColor: "white" }}> */}
      <td colSpan={8} style={{ backgroundColor: "white" }}>
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
              users.length,
            )} of ${users.length}`}
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
              disabled={pageNumber >= Math.ceil(users.length / rowsPerPage)}
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
  );
};

export default TableFooter;
