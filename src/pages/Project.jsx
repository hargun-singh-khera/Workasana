import React from 'react'
import Sidebar from '../components/Sidebar'
import AddTask from '../components/Modal/AddTask'
import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import { getFormattedDate } from './Dashboard'

const Badge = ({ priority }) => {
    return (<span className="px-2 rounded-pill" style={{ backgroundColor: `${priority === "High" ? "#FDE2E1" : priority === "Low" ? "#F1F3F5" : "#E8E1FF"}`, color: `${priority === "High" ? "#C0392B" : priority === "Low" ? "#6C757D" : "#6F42C1"}` }}>
        <i className="bi bi-flag"></i> {priority}
    </span>)
}

const Project = () => {
    const { projectId } = useParams()
    console.log("projectId", projectId)
    const { data: projectData, loading: projectLoading, error: projectError } = useFetch(`https://workasana-backend-blush.vercel.app/project/${projectId}`)

    const { data, loading, error } = useFetch(`https://workasana-backend-blush.vercel.app/tasks/project/${projectId}`)
    console.log("data", data)
    const tasks = data?.tasks
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 my-5">
                    <div>
                        <h3>{projectData?.project?.name}</h3>
                        <p>{projectData?.project?.description}</p>
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
                            <select className="form-select w-auto" aria-label="Default select example">
                                <option selected>Filter</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ New Task</button>
                            <AddTask />
                        </div>
                    </div>
                    <div className="table-responsive">
                        {tasks?.length === 0 && <p>No tasks found</p>}
                        {tasks?.length > 0 && <table className="table table-bordered rounded-3">
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
                                {tasks?.map(task => (
                                    <tr>
                                        <td>{task?.name}</td>
                                        <td>{task?.owners?.map(owner => owner.name)}</td>
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