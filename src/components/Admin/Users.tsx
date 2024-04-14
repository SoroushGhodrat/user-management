import { Checkbox } from "@mui/joy";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchUsers } from "../../store/features/users/usersSlice";

const Users: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const headers = [
    <Checkbox variant="outlined" size="sm" />,
    "Name",
    "Role",
    "Email",
    "Created on",
    "Phone",
    "Status",
    "",
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  const handleChangeRowsPerPage = (
    _event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null,
  ) => {
    setRowsPerPage(value as number);
  };

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleEditUser = (userId: string) => {
    console.log(`user id: ${userId} to edit action`);
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`user id: ${userId} to delete action`);
  };

  const usersOnCurrentPage = users.slice(
    (pageNumber - 1) * rowsPerPage,
    pageNumber * rowsPerPage,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <DataTable
      headers={headers}
      pageNumber={pageNumber}
      rowsPerPage={rowsPerPage}
      totalRows={users.length}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      usersOnCurrentPage={usersOnCurrentPage}
      handleEditUser={handleEditUser}
      handleDeleteUser={handleDeleteUser}
      tabName="users"
    />
  );
};

export default Users;
