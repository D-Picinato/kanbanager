class ProjectModel {
  #list

  // Recupera a lista de projetos do localStorage e atribui à `#list`
  constructor() {
    this.#list = JSON.parse(localStorage.getItem('projects') || '[]')
  }

  // Método para salvar a lista de projetos `#list` no localStorage
  #saveStorage = () => {
    localStorage.setItem('projects', JSON.stringify(this.#list))
  }

  // Método para criar um projeto
  create = e => {
    const formData = new FormData(e.target)

    this.#list.push({
      id: `${formData.get('name')}-${Date.now()}${Math.random()}`,
      name: formData.get('name'),
      description: formData.get('description'),
      columns: [
        {
          id: `${formData.get('name')}-Backlog-${Date.now()}${Math.random()}`,
          name: 'Backlog'
        },
        {
          id: `${formData.get('name')}-Em andamento-${Date.now()}${Math.random()}`,
          name: 'Em andamento'
        },
        {
          id: `${formData.get('name')}-Concluído-${Date.now()}${Math.random()}`,
          name: 'Concluído'
        }
      ],
      issues: []
    })

    this.#saveStorage()
  }

  // Método para listar os projetos
  list = () => {
    return this.#list
  }

  // Método para recuperar um projeto
  get = projectId => {
    return this.#list.filter(item => item.id == projectId)[0]
  }

  // Método para remover um projeto
  remove = projectId => {
    this.#list = this.#list.filter(item => item.id != projectId)

    this.#saveStorage()
  }

  // Método para gerar e baixar um arquivo JSON do projeto
  exportFile = projectId => {
    const project = this.get(projectId)
    const blob = new Blob([JSON.stringify(project)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${project.name}.kanbanager`
    a.click()
    URL.revokeObjectURL(URL.createObjectURL(blob))
  }

  // Método para importar um arquivo JSON com o projeto
  importFile = obj => {
    if (!this.get(obj.id)) {
      this.#list.push(obj)
      this.#saveStorage()
    } else {
      alert('Você já possui esse projeto!')
    }
  }
}

const projectModel = new ProjectModel()
export default projectModel