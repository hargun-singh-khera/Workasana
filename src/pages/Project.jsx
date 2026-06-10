import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AddTask from '../components/Modal/AddTask'
import { Link, useLocation, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import { getFormattedDate } from './Dashboard'
import AvatarGroup from '../components/AvatarGroup'

const Badge = ({ priority }) => {
    return (<span className="px-2 rounded-pill" style={{ backgroundColor: `${priority === "High" ? "#FDE2E1" : priority === "Low" ? "#F1F3F5" : "#E8E1FF"}`, color: `${priority === "High" ? "#C0392B" : priority === "Low" ? "#6C757D" : "#6F42C1"}` }}>
        <i className="bi bi-flag"></i> {priority}
    </span>)
}

const Project = () => {
    const { projectId } = useParams()
    // console.log("projectId", projectId)
    // const { data: projectData, loading: projectLoading, error: projectError } = useFetch(`https://taskzen-backend-wheat.vercel.app/project/${projectId}`)
    const location = useLocation()
    const projectData = location?.state?.project
    const { data, loading, error } = useFetch(`https://taskzen-backend-wheat.vercel.app/tasks/project/${projectId}`)
    // console.log("data", data)

    const [status, setStatus] = useState("")
    const statuses = ["To Do", "In Progress", "Completed", "Blocked"]


    const [tasks, setTasks] = useState(null)
    // const [priority, setPriority] = useState("")
    // const [time, setTime] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        if (data) setTasks(data?.tasks)
    }, [data])

    // console.log("tasks", tasks)
    const priorityOrder = {
        "High": 3,
        "Medium": 2,
        "Low": 1,
    }

    let filteredTasks = [...tasks || []]

    if (status !== "") {
        filteredTasks = tasks.filter(task => task.status === status)
    }
    if (sortBy === "High") {
        filteredTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    }
    else if (sortBy === "Low") {
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    }
    // console.log("priority", priority)

    if (sortBy === "New") {
        filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    }
    else if (sortBy === "Old") {
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    }

    // console.log("filteredTasks", filteredTasks)

    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-12 col-md-10 px-md-5 my-5">
                    <div>
                        <h3 className="fs-4 fs-md-3">{projectData?.name}</h3>
                        <p className="text-muted small">{projectData?.description}</p>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-5 mb-4">
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            <h6>Sort by:</h6>
                            <div className="d-flex flex-wrap gap-2">
                                <button onClick={() => setSortBy("Low")} type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Priority Low-High</button>
                                <button onClick={() => setSortBy("High")} type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Priority High-Low</button>
                                <button onClick={() => setSortBy("New")} type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Newest First</button>
                                <button onClick={() => setSortBy("Old")} type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Oldest First</button>
                            </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-between">
                            <select onChange={(e) => setStatus(e.target.value)} className="form-select form-select-sm w-auto" aria-label="Default select example">
                                <option value="" selected>Filter</option>
                                {statuses?.map(status => (<option value={status}>{status}</option>))}
                            </select>
                            <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ New Task</button>
                            <AddTask setTasks={setTasks} projectData={projectData} isProjectDetails />
                        </div>
                    </div>
                    <div>
                        {loading && (
                            <div className="d-flex justify-content-center align-items-center">
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {!loading && filteredTasks?.length === 0 && <p>No tasks found</p>}
                        {!loading && filteredTasks?.length > 0 && <div className="table-responsive" style={{ overflowX: 'auto' }}>
                            <table className="table table-bordered table-hover align-middle rounded-3 w-100" >
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">TASKS</th>
                                        <th scope="col">OWNER</th>
                                        <th scope="col">PRIORITY</th>
                                        <th scope="col">DUE ON</th>
                                        <th scope="col" colspan="2">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks?.map(task => (
                                        <tr>
                                            <td className="text-nowrap">{task?.name}</td>
                                            <td className="text-nowrap"><div className="d-flex flex-nowrap gap-1 overflow-hidden">
                                                {task?.owners?.slice(0, 4)?.map((owner, index) => (
                                                    <AvatarGroup key={index} index={index} total={task?.owners?.length} member={owner?.name} countLabel={task?.owners?.length > 3 ? task?.owners?.length - 3 : 0} />
                                                ))}
                                            </div></td>
                                            <td className="text-nowrap">
                                                <Badge priority={task?.priority} />
                                            </td>
                                            <td className="fw-bold text-nowrap">{getFormattedDate(task?.dueDate)}</td>
                                            <td className="text-nowrap">{task?.status}</td>
                                            <td className="text-center text-nowrap">
                                                <Link to={`/task/${task._id}`} className="btn border-0">
                                                    <i className="bi bi-arrow-right-short"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project