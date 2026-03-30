import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Clarity from '@microsoft/clarity'
import '@ds/tokens/inject'
import '@ds/tokens/globals.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

Clarity.init('qpoynbbcm1')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
