class ProjectModel {
  #list

  // Recupera a lista de projetos do localStorage e atribui à `#list`
  constructor() {
    this.#list = JSON.parse(localStorage.getItem('projects') || '[]')
  }

  // Método para salvar a lista de projetos `#list` no localStorage
  #saveList = () => {
    localStorage.setItem('projects', JSON.stringify(this.#list))
  }

  // Método para criar um projeto
  create = e => {
    const formData = new FormData(e.target)

    this.#list.push({
      id: `${Date.now()}${Math.random()}${Math.random()}`,
      name: formData.get('name'),
      description: formData.get('description'),
      stages: [
        {
          id: `${Date.now()}${Math.round()}${Math.round()}`,
          name: 'A Fazer',
        },
        {
          id: `${Date.now()}${Math.round()}${Math.round()}`,
          name: 'Em andamento',
        },
        {
          id: `${Date.now()}${Math.round()}${Math.round()}`,
          name: 'Concluído',
        }
      ],
      issues: []
    })

    this.#saveList()
  }

  // Método para listar os projetos
  list = () => {
    return this.#list
  }

  // Método para recuperar um projeto
  get = projectId => {
    const filteredProject = this.#list.filter(item => item.id == projectId)[0]

    if (!filteredProject) location.reload()
    // if (!filteredProject) throw new Error('Projeto não encontrado!')

    /**
     * Deixei com esse if para recarregar a página quando não encontra o projeto, por causa deste bug:
     * 
     * Quando você criar um projeto e logo em seguida o abrir, o stageModel irá buscar o projeto através do método
     * projectModel.get(), o método consegue recuperar todos os projetos corretamente, mas ele por algum motivo dá erro,
     * alegando que o projeto não foi encontrado.
     * 
     * Eu só desisti de tentar resolver esse bug agora, então coloquei essa gambiarra de if para recarregar a página,
     * que assim o bug só é ignorado e as coisas voltam a funcionar magicamente.
     * 
     * Outra hora eu venho arrumar esse bug.
    */

    return filteredProject
  }

  // Método para remover um projeto
  remove = projectId => {
    this.#list = this.#list.filter(item => item.id != projectId)

    this.#saveList()
  }

  // Método para atualizar um projeto
  update = (projectId, obj) => {
    this.#list = this.#list.map(item => {
      if (item.id == projectId) {
        return { ...item, ...obj }
      }

      return item
    })

    this.#saveList()
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

  // Método para importar um objeto com o projeto
  importFile = obj => {
    if (!this.get(obj.id)) {
      this.#list.push(obj)
      this.#saveList()
    } else {
      alert('Você já possui esse projeto!')
    }
  }
}

const projectModel = new ProjectModel()
export default projectModel