import { TabName } from '@/models/user'
import { Box } from '@mui/joy'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

type Headers = string | JSX.Element

const TableColumnNames = () => {
  const tabName = (localStorage.getItem('tab_name') as TabName) || 'users'

  const userColumnNames: Headers[] = [
    // <Checkbox variant='outlined' size='sm' label='' />,
    '',
    'Name',
    'Role',
    'Email',
    'Created on',
    'Phone',
    'Status',
    '',
  ]

  const roleColumnNames: Headers[] = [
    // <Checkbox variant='outlined' size='sm' label='' />,
    '',
    'Role',
    'Created on',
    'Status',
    '',
  ]

  const headers = tabName === 'users' ? userColumnNames : roleColumnNames

  const arrowBlackList = ['', 'Phone']

  return (
    <tr>
      {headers.map((header, index) => (
        <th key={index}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {header}
            {typeof header === 'string' && !arrowBlackList.includes(header) && (
              <ArrowDownwardIcon sx={{ color: 'blue', fontSize: '1rem', pl: 1 }} />
            )}
          </Box>
        </th>
      ))}
    </tr>
  )
}

export default TableColumnNames
