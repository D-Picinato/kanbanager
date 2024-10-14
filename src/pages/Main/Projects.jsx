import { HiOutlineArrowDown, HiOutlineDocumentArrowDown, HiOutlineEllipsisHorizontal, HiOutlineTrash } from "react-icons/hi2"
import Input from "../../components/Input"
import { useEffect, useState } from "react"
import projectModel from "../../models/project"
import Dropdown from "../../components/Dropdown"
import { Link } from "react-router-dom"
import useAppContext from "../../contexts/AppContext"

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState(projectModel.list())
  const { setPath } = useAppContext()

  useEffect(() => {
    setPath('Projetos')
  }, [])

  const handleRemoveItem = (id) => {
    projectModel.remove(id)
    setProjectList(projectModel.list())
  }

  return <>
    <div className="titlePage">
      <h2>Projetos Kanban</h2>
      <p>Gerencie seus projetos de forma simples e eficiente com o método ágil Kanban</p>
    </div>
    <div className="row">
      <Input
        type="text"
        idname="search"
        label="Pesquise um projeto"
        autoComplete="off"
        onChange={e => { setProjectList(projectModel.list().filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))) }}
      />
    </div>
    {projectList.length > 0
      ? <table>
        <thead>
          <tr>
            <th>
              <button>
                <span>Nome</span>
                <HiOutlineArrowDown />
              </button>
            </th>
            <th>
              <span>Descrição</span>
            </th>
            <th>
              <span>Mais</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((item, i) => <tr key={i}>
            <td>
              <Link to={`/projects/${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.description}</td>
            <td>
              <Dropdown justify='left' align='center' icon={<HiOutlineEllipsisHorizontal />}>
                <div className="moreOptions">
                  <button className="normal">
                    <HiOutlineDocumentArrowDown />
                    <span>Exportar</span>
                  </button>
                  <button className="red" onClick={() => handleRemoveItem(item.id)}>
                    <HiOutlineTrash />
                    <span>Excluir</span>
                  </button>
                </div>
              </Dropdown>
            </td>
          </tr>)}
        </tbody>
      </table>
      : <section>
        <p>Nenhum projeto encontrado! <Link to='/addproject'>Adicione um projeto &rsaquo;</Link></p>
      </section>
    }
  </>
}