import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
        toast.success("Logout Successfully")
    }

    return (
        <div className="col-md-2 min-vh-100" style={{ backgroundColor: "#f3f4f6" }}>
            <h3 style={{ color: "blueviolet" }} className="ms-4  py-4 mb-4">workasana</h3>
            <ul className="navbar-nav">
                <li className="nav-item mb-4 ms-4 ">
                    <Link to={"/dashboard"} className="text-decoration-none text-secondary">
                        <i className="bi bi-grid-1x2 me-2"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-4 ms-4 ">
                    <Link to={"/projects"} className="text-decoration-none text-secondary">
                        <i className="bi bi-grid-3x3-gap me-2"></i>
                        Project
                    </Link>
                </li>
                <li className="nav-item mb-4 ms-4 ">
                    <Link to={"/teams"} className="text-decoration-none text-secondary">
                        <i className="bi bi-people me-2"></i>
                        Team
                    </Link>
                </li>
                <li className="nav-item mb-4 ms-4 ">
                    <Link to={"/reports"} className="text-decoration-none text-secondary">
                        <i className="bi bi-bar-chart me-2"></i>
                        Reports
                    </Link>
                </li>
                <li className="nav-item mb-3 ms-4 ">
                    <Link className="text-decoration-none text-secondary">
                        <i className="bi bi-gear me-2"></i>
                        Settings
                    </Link>
                </li>
                <li className="nav-item mb-4 ms-3 w-100">
                    <button onClick={handleLogout} className="btn border-none text-decoration-none text-secondary">
                        <i class="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </button>
                </li>
            </ul>
            <Toaster />
        </div>
    )
}

export default Sidebar