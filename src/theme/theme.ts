/**
 * It is custom theme file for MUI. It is used to override the default theme of MUI components.
 * It applied to the whole application by wrapping the App component with ThemeProvider in the main.tsx file.
 **/

import { extendTheme } from '@mui/joy'
import { alpha } from '@mui/system'

const colors = {
  primary: '#245269',
  neutral: '#b0bec5',
  danger: '#d32f2f',
  success: '#388e3c',
  warning: '#ffa000',
}

const theme = extendTheme({
  components: {
    JoyButton: {
      variants: Object.entries(colors).flatMap(([color, value]) => [
        {
          props: { variant: 'plain', color },
          style: {
            color: value,
            '&:hover': {
              backgroundColor: alpha(value, 0.1),
            },
          },
        },
        {
          props: { variant: 'outlined', color },
          style: {
            borderColor: value,
            color: value,
            '&:hover': {
              backgroundColor: alpha(value, 0.1),
            },
          },
        },
        {
          props: { variant: 'soft', color },
          style: {
            backgroundColor: alpha(value, 0.1),
            color: value,
            '&:hover': {
              backgroundColor: alpha(value, 0.2),
            },
          },
        },
        {
          props: { variant: 'solid', color },
          style: {
            backgroundColor: value,
            color: '#fff',
            '&:hover': {
              backgroundColor: alpha(value, 0.9),
            },
          },
        },
      ]),
    },
  },
})

export default theme
