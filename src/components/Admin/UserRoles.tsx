import { Checkbox, Box, Button, Input, Typography, Stack, Sheet, Divider } from "@mui/joy";
import CustomSkeleton from "../CustomSkeleton/CustomSkeleton";
import { PeopleOutline, ViewWeekOutlined, DensitySmall } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchUsers } from "../../store/features/users/usersSlice";

const UserRoles: React.FC = () => {
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
    "Action",
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, isError, errorMessage, isSuccess } = useSelector(
    (state: RootState) => state.users
  );

  const handleChangeRowsPerPage = (
    _event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: number | null
  ) => {
    setRowsPerPage(value as number);
  };

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
  };
  const handleEditUser = () => {
    console.log("Open actions");
  };

  const handleDeleteUser = () => {
    console.log("Delete user");
  };
  const usersOnCurrentPage = users.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {isLoading && <CustomSkeleton />}

      {isError && <Typography color="danger">Error: {errorMessage}</Typography>}

      {isSuccess && (
        <Sheet variant="outlined" sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}>
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
              <Typography level="title-lg">Users</Typography>
            </Stack>
            <Button>New user role</Button>
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
          />
        </Sheet>
      )}
    </>
  );
};

export default UserRoles;
