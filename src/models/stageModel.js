import projectModel from "./projectModel"

class StageModel {
  #project
  #list

  constructor(projectId) {
    this.#project = projectModel.get(projectId)

    if (!this.#project) console.error('Não existe um projeto com esse ID!')
  }

  #saveProject = () => {
    projectModel.update(this.#project.id, this.#project)
  }

  create = name => {
    this.#project.stages.push({
      id: `${this.#project.name}-stage-${Date.now()}${Math.random()}`,
      name: name,
    })
  }
}

export default function stageModel(projectId) {
  return new StageModel(projectId)
}