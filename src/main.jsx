import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Styles
import './assets/scss/index.scss'

// Contexts
import { AppContextProvider } from './contexts/AppContext'
import { NavContextProvider } from './contexts/NavContext'
import { ModalContextProvider } from './contexts/ModalContext'

// Dashboard Layout
import DashboardLayout from './pages/DashboardLayout'

// Main menu
import MainOutlet from './pages/Main'
import ProjectsPage from './pages/Main/Projects'
import AddProject from './pages/Main/AddProject'
import SettingsPage from './pages/Main/Settings'

// Project menu
import ProjectOutlet from './pages/Project'
import ProjectSettings from './pages/Project/Settings'
import ProjectCreateIssue from './pages/Project/CreateIssue'
import ProjectQuadro from './pages/Project/Quadro'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* Contexto com os estados da Aplicação */}
    <AppContextProvider>

      {/* Contexto com os estados da Navbar */}
      <NavContextProvider>

        {/* Contexto para controlar o Modal e seus estados */}
        <ModalContextProvider>

          <BrowserRouter>
            <Routes>

              {/* DASHBOARD */}
              <Route path='/' element={<DashboardLayout />}>

                {/* MAIN */}
                <Route path='' element={<MainOutlet />}>

                  {/* PROJETOS */}
                  <Route path='' element={<ProjectsPage />}></Route>

                  {/* ADICIONAR PROJETO */}
                  <Route path='addproject' element={<AddProject />}></Route>

                  {/* CONFIGURAÇÕES */}
                  <Route path='settings' element={<SettingsPage />}></Route>

                </Route>
                {/* MAIN */}

                {/* PROJETO */}
                <Route path='projects/:PROJECTID' element={<ProjectOutlet />}>

                  {/* QUADRO */}
                  <Route path='' element={<ProjectQuadro />}></Route>

                  {/* CRIAR ISSUE */}
                  <Route path='createIssue' element={<ProjectCreateIssue />}></Route>

                  {/* CONFIGURAÇÕES */}
                  <Route path='settings' element={<ProjectSettings />}></Route>

                  {/* 404 */}
                  <Route path='*' element={<Navigate to='' />}></Route>

                </Route>
                {/* PROJETO */}

              </Route>
              {/* DASHBOARD */}

              {/* 404 */}
              <Route path='*' element={<Navigate to='/' />}></Route>

            </Routes>
          </BrowserRouter>
        </ModalContextProvider>
      </NavContextProvider>
    </AppContextProvider>
  </StrictMode>,
)
