import React from 'react'

const Badge = ({ status }) => {

    return (
        <span className="badge mb-3" style={{ backgroundColor: `${status === "Completed" ? "#DCFCE7" : status === "Blocked" ? "#FED7D7" : "#FEF3C7" }`, color: `${status === "Completed" ? "#538f6a" : status === "Blocked" ? "#c0392b" : "#bd9072"}` }}>{status}</span>
    )
}

export default Badge