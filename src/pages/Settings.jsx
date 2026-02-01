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

    useEffect(() => {
        if (projectsData) setProjects(projectsData?.projects)
        if (tasksData) setTasks(tasksData?.tasks)
        if (teamsData) setTeams(teamsData?.teams)
    }, [projectsData, tasksData, teamsData])

    console.log("projects", projects)
    // console.log("tasks", tasks)
    // console.log("teams", teams)
    const statuses = ["To Do", "In Progress", "Completed", "Blocked"]
    const projectStatuses = ["In Progress", "Completed"]
    
    const [status, setStatus] = useState("")
    const [projectStatus, setProjectStatus] = useState("")

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
                            {!projectsLoading && projects?.length === 0 && <p>No projects found.</p>}
                            {!projectsLoading && projectsError && <p>Failed to load projects.</p>}
                            {!projectsLoading && projects?.length > 0 && <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects?.map((project, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{project?.name}</td>
                                            <td>
                                                <select onChange={(e) => setProjectStatus(e.target.value)} className="form-select w-auto" aria-label="Default select example">
                                                    <option selected value="">{project?.status}</option>
                                                    {projectStatuses?.map(status => status !== project?.status && <option key={status} value={status}>{status}</option>)}
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" data-bs-toggle="modal" data-bs-target="#projectModal" className="btn btn-sm border-0 text-danger">
                                                    <i className="bi bi-trash fs-5"></i>
                                                    <DeleteAction id={project?._id} modalId={"projectModal"} setProjects={setProjects} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
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
                            {!tasksLoading && tasks?.length === 0 && <p>No tasks found.</p>}
                            {!tasksLoading && tasksError && <p>Failed to load tasks.</p>}
                            {!tasksLoading && tasks?.length > 0 && <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks?.map((task, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task?.name}</td>
                                            <td>
                                                <select onChange={(e) => setProjectStatus(e.target.value)} className="form-select w-auto" aria-label="Default select example">
                                                    <option selected value="">{task?.status}</option>
                                                    {statuses?.map(status => status !== task?.status && <option key={status} value={status}>{status}</option>)}
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" data-bs-toggle="modal" data-bs-target="#taskModal" className="btn btn-sm border-0 text-danger">
                                                    <i className="bi bi-trash fs-5"></i>
                                                    <DeleteAction id={task?._id} modalId={"taskModal"} setTasks={setTasks} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
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
                            {!teamsLoading && teams?.length > 0 && <table className="table table-striped">
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
                                                <button type="button" data-bs-toggle="modal" data-bs-target="#teamModal" className="btn btn-sm border-0 text-danger">
                                                    <i className="bi bi-trash fs-5"></i>
                                                    <DeleteAction id={team?._id} modalId={"teamModal"} setTeams={setTeams} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings