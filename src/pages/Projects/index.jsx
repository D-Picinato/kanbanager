import { HiEllipsisHorizontal, HiOutlineArrowDown, HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import projects from "../../models/project";
import Dropdown from "../../components/Dropdown";

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState(projects.list())

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
        onChange={e => { setProjectList(projects.list().filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))) }}
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>
            <button>
              <span>Nome</span>
              <HiOutlineArrowDown />
            </button>
          </th>
          <th>
            <button>
              <span>Descrição</span>
              <HiOutlineArrowDown />
            </button>
          </th>
          <th>
            <span>Mais</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {projectList.length > 0
          ? projectList.map((item, i) => <tr key={i}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <Dropdown icon={<HiOutlineEllipsisHorizontal />}>

              </Dropdown>
            </td>
          </tr>)
          : <tr>
            <td className="notFound" colSpan={3}>Nenhum projeto encontrado!</td>
          </tr>
        }
      </tbody>
    </table>
  </>
}