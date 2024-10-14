import './styles.scss'
import useModalContext from '../../contexts/ModalContext'

export default function Modal() {
  const { setShowModal, title, content, actionButton } = useModalContext()

  return <div className="ModalScreen">
    <div className="Modal">
      <h3>{title}</h3>
      <hr />
      <div className="content">
        {content}
      </div>
      <div className="grid-row">
        <button className='button normal' onClick={() => setShowModal(false)}>Cancelar</button>
        {actionButton}
      </div>
    </div>
  </div>
}