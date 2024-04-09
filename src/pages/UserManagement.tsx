import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Users from "../components/Admin/Users";

const UserManagement: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div>
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <TabList
          sx={{
            pt: 1,
            justifyContent: "left",
            [`&& .${tabClasses.root}`]: { 
              flex: "initial",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
                border: "none",
              },
              [`&.${tabClasses.selected}`]: {
                color: "primary.plainColor",
                "&::after": {
                  height: 2,
                  // border: "none",
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab indicatorInset>Users</Tab>
          <Tab indicatorInset>User roles</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            "--bg": theme.vars.palette.background.surface,
            background: "var(--bg)",
            boxShadow: "0 0 0 100vmax var(--bg)",
            clipPath: "inset(0 -100vmax)",
          })}
        >
          <TabPanel value={0}>
            <Users />
          </TabPanel>
          <TabPanel value={1}>user roles table</TabPanel>
        </Box>
      </Tabs>
    </div>
  );
};

export default UserManagement;
