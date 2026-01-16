import React from 'react'
import Sidebar from '../components/Sidebar'
import AddProject from '../components/Modal/AddProject'
import AddTask from '../components/Modal/AddTask'

const Dashboard = () => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-4">
                    <div className="mb-5 mt-4">
                        <div className="position-relative">
                            <input type="email" className="form-control" id="searchBox" placeholder="Search" />
                            <button className="btn position-absolute end-0 bottom-0 d-flex align-items-center rounded-0 rounded-end-1" style={{ backgroundColor: "#f3f4f6" }}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <section className="mb-5">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-4">
                                <h3>Projects</h3>
                                <select className="form-select w-auto" aria-label="Default select example">
                                    <option selected>Filter</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">+ New Project</button>
                            <AddProject />
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <span className="badge mb-3" style={{ backgroundColor: "#FEF3C7", color: "#bd9072" }}>In Progress</span>
                                        <h5 className="card-title">Create Moodboard</h5>
                                        <p className="card-text">This project centers around compiling a digit moodboard to set the visual direction and tone for for a new brand identity. The moodboard will showcase a curated selection of images, color...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <span className="badge mb-3" style={{ backgroundColor: "#DCFCE7", color: "#538f6a" }}>Completed</span>
                                        <h5 className="card-title">Create Moodboard</h5>
                                        <p className="card-text fs-6">This project centers around compiling a digit moodboard to set the visual direction and tone for for a new brand identity. The moodboard will showcase a curated selection of images, color...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <span className="badge mb-3" style={{ backgroundColor: "#DCFCE7", color: "#538f6a" }}>Completed</span>
                                        <h5 className="card-title">Create Moodboard</h5>
                                        <p className="card-text">This project centers around compiling a digit moodboard to set the visual direction and tone for for a new brand identity. The moodboard will showcase a curated selection of images, color...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mb-3">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-4">
                                <h3>My Tasks</h3>
                                <select className="form-select w-auto" aria-label="Default select example">
                                    <option selected>Filter</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">+ New Task</button>
                            <AddTask />
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <span className="badge mb-3" style={{ backgroundColor: "#FEF3C7", color: "#bd9072" }}>In Progress</span>
                                        <h5 className="card-title">Create filter feature</h5>
                                        <p className="card-text text-body-tertiary">Due on: 20th Dec 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <span className="badge mb-3" style={{ backgroundColor: "#DCFCE7", color: "#538f6a" }}>Completed</span>
                                        <h5 className="card-title">Create filter feature</h5>
                                        <p className="card-text text-body-tertiary">Due on: 20th Dec 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <span className="badge mb-3" style={{ backgroundColor: "#DCFCE7", color: "#538f6a" }}>Completed</span>
                                        <h5 className="card-title">Create filter feature</h5>
                                        <p className="card-text text-body-tertiary">Due on: 20th Dec 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Dashboard