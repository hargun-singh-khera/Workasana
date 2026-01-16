import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import useFetch from '../../useFetch'

const AddTask = () => {
    const animatedComponents = makeAnimated();

    const ownersOptions = [
        { value: 'chocolate', label: 'Chocolate' },
    ]

    const tagsOptions = [
        { value: 'chocolate', label: 'Chocolate' },
    ]

    // const { data: projectsData } = useFetch("http://localhost:3000/projects")
    // const [projects, setProjects] = useState(null)

    // useEffect(() => {
    //     setProjects(projectsData?.projects)
    // }, [])
    // console.log("projects", projects)

    return (
        <div className="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="taskModalLabel">Create New Task | Create Moodboard</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="taskName" className="form-label">Task Name</label>
                            <input type="text" className="form-control" id="taskName" placeholder="Enter Task Name" />
                        </div>
                        <div className="mb-3">
                            <label for="taskName" className="form-label">Project</label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Select Project</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="taskName" className="form-label">Team</label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Select Team</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="taskName" className="form-label">Owners</label>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={ownersOptions}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="taskName" className="form-label">Tags</label>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={tagsOptions}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label for="dueDate" className="form-label">Due Date</label>
                                <input type="date" className="form-control" id="dueDate" placeholder="Select Date" />
                            </div>
                            <div className="col">
                                <label for="estTime" className="form-label">Estimated Time</label>
                                <input type="number" className="form-control" id="estTime" placeholder="Enter Time in Days" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask