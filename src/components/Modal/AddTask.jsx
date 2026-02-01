import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import useFetch from '../../useFetch'
import toast from 'react-hot-toast';

const AddTask = ({ setTasks, isProject }) => {
    const animatedComponents = makeAnimated();

    const [formData, setFormData] = useState({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: [],
        dueDate: "",
        estTime: "",
        // status: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (selectedOption, actionMeta) => {
        // console.log("selectedOption", selectedOption, "actionMeta", actionMeta)
        const value = selectedOption;
        const { name } = actionMeta
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const { data: projectsData } = useFetch("https://workasana-backend-wheat.vercel.app/projects")
    const { data: teamsData } = useFetch("https://workasana-backend-wheat.vercel.app/teams")
    const { data: tagsData } = useFetch("https://workasana-backend-wheat.vercel.app/tags")
    const { data: ownersData } = useFetch("https://workasana-backend-wheat.vercel.app/users")

    const projects = projectsData?.projects
    const teams = teamsData?.teams
    const tags = tagsData?.tags
    const owners = ownersData?.users

    // console.log("projects", projects)

    const ownersOptions = owners?.map((owner) => ({ value: owner?._id, label: owner?.name?.slice(0, 1).toUpperCase() + owner?.name?.slice(1) }))
    const tagsOptions = tags?.map((tag) => ({ value: tag?._id, label: tag?.name.slice(0, 1).toUpperCase() + tag?.name?.slice(1) }))

    console.log("formData", formData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { name, project, team, owners, tags, dueDate, estTime: timeToComplete } = formData
            const payload = {
                name,
                project,
                team,
                owners: owners.map(owner => owner.value),
                tags: tags.map(tag => tag.value),
                dueDate,
                timeToComplete,
            }
            console.log("payload", payload)
            const response = await fetch("https://workasana-backend-wheat.vercel.app/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(payload)
            })
            console.log("response", response)
            if (!response.ok) {
                throw new Error("Failed to create task")
            }
            const data = await response.json()
            console.log("data", data)
            toast.success("Task created successfully")
            setTasks((prev) => [...prev, data.task])
            setFormData({
                name: "",
                project: "",
                team: "",
                owners: [],
                tags: [],
                dueDate: "",
                estTime: "",
                // status: "",
            })
        } catch (error) {
            toast.error(error?.message)
            console.error("Error while creating task", error?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="taskModalLabel">Create New Task | Create Moodboard</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="taskName" className="form-label">Task Name</label>
                            <input type="text" className="form-control" id="taskName" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Task Name" />
                        </div>
                        <div className="mb-3">
                            <label for="project" className="form-label">Project</label>
                            <select id="project" className="form-select" name="project" value={formData.project} onChange={handleChange} aria-label="Default select example">
                                <option selected>Select Project</option>
                                {projects?.map(project => <option value={project?._id}>{project?.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="team" className="form-label">Team</label>
                            <select id="team" className="form-select" name="team" value={formData.team} onChange={handleChange} aria-label="Default select example">
                                <option selected>Select Team</option>
                                {teams?.map(team => <option value={team?._id}>{team?.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="owners" className="form-label">Owners</label>
                            <Select
                                id="owners"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                name="owners"
                                onChange={handleSelectChange}
                                isMulti
                                options={ownersOptions}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="tags" className="form-label">Tags</label>
                            <Select
                                id="tags"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                name="tags"
                                onChange={handleSelectChange}
                                isMulti
                                options={tagsOptions}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label for="dueDate" className="form-label">Due Date</label>
                                <input type="date" className="form-control" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Select Date" />
                            </div>
                            <div className="col">
                                <label for="estTime" className="form-label">Estimated Time</label>
                                <input type="number" className="form-control" id="estTime" name="estTime" min={1} value={formData.estTime} onChange={handleChange} placeholder="Enter Time in Days" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-primary" disabled={loading} >
                            {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            {!loading ? "Create" : "Creating..."}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask