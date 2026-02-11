import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AddProject from '../components/Modal/AddProject'
import AddTask from '../components/Modal/AddTask'
import { Toaster } from 'react-hot-toast'
import useFetch from '../useFetch'
import Badge from '../components/Badge'
import { Navigate , useNavigate } from 'react-router-dom'
import AvatarGroup from '../components/AvatarGroup'

export const getFormattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}


const Dashboard = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to="/" replace />
    }

    const { data: projectsData, loading: projectsLoading, error: projectsError } = useFetch("https://workasana-backend-wheat.vercel.app/projects")
    const { data: tasksData, loading: tasksLoading, error: tasksError } = useFetch("https://workasana-backend-wheat.vercel.app/tasks")

    const [projects, setProjects] = useState(null)
    const [tasks, setTasks] = useState(null)
    const [query, setQuery] = useState("")

    useEffect(() => {
        if (projectsData) setProjects(projectsData?.projects)
        if (tasksData) setTasks(tasksData?.tasks)
    }, [projectsData, tasksData])

    // console.log("projects", projects)
    console.log("tasks", tasks)

    const statuses = ["To Do", "In Progress", "Completed", "Blocked"]
    const projectStatuses = ["In Progress", "Completed"]

    const [status, setStatus] = useState("")
    const [projectStatus, setProjectStatus] = useState("")
    // console.log("projectStatus", projectStatus)
    const filteredTasks = query !== "" ? tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase())) : status === "" ? tasks : tasks.filter(task => task.status === status)
    console.log("status", status)
    const filteredProjects = query !== "" ? projects?.filter(project => project.name.toLowerCase().includes(query.toLowerCase()) || project.description.toLowerCase().includes(query.toLowerCase())) : projectStatus === "" ? projects : projects.filter(project => project.status === projectStatus)
    console.log("filteredTasks", filteredTasks)

    


    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-4">
                    <div className="mb-5 mt-4">
                        <div className="position-relative">
                            <input type="search" className="form-control ps-5" id="searchBox" placeholder="Search" name="query" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className="btn position-absolute start-0 bottom-0 d-flex align-items-center rounded-0 rounded-start-1" style={{ backgroundColor: "#f3f4f6" }}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <section className="mb-5">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-4">
                                <h3>Projects</h3>
                                <select onChange={(e) => setProjectStatus(e.target.value)} className="form-select w-auto" aria-label="Default select example">
                                    <option selected value="">Filter</option>
                                    {projectStatuses?.map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">+ New Project</button>
                            <AddProject setProjects={setProjects} />
                        </div>
                        <div className="row ">
                            {projectsLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!projectsLoading && projectsError && <p>Failed to load projects.</p>}
                            {!projectsLoading && filteredProjects?.length === 0 && <p>No projects found.</p>}
                            {filteredProjects?.length > 0 && filteredProjects?.map((project) => (
                                <button key={project?._id} onClick={() => navigate(`/project/${project._id}`, { state: { project } })} type="button" className="col-md-4 btn border-0">
                                    <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                        <div className="card-body d-flex flex-column align-items-start">
                                            <Badge status={project?.status || "In Progress"} />
                                            <h5 className="card-title">{project?.name}</h5>
                                            <p className="card-text text-start">{project?.description?.length > 400 ? project?.description?.slice(0, 400) + "..." : project?.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                    <section className="mb-5">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-4">
                                <h3>My Tasks</h3>
                                <select onChange={(e) => setStatus(e.target.value)} className="form-select w-auto" aria-label="Default select example">
                                    <option selected value="">Filter</option>
                                    {statuses?.map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ New Task</button>
                            <AddTask setTasks={setTasks} projects={projects} />
                        </div>
                        <div className="row">
                            {tasksLoading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-secondary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!tasksLoading && tasksError && <p>Failed to load tasks.</p>}
                            {filteredTasks?.length === 0 && <p>No tasks found.</p>}
                            {filteredTasks?.length > 0 && filteredTasks?.map((task => (
                                <div key={task?._id} className="col-md-4 mb-3">
                                    <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                        <div className="card-body">
                                            <Badge status={task?.status} />
                                            <h5 className="card-title">{task?.name}</h5>
                                            <p className="card-text text-body-tertiary mb-3">Due on: {getFormattedDate(task?.dueDate)}</p>
                                            <div className="d-flex">
                                                {task?.owners?.slice(0, 4)?.map((owner, index) => (
                                                    <AvatarGroup key={index} index={index} total={task?.owners?.length} member={owner?.name} countLabel={task?.owners?.length > 3 ? task?.owners?.length - 3 : 0} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </section>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard