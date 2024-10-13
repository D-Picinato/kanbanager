import { HiOutlineChevronRight } from "react-icons/hi2";
import Button from "../../components/Button";
import Input from "../../components/Input";

import projects from '../../models/project'

export default function AddProject() {
  const projectSubmit = e => {
    e.preventDefault()
    projects.save(e)
  }

  return <>
    <div className="titlePage">
      <h2>Adicionar Projeto</h2>
      <p>Crie ou importe um projeto Kanban para otimizar seu fluxo de trabalho</p>
    </div>
    <form className="flex-row" action="/" onSubmit={projectSubmit} autoComplete="off">
      <Input idname='name' label='Nome do projeto' />
      <Button>
        <span>Criar</span>
        <HiOutlineChevronRight />
      </Button>
    </form>
  </>
}