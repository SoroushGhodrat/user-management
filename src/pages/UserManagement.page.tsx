import { Tabs, TabList, TabPanel, Box } from '@mui/joy'
import Tab, { tabClasses } from '@mui/joy/Tab'
import { useState } from 'react'
import Users from '@/components/Admin/Users'
import UserRoles from '@/components/Admin/UserRoles'

const UserManagement: React.FC = () => {
  const [index, setIndex] = useState<number>(0)

  const handleTabNameChange = (value: number) => {
    value === 0
      ? localStorage.setItem('tab name', 'users')
      : localStorage.setItem('tab name', 'userRoles')
  }

  return (
    <Box>
      <Tabs
        aria-label='Pipeline'
        value={index}
        onChange={(_event, value) => {
          setIndex(value as number), handleTabNameChange(value as number)
        }}>
        <TabList
          sx={{
            pt: 1,
            justifyContent: 'left',
            [`&& .${tabClasses.root}`]: {
              flex: 'initial',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
                border: 'none',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                '&::after': {
                  height: 2,
                  // border: "none",
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: 'primary.500',
                },
              },
            },
          }}>
          <Tab indicatorInset>Users</Tab>
          <Tab indicatorInset>User roles</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.surface,
            background: 'var(--bg)',
            clipPath: 'inset(0 -100vmax)',
          })}>
          <TabPanel value={0}>
            <Users />
          </TabPanel>

          <TabPanel value={1}>
            <UserRoles />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  )
}

export default UserManagement
