import { DensitySmall, ViewWeekOutlined } from '@mui/icons-material'
import { Box, Divider, Input, Stack, Typography } from '@mui/joy'

const TableViewMode = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          m: 2,
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={1}
            border={1}
            padding={0.75}
            borderRadius='sm'
            color={'#5F5876'}>
            <ViewWeekOutlined fontSize='small' />
            <Typography level='body-xs' fontWeight='md'>
              Columns
            </Typography>
          </Stack>

          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={1}
            border={1}
            padding={0.75}
            borderRadius='sm'
            color={'#5F5876'}>
            <DensitySmall fontSize='small' />
            <Typography level='body-xs' fontWeight='md'>
              Density
            </Typography>
          </Stack>
        </div>

        <Input placeholder='Search'></Input>
      </Box>

      <Divider />
    </>
  )
}

export default TableViewMode
