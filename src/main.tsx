import { ThemeProvider } from '@mui/joy'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from '@/theme/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

/**
 * Added ThemeProvider to the main.tsx file to apply the custom theme to the whole application.
 */
