import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AddTeam from '../components/Modal/AddTeam'
import useFetch from '../useFetch'
import { Link, useNavigate } from 'react-router-dom'
import AvatarGroup from '../components/AvatarGroup'


const Teams = () => {

    const navigate = useNavigate()
    const { data: teamsData, loading, error } = useFetch("https://workasana-backend-wheat.vercel.app/teams")

    // const teams = teamsData?.teams
    const [teams, setTeams] = useState([])
    
    useEffect(() => {
        if (teamsData) setTeams(teamsData?.teams)
    }, [teamsData])
    
    console.log("teams", teams)
    
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
                        <AddTeam setTeams={setTeams} />
                    </div>
                    <div className="row">
                        {loading && (
                            <div className="d-flex justify-content-center align-items-center">
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {!loading && teams?.length === 0 && <p>No teams found.</p>}
                        {!loading && error && <p>Failed to fetch teams.</p>}
                        {!loading && teams?.length > 0 && teams?.map((team) => (
                            <button key={team?._id} onClick={() => navigate(`/teams/${team?._id}`, { state: { team: teams?.find(t => t._id === team._id) } })} className="btn border-0 col-md-4 text-decoration-none">
                                <div className="card border-0 rounded-4 p-1" style={{ backgroundColor: "#F8FAFC" }}>
                                    <div className="card-body">
                                        <h5 className="card-title mb-3 d-flex justify-content-start">{team?.name}</h5>
                                        <div className="d-flex">
                                            {team?.members?.slice(0, 4)?.map((member, index) => (
                                                <AvatarGroup key={index} index={index} total={team?.members?.length} member={member?.name} countLabel={team?.members?.length > 3 ? team?.members.length - 3 : 0} />
                                            ))}
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