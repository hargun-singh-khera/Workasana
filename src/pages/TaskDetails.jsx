import React from 'react'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useFetch from '../useFetch'
import toast from 'react-hot-toast'

const TaskDetails = () => {
    const { taskId } = useParams()
    const { data, loading, error } = useFetch(`https://workasana-backend-wheat.vercel.app/task/${taskId}`)
    const [task, setTask] = useState(null)
    console.log("task", task)

    useEffect(() => {
        if (data) {
            setTask(data?.task)
        }
    }, [data])


    const handleMarkComplete = async () => {
        try {
            const response = await fetch(`https://workasana-backend-wheat.vercel.app/task/${taskId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ ...task, status: "Completed" })
            })
            console.log("response", response)
            if (!response.ok) {
                throw new Error("Failed to update task status")
            }
            const data = await response.json()
            console.log("data", data)
            setTask(prev => ({ ...prev, status: "Completed" }))
            toast.success("Task marked completed")
        } catch (error) {
            toast.error("Failed to mark task as completed")
            console.error("Error while marking task as complete", error.message)
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />

                <div className="col-md-10 px-5 my-5">
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center my-5">
                            <div class="spinner-border text-secondary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    {!loading && error && <p>Failed to load task data.</p>}
                    {!loading && !error && <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="mb-1">Task: {task?.name}</h2>
                            </div>
                        </div>

                        <div className="col-md-10">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="mb-3">Task Details</h5>
                                    <hr />

                                    <div className="row mb-3">
                                        <div className="col-sm-4 text-muted">Project</div>
                                        <div className="col-sm-8">{task?.project?.name}</div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-4 text-muted">Team</div>
                                        <div className="col-sm-8">{task?.team?.name}</div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-4 text-muted">Owners</div>
                                        <div className="col-sm-8">
                                            {task?.owners?.map(owner => owner?.name).join(", ")}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-4 text-muted">Tags</div>
                                        <div className="col-sm-8">
                                            {task?.tags?.map(tag => tag?.name).join(", ")}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-4 text-muted">Status</div>
                                        <div className="col-sm-8">{task?.status}</div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-4 text-muted">Time Remaining</div>
                                        <div className="col-sm-8">{task?.timeToComplete} Days</div>
                                    </div>

                                    <hr />

                                    <button type="button" onClick={handleMarkComplete} className="btn btn-success w-100">
                                        Mark as Complete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default TaskDetails
