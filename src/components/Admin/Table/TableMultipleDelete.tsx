import { Box, Button, Typography } from "@mui/joy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteMultipleUsers } from "@/store/features/users/usersSlice";

interface SelectedRows {
  selectedRows: Record<string, boolean>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const TableMultipleDelete: React.FC<SelectedRows> = ({ selectedRows, setSelectedRows }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userIds = Object.keys(selectedRows);

  const handleDeleteMultipleUsers = () => {
    dispatch(deleteMultipleUsers(userIds));
    setSelectedRows({});
  };

  return (
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
        {`${userIds.length} ${userIds.length !== 1 ? "rows" : "row"} selected`}
      </Typography>

      <Button
        sx={{ m: 2 }}
        color="danger"
        variant="soft"
        onClick={handleDeleteMultipleUsers}
        startDecorator={<DeleteOutlineOutlinedIcon />}
      >
        Delete
      </Button>
    </Box>
  );
};

export default TableMultipleDelete;
