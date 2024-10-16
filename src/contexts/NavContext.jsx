import { HiOutlineArrowLeft, HiOutlineArrowLongLeft, HiOutlineCog6Tooth, HiOutlineSquare3Stack3D, HiOutlineSquaresPlus, HiOutlineViewColumns } from "react-icons/hi2"
import { createContext, useContext, useEffect, useState } from "react"
import { MdOutlineKeyboardArrowLeft, MdPlaylistAdd } from "react-icons/md"

const NavContext = createContext()

export function NavContextProvider({ children }) {

  const [nav, setNav] = useState(null) // Armazena um objeto com os menus do sistema
  const [navIndex, setNavIndex] = useState('main') // Estado para definir qual menu está sendo usado
  const [urlComplement, setUrlComplement] = useState('') // Complemento variável da URL caso necessário, usado para URLs dinâmicas

  // Define o objeto com os menus do sistema
  useEffect(() => {
    setNav({
      main: [
        {
          label: 'Projetos',
          url: '/',
          icon: <HiOutlineSquare3Stack3D />
        },
        {
          label: 'Adicionar',
          url: '/addproject',
          icon: <HiOutlineSquaresPlus />
        },
        // {
        //   label: 'Configurações',
        //   url: '/settings',
        //   icon: <HiOutlineCog6Tooth />
        // },
      ],
      project: [
        {
          label: 'Voltar',
          url: `/`,
          icon: <MdOutlineKeyboardArrowLeft />
        },
        {
          label: 'Quadro',
          url: `/projects/${urlComplement}`,
          icon: <HiOutlineViewColumns />,
          end: true
        },
        {
          label: 'Criar Issue',
          url: `/projects/${urlComplement}/createIssue`,
          icon: <MdPlaylistAdd />
        },
        {
          label: 'Configurações',
          url: `/projects/${urlComplement}/settings`,
          icon: <HiOutlineCog6Tooth />
        },
      ]
    })
  }, [navIndex, urlComplement])

  // Propagação dos estados do NavContext
  return <NavContext.Provider value={{

    nav,
    navIndex, setNavIndex,
    setUrlComplement,

  }}>
    {children}
  </NavContext.Provider>
}

// Hook para recuperar os estados do NavContext
export function useNavContext() {
  const context = useContext(NavContext)

  if (context === undefined) {
    throw new Error('useNavContext deve ser usado dentro de um NavContextProvider')
  }

  return context
}