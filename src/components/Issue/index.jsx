import './styles.scss'
import { useState } from "react"
import IssueModel from "../../models/issueModel"
import StageModel from '../../models/stageModel'
import PriorityIcon from "../PriorityIcon"
import Dropdown from "../Dropdown"
import Input from "../Input/Input"
import Textarea from "../Input/Textarea"
import { HiOutlineEllipsisHorizontal, HiOutlineMinus, HiOutlineTrash } from 'react-icons/hi2'

/**
 * Componente da Issue
 * 
 * @param {{
 *  projectId: String,
 *  issueId: String,
 *  resetCallback?: function(IssueModel?)
 * }} props
 */
export default function Issue({ projectId, issueId, resetCallback }) {
  const [stageModel] = useState(new StageModel(projectId))
  const [issueModel] = useState(new IssueModel(projectId))
  const [issue, setIssue] = useState(issueModel.get(issueId))
  const [maximizedIssue, setMaximizedIssue] = useState(false)

  // callback para resetar fora do componente da Issue
  const resetaCallback = () => {
    resetCallback(issueModel)
  }

  // função para resetar apenas o stado com o model da Issue
  const resetIssue = () => {
    setIssue(issueModel.get(issueId))
  }

  // componente para selecionar a prioridade da issue
  const PrioritySelect = () => {
    return <Dropdown
      icon={<PriorityIcon high={issue.priority} />}
      buttonClass="button normal"
      justify='right'
      autoHide
    >
      <button type="button" className="button normal left" onClick={() => { issueModel.update(issueId, { priority: 5 }); resetIssue() }}><PriorityIcon high={5} /><span>Altíssima</span></button>
      <button type="button" className="button normal left" onClick={() => { issueModel.update(issueId, { priority: 4 }); resetIssue() }}><PriorityIcon high={4} /><span>Alta</span></button>
      <button type="button" className="button normal left" onClick={() => { issueModel.update(issueId, { priority: 3 }); resetIssue() }}><PriorityIcon high={3} /><span>Média</span></button>
      <button type="button" className="button normal left" onClick={() => { issueModel.update(issueId, { priority: 2 }); resetIssue() }}><PriorityIcon high={2} /><span>Baixa</span></button>
      <button type="button" className="button normal left" onClick={() => { issueModel.update(issueId, { priority: 1 }); resetIssue() }}><PriorityIcon high={1} /><span>Baixíssima</span></button>
    </Dropdown>
  }

  // componente para as outras opções da Issue
  const MoreOptions = () => {
    return <Dropdown
      icon={<HiOutlineEllipsisHorizontal />}
      buttonClass="button normal"
      autoHide
    >
      <span className='label'>Mover para</span>
      <hr />
      {stageModel.list().filter(stage => stage != stageModel.get(issue.idStageParent)).map(stage => (
        <button
          key={`${stage.id}${issueId}`}
          className='button normal left'
          onClick={(() => {
            issueModel.update(issueId, { idStageParent: stage.id })
            resetaCallback()
          })}
        >
          {stage.name}
        </button>
      ))}
      <hr />
      <button
        className='button left red'
        onClick={() => {
          issueModel.remove(issueId)
          resetaCallback()
        }}
      >
        <HiOutlineTrash />
        <span>Remover</span>
      </button>
    </Dropdown >
  }

  return <div className={"Issue" + (maximizedIssue ? ' maximized' : '')} key={`${issueId}${Math.random()}`}>
    {!maximizedIssue

      // Issue minimizada
      ? <>
        <PrioritySelect />
        <button className='maximizeIssueBtn' onClick={() => setMaximizedIssue(true)}>
          {issueModel.get(issueId).name}
          {/**
           * Tá feio, mas deixei assim para ele buscar o nome atualizado no model,
           * já que o estado não atualiza quando o model atualiza.
           */}
        </button>
        <MoreOptions />
      </>

      // Issue maximizada
      : <>
        <div className="issueHead">
          <button
            className='button normal w-fit'
            onClick={() => setMaximizedIssue(false)}
          >
            <HiOutlineMinus />
          </button>
          <span className='issueDetailsTitle'>Detalhes da Issue</span>
          <MoreOptions />
        </div>
        <Input
          label='Nome da issue'
          type='text'
          defaultValue={issueModel.get(issueId).name}
          onChange={e => {
            issueModel.update(issueId, { name: e.target.value })
          }}
        />
        <Textarea
          label='Descrição'
          defaultValue={issueModel.get(issueId).description}
          onChange={e => issueModel.update(issueId, { description: e.target.value })}
        />
        <div className="flex-row no-gap">
          <p>Nível de prioridade:</p>
          <PrioritySelect />
        </div>
      </>
    }
  </div >
}