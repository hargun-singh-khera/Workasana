import React, { useState } from 'react'
import toast from 'react-hot-toast';

const AddTag = ({ setTags }) => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!name) {
            toast.error("Tag name is required")
            return
        }
        try {
            setLoading(true)
            const response = await fetch("https://workasana-backend-wheat.vercel.app/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ name })
            })
            console.log("response", response)
            if (!response.ok) {
                throw new Error("Failed to add tag")
            }
            const data = await response.json()
            console.log("data", data)
            toast.success("Tag created successfully")
            setTags((prev) => [...prev, data?.tag])
            setName("")
        } catch (error) {
            toast.error(error?.message)
            console.error("Error while adding tag")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal fade" id="tagModalAdd" tabindex="-1" aria-labelledby="tagModalAddLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="tagModalAddLabel">Create New Tag</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">Tag Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Tag Name" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button className="btn btn-primary" disabled={loading} >
                            {loading && <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
                            {!loading ? "Create" : "Creating..."}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTag