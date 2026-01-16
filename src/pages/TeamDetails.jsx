import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import AddMember from '../components/Modal/AddMember'

const TeamDetails = () => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 mt-5">
                    <Link to={"/teams"} className="text-decoration-none">
                        <i className="bi bi-arrow-left me-2"></i>Back to Teams
                    </Link>
                    <h2 className="mt-5 mb-4">Design Team</h2>
                    <h6 className="text-black-50">MEMBERS</h6>
                    <ul className="navbar-nav mt-4 mb-4">
                        <li className="nav-item mb-2">Ujjwal Tandon</li>
                        <li className="nav-item mb-2">Ujjwal Tandon</li>
                        <li className="nav-item mb-2">Ujjwal Tandon</li>
                    </ul>
                    <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#memberModal">+ Member</button>
                    <AddMember />
                </div>
            </div>
        </div>
    )
}

export default TeamDetails