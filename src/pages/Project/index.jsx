import { Outlet, useParams } from "react-router-dom"
import useAppContext from "../../contexts/AppContext"
import projectModel from "../../models/projectModel"
import { useNavContext } from "../../contexts/NavContext"
import { useEffect } from "react"

export default function ProjectOutlet() {
  const { PROJECTID } = useParams()
  const { setProject, project } = useAppContext()
  const { setNavIndex, setUrlComplement } = useNavContext()

  useEffect(() => {
    setProject(projectModel.get(PROJECTID))
    setNavIndex('project')
    setUrlComplement(PROJECTID)
  }, [])

  return project && <Outlet />
}