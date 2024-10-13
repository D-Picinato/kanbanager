import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './assets/scss/index.scss'

import { AppContextProvider } from './contexts/AppContext'

import DashboardLayout from './pages/DashboardLayout'
import ProjectsPage from './pages/Projects'
import AddProject from './pages/Projects/AddProject'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route path='' element={<ProjectsPage />}></Route>
            <Route path='addproject' element={<AddProject />}></Route>
            <Route path='settings'></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>,
)