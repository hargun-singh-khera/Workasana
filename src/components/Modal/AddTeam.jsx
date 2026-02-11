import React, { useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import useFetch from '../../useFetch'
import toast from 'react-hot-toast';

const AddTeam = ({ setTeams }) => {
    const animatedComponents = makeAnimated();
    const { data: teamsData } = useFetch("https://workasana-backend-wheat.vercel.app/teams")
    // const teams = teamsData?.teams

    const { data: usersData } = useFetch("https://workasana-backend-wheat.vercel.app/users")
    // console.log("usersData", usersData)
    const users = usersData?.users

    console.log("users", users)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        members: [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log("name", name, "value", value)
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (selectedOption, actionMeta) => {
        // console.log("selectedOption", selectedOption, "actionMeta", actionMeta)
        const value = selectedOption;
        const { name } = actionMeta
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const membersOptions = users?.map(user => ({ value: user.name, label: user.name }));
    console.log("formData", formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, members } = formData
        if (!name) {
            toast.error("Team name is required")
            return
        }
        if (!members || members.length === 0) {
            toast.error("Please add members to the team")
            return
        }
        try {
            setLoading(true)
            const payload = {
                name,
                description,
                members: members?.map(member => ({ name: member.value }))
            }
            console.log("payload", payload)
            const response = await fetch("https://workasana-backend-wheat.vercel.app/teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(payload)
            })
            console.log("response", response)
            if(!response.ok) {
                throw new Error("Failed to add team")
            }
            const data = await response.json()
            console.log("data", data)
            setTeams((prev) => [...prev, data?.team])
            toast.success("Team created successfully")
            setFormData({
                name: "",
                description: "",
                members: [],
            })
        } catch (error) {
            toast.error("Failed to add team")
            console.error("Error while adding team", error?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal fade" id="teamModal" tabindex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="teamModalLabel">Create New Team</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">Team Name</label>
                            <input type="text" className="form-control mb-2" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Team Name" />
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Team Description</label>
                            <input type="textarea" rows="3" className="form-control mb-2" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter Team Description" />
                        </div>
                        <div className="mb-3">
                            <label for="owners" className="form-label">Add Members</label>
                            <Select
                                id="members"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                name="members"
                                value={formData.members}
                                onChange={handleSelectChange}
                                isMulti
                                options={membersOptions}
                            />
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

export default AddTeam