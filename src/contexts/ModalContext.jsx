import { createContext, useContext, useState } from "react"

export const ModalContext = createContext()

export function ModalContextProvider({ children }) {

  const [showModal, setShowModal] = useState('') // Estado do título do Modal
  const [title, setTitle] = useState('') // Estado do título do Modal
  const [content, setContent] = useState() // Estado do conteúdo do Modal
  const [actionButton, setActionButton] = useState() // Armazena o botão de ação

  // Propagação dos estados do ModalContext
  return <ModalContext.Provider value={{

    showModal, setShowModal,
    title, setTitle,
    content, setContent,
    actionButton, setActionButton,

  }}>
    {children}
  </ModalContext.Provider>
}

// Hook para recuperar os estados do ModalContext
export default function useModalContext() {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error('useModalContext deve ser usado dentro de um ModalContextProvider')
  }

  return context
}