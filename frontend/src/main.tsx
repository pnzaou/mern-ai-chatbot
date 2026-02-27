import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/authContext.tsx'
import { Toaster } from 'react-hot-toast'

const theme = createTheme({ typography : { fontFamily: "Roboto Slab, serif", allVariants: { color: "white"} }});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
