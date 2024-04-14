import { Box, Typography } from "@mui/joy";
import UserManagement from "./UserManagement";

const Admin: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#FBFCFE", p: 2, borderRadius: 20 }}>
      <header>
        <Typography level="h3">User management</Typography>
        <Typography level="body-md" sx={{ py: 2 }}>
          Invite, manage and update users.
        </Typography>
      </header>
      <UserManagement />
    </Box>
  );
};

export default Admin;
