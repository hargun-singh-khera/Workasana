import React from 'react'
import Sidebar from '../components/Sidebar'
import AddTeam from '../components/Modal/AddTeam'

const Teams = () => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 mt-4">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-4">
                            <h2>Teams</h2>
                        </div>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#teamModal">+ New Team</button>
                        <AddTeam />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Design Team</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Development Team</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Marketing Team</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teams