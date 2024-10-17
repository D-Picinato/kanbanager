import { HiOutlineArrowDown, HiOutlineArrowUp, HiOutlineDocumentArrowDown, HiOutlineEllipsisHorizontal, HiOutlineTrash } from "react-icons/hi2"
import Input from "../../components/Input/Input"
import { useEffect, useState } from "react"
import projectModel from "../../models/projectModel"
import Dropdown from "../../components/Dropdown"
import { Link } from "react-router-dom"
import useAppContext from "../../contexts/AppContext"
import useModalContext from "../../contexts/ModalContext"

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState(projectModel.list())
  const { setPath } = useAppContext()
  const [sortOrder, setSortOrder] = useState({ name: 'asc', description: 'asc' })
  const [activeSort, setActiveSort] = useState()
  const { setShowModal, setTitle, setContent, setActionButton } = useModalContext()

  useEffect(() => {
    setPath('Projetos')
  }, [])

  const handleRemoveProject = (projectId) => {
    projectModel.remove(projectId)
    setProjectList(projectModel.list())
    setShowModal(false)
  }

  const sortBy = (col) => {
    const order = sortOrder[col] == 'asc' ? 'desc' : 'asc'
    setSortOrder({ ...sortOrder, [col]: order })
    setActiveSort(col)
    setProjectList(projectList.sort((a, b) => order == 'asc' ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col])))
  }

  return (
    <>
      <div className="titlePage">
        <h2>Projetos Kanban</h2>
        <p>Gerencie seus projetos de forma simples e eficiente com o método ágil Kanban</p>
      </div>
      <Input
        type="text"
        idname="search"
        label="Pesquise um projeto"
        autoComplete="off"
        bgFill={true}
        onChange={e => {
          setProjectList(projectModel.list().filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
        }}
      />
      {projectList.length > 0
        ? <table>
          <thead>
            <tr>
              <th>
                <button onClick={() => sortBy('name')}>
                  <span>Nome</span>
                  {activeSort == 'name' && (sortOrder.name == 'asc' ? <HiOutlineArrowUp /> : <HiOutlineArrowDown />)}
                </button>
              </th>
              <th>
                <button onClick={() => sortBy('description')}>
                  <span>Descrição</span>
                  {activeSort == 'description' && (sortOrder.description == 'asc' ? <HiOutlineArrowUp /> : <HiOutlineArrowDown />)}
                </button>
              </th>
              <th>
                <span>Mais</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/projects/${item.id}`}><span>{item.name}</span></Link>
                </td>
                <td>
                  <Link to={`/projects/${item.id}`}><span>{item.description}</span></Link>
                </td>
                <td>
                  <Dropdown justify='left' align='center' icon={<HiOutlineEllipsisHorizontal />}>
                    <div className="moreOptions">
                      <button
                        className="button left normal"
                        onClick={() => projectModel.exportFile(item.id)}
                      >
                        <HiOutlineDocumentArrowDown />
                        <span>Exportar</span>
                      </button>
                      <button
                        className="button left red"
                        onClick={() => {
                          setTitle('Excluir Projeto')
                          setContent(<span>Deseja mesmo excluir esse projeto?</span>)
                          setShowModal(true)
                          setActionButton(<button className="button red" onClick={() => handleRemoveProject(item.id)}>Remover</button>)
                        }}
                      >
                        <HiOutlineTrash />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table >
        : <section>
          <p>Nenhum projeto encontrado! <Link to='/addproject'>Adicione um projeto &rsaquo;</Link></p>
        </section>
      }
    </>
  )
}