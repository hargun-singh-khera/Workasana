import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from 'bootstrap';

const AddProject = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name } = formData
        if (!name) {
            toast.error("Project name is required")
            return
        }
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(formData)
            })
            console.log("response", response)
            if (!response.ok) {
                throw new Error("Failed to add project")
            }
            const data = await response.json()
            console.log("data", data)
            toast.success("Project created successfully")
            setFormData({ name: "", description: "" })

            const modalEl = document.getElementById("projectModal");
            const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
            modal.hide();

        } catch (error) {
            toast.error(error?.message)
            console.error("Error while adding project")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="projectModalLabel">Create New Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">Project Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Project Name" />
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Project Description</label>
                            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Enter Project Description"></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button className="btn btn-primary" disabled={loading} >
                            {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            {!loading ? "Create" : "Creating..."}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default AddProject