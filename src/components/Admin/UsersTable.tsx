import { useEffect, useState } from "react";
import TableRow from "./Table/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import TableFooter from "./Table/TableFooter";
import TableColumnsName from "./Table/TableColumnsName";
import { Table } from "@mui/joy";
import { fetchUsers } from "@/store/features/users/usersSlice";
import TableHeader from "./Table/TableHeader";
import TableViewMode from "./Table/TableViewMode";
import TableMultipleDelete from "./Table/TableMultipleDelete";
import { setSelectedRows } from "@/store/features/table/selectedRowsSlice";

const UsersTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const selectedRows = useSelector((state: RootState) => state.table.selectedRows);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const usersOnCurrentPage = users.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage);

  // Check if any row is selected or not
  const areRowsSelected = Object.keys(selectedRows).length > 0;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const toggleRowSelected = (id: string) => {
    const newSelectedRows = { ...selectedRows };
    if (selectedRows[id]) {
      // If the user is already selected, remove them
      delete newSelectedRows[id];
    } else {
      // If the user is not selected, add them
      newSelectedRows[id] = true;
    }
    // Dispatch setSelectedRows action with new state
    dispatch(setSelectedRows(newSelectedRows));
  };

  return (
    <>
      {/* Render table name and invite users CTA */}
      <TableHeader />

      {/* Render columns and Density CTA */}
      <TableViewMode />

      {/* Render multiple deletion CTA */}
      {areRowsSelected && <TableMultipleDelete selectedRows={selectedRows} users={users} />}

      <Table
        hoverRow={true}
        aria-label="users table"
        stickyFooter={false}
        stickyHeader={false}
        variant="plain"
        sx={{ tableLayout: "auto" }}
      >
        <thead>
          <TableColumnsName />
        </thead>

        <tbody>
          {usersOnCurrentPage?.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isRowSelected={selectedRows[user.id] || false}
              toggleRowSelected={() => toggleRowSelected(user.id)}
              selectedRows={selectedRows}
            />
          ))}
        </tbody>

        <tfoot>
          <TableFooter users={users} />
        </tfoot>
      </Table>
    </>
  );
};

export default UsersTable;
