import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export function AppContextProvider({ children }) {

  const [path, setPath] = useState('') // Armazena o caminho atual da dashboard
  const [project, setProject] = useState() // Armazena o projeto atual aberto

  // Propagação dos estados do AppContext
  return <AppContext.Provider value={{

    path, setPath,
    project, setProject,

  }}>
    {children}
  </AppContext.Provider>
}

// Hook para recuperar os estados do AppContext
export default function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppContextProvider')
  }

  return context
}