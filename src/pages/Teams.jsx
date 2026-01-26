import React from 'react'
import Sidebar from '../components/Sidebar'
import AddTeam from '../components/Modal/AddTeam'
import useFetch from '../useFetch'
import { Link, useNavigate } from 'react-router-dom'

const IconItem = ({ index, countLabel }) => {
    console.log("index", index, "countLabel", countLabel)
    return (index < 3 || index === 3 && countLabel > 0) && <span className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: index === 0 ? "#F59E0B" : index === 1 ? "#10B981" : index === 2 ? "#3B82F6" : "#8B5CF6", marginLeft: index > 0 && "-7px"}}>{index < 3 ? <i class="bi bi-person"></i> : "+" + countLabel > 0 && `+${countLabel}`}</span>
}

const Teams = () => {
    
    const { data: teamsData } = useFetch("http://localhost:3000/teams")
    const teams = teamsData?.teams

    const navigate = useNavigate()


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
                        {teams?.map((team) => (
                            <button onClick={() => navigate(`/teams/${team?._id}`, { state: {team: teams?.find(t => t._id === team._id )}})} className="btn border-0 col-md-4 text-decoration-none">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <h5 className="card-title mb-3 d-flex justify-content-start">{team?.name}</h5>
                                        <div className="d-flex">
                                            {team?.members?.slice(0, 4)?.map((member, index) => (
                                                <IconItem key={index} index={index} countLabel={team?.members?.length > 4 ? team?.members.length - 4 : 0} />
                                            ))}
                                            {/* <span className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: "#F59E0B"}}><i class="bi bi-person"></i></span>
                                            <span className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: "#10B981", marginLeft: "-7px"}}><i class="bi bi-person"></i></span>
                                            <span className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: "#3B82F6", marginLeft: "-7px"}}><i class="bi bi-person"></i></span>
                                            <span className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: "#8B5CF6", marginLeft: "-7px"}}>+2</span> */}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teams