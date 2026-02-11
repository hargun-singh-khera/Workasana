import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import DeleteAction from '../components/Modal/DeleteAction'

const Settings = () => {
    const { data: projectsData, loading: projectsLoading, error: projectsError } = useFetch("https://workasana-backend-wheat.vercel.app/projects")
    const { data: tasksData, loading: tasksLoading, error: tasksError } = useFetch("https://workasana-backend-wheat.vercel.app/tasks")
    const { data: teamsData, loading: teamsLoading, error: teamsError } = useFetch("https://workasana-backend-wheat.vercel.app/teams")

    const [projects, setProjects] = useState(null)
    const [tasks, setTasks] = useState(null)
    const [teams, setTeams] = useState(null)

    const [selectedProject, setSelectedProject] = useState("")
    const [selectedTask, setSelectedTask] = useState("")
    const [selectedTeam, setSelectedTeam] = useState("")

    useEffect(() => {
        if (projectsData) setProjects(projectsData?.projects)
        if (tasksData) setTasks(tasksData?.tasks)
        if (teamsData) setTeams(teamsData?.teams)
    }, [projectsData, tasksData, teamsData])

    console.log("projects", projects)
    // console.log("tasks", tasks)
    // console.log("teams", teams)
    // const statuses = ["To Do", "In Progress", "Completed", "Blocked"]
    // const projectStatuses = ["In Progress", "Completed"]
    
    // const [status, setStatus] = useState("")
    // const [projectStatus, setProjectStatus] = useState("")

    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-4">
                    <div className="row d-flex justify-content-center my-5 py-2 gap-5">
                        <div className="col-md-5">
                            <h5 className="mt-3 mb-4">Projects</h5>
                            {projectsLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!projectsLoading && projectsError && <p>Failed to load projects.</p>}
                            {!projectsLoading && projects?.length === 0 && <p>No projects found.</p>}
                            {!projectsLoading && !projectsError && projects?.length > 0 && <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects?.map((project, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{project?.name}</td>
                                            <td>
                                                
                                                <button type="button" onClick={() => setSelectedProject(project)} data-bs-toggle="modal" data-bs-target="#projectModal" className="btn btn-sm border-0 text-warning">
                                                    <i class="bi bi-pencil-square fs-5"></i>
                                                </button>
                                                <button type="button" onClick={() => setSelectedProject(project)} data-bs-toggle="modal" data-bs-target="#projectModal" className="btn btn-sm border-0 text-danger">
                                                    <i className="bi bi-trash fs-5"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                            <DeleteAction id={selectedProject?._id} modalId={"projectModal"} setProjects={setProjects} />
                        </div>
                        <div className="col-md-5">
                            <h5 className="mt-3 mb-4">Tasks</h5>
                            {tasksLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!tasksLoading && tasksError && <p>Failed to load tasks.</p>}
                            {!tasksLoading && tasks?.length === 0 && <p>No tasks found.</p>}
                            {!tasksLoading && !tasksError && tasks?.length > 0 && <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks?.map((task, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task?.name}</td>
                                            <td>
                                                <button type="button" onClick={() => setSelectedTask(task)} data-bs-toggle="modal" data-bs-target="#taskModal" className="btn btn-sm border-0 text-danger">
                                                    <i className="bi bi-trash fs-5"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                            <DeleteAction id={selectedTask?._id} modalId={"taskModal"} setTasks={setTasks} />
                        </div>
                        <div className="col-md-5">
                            <h5 className="mt-3 mb-4">Teams</h5>
                            {teamsLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!teamsLoading && teams?.length === 0 && <p>No teams found.</p>}
                            {!teamsLoading && teamsError && <p>Failed to load teams.</p>}
                            {!teamsLoading && !teamsError && teams?.length > 0 && <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams?.map((team, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{team?.name}</td>
                                            <td>
                                                <button type="button" onClick={() => setSelectedTeam(team)} data-bs-toggle="modal" data-bs-target="#teamModal" className="btn btn-sm border-0 text-danger">
                                                    <i className="bi bi-trash fs-5"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                            <DeleteAction id={selectedTeam?._id} modalId={"teamModal"} setTeams={setTeams} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings