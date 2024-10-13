import { NavLink, Outlet } from "react-router-dom";
import useAppContext from "../contexts/AppContext";
import { HiOutlineCog6Tooth, HiOutlineSquare3Stack3D, HiOutlineSquaresPlus } from "react-icons/hi2";

const navIndex = {
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
    {
      label: 'Configurações',
      url: '/settings',
      icon: <HiOutlineCog6Tooth />
    },
  ]
}

export default function DashboardLayout() {
  const { nav, path } = useAppContext()

  return <>
    <header>
      <div className="title">
        <img src='logo.svg' alt="Kanbanager" />
        <h3>Kanbanager</h3>
      </div>
      <span>{path}</span>
    </header>
    <nav>
      {navIndex[nav].map((item, i) => (
        <NavLink to={item.url} key={i}>
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
    <main>
      <Outlet />
    </main>
  </>
}