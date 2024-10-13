import { createContext, useContext, useState } from "react";

const AppContext = createContext()

export function AppContextProvider({ children }) {
  const [nav, setNav] = useState('main')
  const [path, setPath] = useState('')

  return <AppContext.Provider value={{
    nav, setNav,
    path, setPath,
  }}>
    {children}
  </AppContext.Provider>
}

export default function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppContextProvider')
  }

  return context
}