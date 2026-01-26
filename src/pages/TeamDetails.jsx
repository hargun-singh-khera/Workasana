import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useLocation, useParams } from 'react-router-dom'
import AddMember from '../components/Modal/AddMember'

const TeamDetails = () => {
    const location = useLocation()
    console.log("loc", location)
    const team = location.state.team
    console.log("team teamId", team._id)
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar />
                <div className="col-md-10 px-5 mt-5">
                    <Link to={"/teams"} className="text-decoration-none">
                        <i className="bi bi-arrow-left me-2"></i>Back to Teams
                    </Link>
                    <h2 className="mt-5 mb-2">{team?.name}</h2>
                    <p className="mb-5">{team?.description}</p>
                    <h6 className="text-black-50">MEMBERS</h6>
                    <ul className="navbar-nav mt-4 mb-4">
                        {team?.members?.length > 0 && team?.members?.map(member => (
                            <li key={member?._id} className="nav-item mb-2 d-flex align-items-center gap-2">
                                <span className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: "#F5CDA7", color: "#BC6A2B"}}>{member?.name?.split(" ")?.length > 1 ? member?.name?.split(" ")[0][0] + member?.name?.split(" ")[1][0] : member?.name[0]}</span>
                                {member?.name}
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#memberModal">+ Member</button>
                    <AddMember teamId={team?._id} />
                </div>
            </div>
        </div>
    )
}

export default TeamDetails