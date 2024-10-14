import { NavLink, Outlet } from "react-router-dom"

import useAppContext from "../contexts/AppContext"
import { useNavContext } from "../contexts/NavContext"

import Logo from "../components/Logo"
import Modal from "../components/Modal"
import useModalContext from "../contexts/ModalContext"

export default function DashboardLayout() {
  const { path } = useAppContext()
  const { nav, navIndex } = useNavContext()
  const { showModal } = useModalContext()

  return <>
    <header>
      <div className="title">
        <Logo />
        <h3>Kanbanager</h3>
      </div>
      <span>{path}</span>
    </header>
    <nav>
      {nav && nav[navIndex].map((item, i) => (
        <NavLink to={item.url} key={i} end={item.end ? true : false}>
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
    <main>
      <Outlet />
    </main>
    {showModal && <Modal />}
  </>
}