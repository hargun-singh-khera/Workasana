import React from 'react'
import Sidebar from '../components/Sidebar'
import AddTask from '../components/Modal/AddTask'

const Project = () => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 my-5">
                    <div>
                        <h3>Create Moodboard</h3>
                        <p>This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity. The moodboard will showcase a curated selection of images, color palettes, typography samples, textures, and layout inspirations that collectively evoke the brand's intended mood and style.</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                        <div className="d-flex gap-2 align-items-center">
                            <h6>Sort by:</h6>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Priority Low-High</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Priority High-Low</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Newest First</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Oldest First</button>
                            </div>
                        </div>
                        <div className="d-flex gap-4">
                            <select className="form-select w-auto" aria-label="Default select example">
                                <option selected>Filter</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ New Task</button>
                            <AddTask />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered rounded-3">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">TASKS</th>
                                    <th scope="col">OWNER</th>
                                    <th scope="col">PRIORITY</th>
                                    <th scope="col">DUE ON</th>
                                    <th scope="col" colspan="2">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Create Filter feature</td>
                                    <td>Otto</td>
                                    <td>High</td>
                                    <td>20 Dec, 2024</td>
                                    <td>Completed</td>
                                    <td className="text-center"><i className="bi bi-arrow-right-short"></i></td>
                                </tr>
                                <tr>
                                    <td>Create Filter feature</td>
                                    <td>Otto</td>
                                    <td>Low</td>
                                    <td>20 Dec, 2024</td>
                                    <td>Completed</td>
                                    <td className="text-center"><i className="bi bi-arrow-right-short"></i></td>
                                </tr>
                                <tr>
                                    <td>Create Filter feature</td>
                                    <td>Otto</td>
                                    <td>Medium</td>
                                    <td>20 Dec, 2024</td>
                                    <td>Completed</td>
                                    <td className="text-center"><i className="bi bi-arrow-right-short"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project