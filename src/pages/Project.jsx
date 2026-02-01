import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AddTask from '../components/Modal/AddTask'
import { useLocation, useParams } from 'react-router-dom'
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
    // const { data: projectData, loading: projectLoading, error: projectError } = useFetch(`https://workasana-backend-wheat.vercel.app/project/${projectId}`)
    const location = useLocation()
    const projectData = location?.state?.project
    const { data, loading, error } = useFetch(`https://workasana-backend-wheat.vercel.app/tasks/project/${projectId}`)
    // console.log("data", data)

    const [status, setStatus] = useState("")
    const statuses = ["To Do", "In Progress", "Completed", "Blocked"]


    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        if (data) setTasks(data?.tasks)
    }, [data])

    // console.log("tasks", tasks)

    const filteredTasks = status === "" ? tasks : tasks.filter(task => task.status === status)

    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 my-5">
                    <div>
                        <h3>{projectData?.name}</h3>
                        <p>{projectData?.description}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                        <div className="d-flex gap-2 align-items-center">
                            <h6>Sort by:</h6>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Priority Low-High</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Priority High-Low</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Newest First</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Oldest First</button>
                            </div>
                        </div>
                        <div className="d-flex gap-4">
                            <select onChange={(e) => setStatus(e.target.value)} className="form-select w-auto" aria-label="Default select example">
                                <option value="" selected>Filter</option>
                                {statuses?.map(status => (<option value={status}>{status}</option>))}
                            </select>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ New Task</button>
                            <AddTask />
                        </div>
                    </div>
                    <div className="table-responsive">
                        {loading && (
                            <div className="d-flex justify-content-center align-items-center">
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {!loading && filteredTasks?.length === 0 && <p>No tasks found</p>}
                        {!loading && filteredTasks?.length > 0 && <table className="table table-bordered rounded-3">
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
                                        <td>{task?.name}</td>
                                        <td><div className="d-flex">
                                            {task?.owners?.slice(0, 4)?.map((owner, index) => (
                                                <AvatarGroup key={index} index={index} total={task?.owners?.length} member={owner?.name} countLabel={task?.owners?.length > 3 ? task?.owners?.length - 3 : 0} />
                                            ))}
                                        </div></td>
                                        <td>
                                            <Badge priority={task?.priority} />
                                        </td>
                                        <td className="fw-bold">{getFormattedDate(task?.dueDate)}</td>
                                        <td>{task?.status}</td>
                                        <td className="text-center"><i className="bi bi-arrow-right-short"></i></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project