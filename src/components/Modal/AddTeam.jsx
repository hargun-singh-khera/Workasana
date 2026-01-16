import React from 'react'

const AddTeam = () => {
    return (
        <div className="modal fade" id="teamModal" tabindex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="teamModalLabel">Create New Team</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">Team Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter Team Name" />
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Add Members</label>
                            <input type="text" className="form-control mb-2" id="name" placeholder="Member Name" />
                            <input type="text" className="form-control mb-2" id="name" placeholder="Member Name" />
                            <input type="text" className="form-control mb-2" id="name" placeholder="Member Name" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTeam