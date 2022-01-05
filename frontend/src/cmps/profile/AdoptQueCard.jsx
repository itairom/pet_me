import React from 'react'
import { utilService } from '../../services/utilService'

export default function AdoptQueCard({pet, req, loggedInUser, idx,onApproveAdopt,onDiscardAdopt}) {
    return (
        <div className="adopt-que-card flex space-between" key={utilService.makeId(6)}>
        <tr className="flex column">
            <td className="req-name">{req.fullname}</td>
            <td className="req-msg">{req.message}</td>
            <td className="req-time">{utilService.timeSince(req.date, 'ago')}</td>
        </tr>
        <div className="flex  column">
            <button onClick={() => onApproveAdopt(pet, req, loggedInUser, idx)} className="aprove-btn">Approve Adoption</button>
            <button onClick={() => onDiscardAdopt(pet, req, loggedInUser, idx)} className="aprove-btn">Discard Adoption</button>
        </div>
    </div>
    )
}
