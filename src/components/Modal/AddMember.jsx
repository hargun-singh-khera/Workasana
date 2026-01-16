import React, { useState } from 'react'

const AddMember = () => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // try {
        //     const response = await fetch()
        // } catch (error) {
            
        // }
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
                        <button type="button" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMember