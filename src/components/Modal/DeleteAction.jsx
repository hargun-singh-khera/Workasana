import React, { useState } from 'react'
import toast from 'react-hot-toast'

const DeleteAction = ({ id, modalId, setProjects, setTasks, setTeams }) => {
    const [loading, setLoading] = useState(false)
    console.log("modalId", modalId, "id", id)
    const handleDelete = async () => {
        try {
            setLoading(true)
            const url = modalId === "projectModal" ? `https://workasana-backend-wheat.vercel.app/project/${id}` : modalId === "taskModal" ? `https://workasana-backend-wheat.vercel.app/task/${id}` : `https://workasana-backend-wheat.vercel.app/team/${id}`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                }
            })
            console.log("response", response)
            if(!response.ok) {
                throw new Error("Failed to delete")
            }
            const data = await response.json()
            console.log("data", data)
            if(modalId === "projectModal") {
                setProjects((prev) => prev.filter(project => project._id !== id))
            }
            else if(modalId === "taskModal") {
                setTasks((prev) => prev.filter(task => task._id !== id))
            }
            else {
                setTeams((prev) => prev.filter(team => team._id !== id))
            }
            toast.success("Deleted successfully")
        } catch (error) {
            console.error("Error while deleting", error)
            toast.error("Failed to delete")
        } finally {
            setLoading(false)
        }
    }
    const name = modalId === "projectModal" ? "Project" : modalId === "taskModal" ? "Task" : "Team"
    return (
        <div className="modal fade" id={modalId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm {name} Deletion?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-start">
                        This action can't be undone. Once deleted, this item will be permanently removed.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleDelete}  className="btn btn-danger" disabled={loading} >
                            {loading && <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
                            {!loading ? "Delete" : "Deleting..."}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAction