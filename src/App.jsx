import React, { useState } from 'react'
import './index.css'
import Path from './Components/Path'
import { createTheme, ThemeProvider } from '@mui/material/styles';
export const AppContext = React.createContext()
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()

const theme = createTheme({
  typography: {
    fontFamily: 'Source Sans Pro',
  },
});


function App() {
  const [userLogin, setUserLogin] = useState({
    email: "", password: ""
  })
  const [count, setCount] = useState(1)
  const [page, setPage] = useState(1)
  const [ocrValue, setOCRValue] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState(false);
  const [formValue, setFormValue] = useState({
    batch_number: null
  })
  const [module, setModule] = useState(0)
  const contextValue = { userLogin, setUserLogin, count, setCount, page, setPage, module, setModule, ocrValue, setOCRValue, formValue, setFormValue, selectedSuggestion, setSelectedSuggestion }
  return (
    < >
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={contextValue}>
          <ThemeProvider theme={theme}>
            <Path />
          </ThemeProvider>
        </AppContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App