import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddMember = ({ teamId }) => {
    console.log("teamId", teamId)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name) {
            toast.error("Member name is required")
            return
        }
        try {
            setLoading(true)
            const result = JSON.stringify({name})
            console.log("result", result)
            console.log("token", localStorage.getItem("token"))
            const response = await fetch(`https://workasana-backend-blush.vercel.app/teams/${teamId}/member`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({name})
            })
            console.log("res", response)
            if(!response.ok) {
                throw new Error("Failed to add member")
            }
            const data = await response.json()
            console.log("data", data)
            toast.success("Member added successfully")
            setName("")
        } catch (error) {
            console.error("Error while adding member to the team", error?.message)
        } finally {
            setLoading(false)
        }
    } 

    return (
        <div className="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="memberModalLabel">Add New Member</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">Members Name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Member Name" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button className="btn btn-primary" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            {!loading ? "Add" : "Adding..."}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMember