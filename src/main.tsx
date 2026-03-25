import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ds/tokens/inject'
import '@ds/tokens/globals.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
