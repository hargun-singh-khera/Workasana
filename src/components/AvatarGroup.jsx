import React from 'react'

const AvatarGroup = ({ total, member, index, countLabel }) => {
  console.log("total", total, "member", member)
  console.log("index", index, "countLabel", countLabel)
  if(!member) return;
  if (total === 1) {
    return (
      <div className="d-flex justify-content-center align-items-center gap-2">
        <span className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: "#F5CDA7", color: "#BC6A2B" }}>{member?.split(" ")?.length > 1 ? member?.split(" ")[0][0] + member?.split(" ")[1][0] : member[0]}</span>
        {member}
      </div>)
  }
  return (index < 3 || index === 3 && countLabel > 0) && <span className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", backgroundColor: index === 0 ? "#F59E0B" : index === 1 ? "#10B981" : index === 2 ? "#3B82F6" : "#8B5CF6", marginLeft: index > 0 && "-7px" }}>{index < 3 ? <i class="bi bi-person"></i> : "+" + countLabel > 0 && `+${countLabel}`}</span>
}

export default AvatarGroup