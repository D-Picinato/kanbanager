import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { MdOutlineKeyboardArrowRight } from "react-icons/md"

import useAppContext from "../../contexts/AppContext"

import Input from "../../components/Input/Input"
import Textarea from "../../components/Input/Textarea"

import projectModel from '../../models/project'

export default function AddProject() {
  const navigate = useNavigate()
  const { setPath } = useAppContext()

  useEffect(() => {
    setPath('Adicionar Projeto')
  }, [])

  const projectSubmit = e => {
    e.preventDefault()
    projectModel.create(e)
    navigate('/')
  }

  return <>
    <div className="titlePage">
      <h2>Adicionar Projeto</h2>
      <p>Crie ou importe um projeto Kanban e otimize seu fluxo de trabalho</p>
    </div>
    <div className="grid-row">
      <section>
        <h3>Crie um Projeto</h3>
        <form onSubmit={projectSubmit} autoComplete="off">
          <Input required idname='name' label='Nome do projeto' />
          <Textarea idname='description' label='Descrição' />
          <button className="button primary">
            <span>Criar</span>
            <MdOutlineKeyboardArrowRight />
          </button>
        </form>
      </section>
      <section>
        <h3>Ou Importe um Projeto (Indisponível)</h3>
      </section>
    </div>
  </>
}