import { Checkbox } from '@mui/joy'

type Headers = string | JSX.Element

const TableColumnsName = () => {
  const headers: Headers[] = [
    <Checkbox variant='outlined' size='sm' />,
    'Name',
    'Role',
    'Email',
    'Created on',
    'Phone',
    'Status',
    '',
  ]

  return (
    <tr>
      {headers.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
    </tr>
  )
}

export default TableColumnsName
