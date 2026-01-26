import React, { useState } from 'react'
import useFetch from '../../useFetch'

const AddTeam = () => {
    const { data: teamsData } = useFetch("http://localhost:3000/teams")
    const teams = teamsData?.teams

    const [formData, setFormData] = useState({
        team: "",
        members: [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log("name", name, "value", value)
        setFormData(prev => ({ ...prev, [name]: value }))
    }

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
                            <select id="team" className="form-select" name="team" value={formData.team} onChange={handleChange} aria-label="Default select example">
                                <option selected value="">Select Team</option>
                                {teams?.map(team => <option value={team?._id}>{team?.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Add Members</label>
                            <input type="text" className="form-control mb-2" id="members" placeholder="Member Name" />
                            <input type="text" className="form-control mb-2" id="members" placeholder="Member Name" />
                            <input type="text" className="form-control mb-2" id="members" placeholder="Member Name" />
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