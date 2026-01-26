import React from 'react'

const AvatarItem = ({ className, label }) => {
    return <span className={`${className} rounded-circle p-1  d-flex justify-content-center align-items-center text-white`} style={{ width: "30px", height: "30px" }}>{label}</span>
}

const AvatarGroup = () => {
  return (
    <div className="d-flex">
        <AvatarItem className={"bg-secondary"} label="A" />
        <AvatarItem className={"bg-info"} label="B" />
        <AvatarItem className={"bg-success"} label="C" />
        <AvatarItem className={"bg-danger"} label="D" />
    </div>
  )
}

export default AvatarGroup