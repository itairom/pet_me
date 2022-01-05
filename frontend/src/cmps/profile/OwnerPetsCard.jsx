import React from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../../services/utilService'
import AdoptQueCard from './AdoptQueCard'

export default function OwnerPetsCard({ pet, idx, onDiscardAdopt, onApproveAdopt, loggedInUser, newLiveRequest, petKey }) {
    return (
        <div className="adopt-card flex" key={petKey}>
            <div className="adopt-card-info">
                <div className="pet-header flex">
                    <div className="pet-header-txt flex column">
                        <Link to={`./${pet._id}`}>
                            <h3>{pet.name}   {pet.isAdopted && <span>Adopted</span>} </h3>
                        </Link>
                        <span>Added: {utilService.timeSince(pet.createdAt, 'ago')}</span>
                        <h4>Request Queue: </h4>
                    </div>
                    <div className="pet-img-box flex align-center">
                        {pet.imgUrls.length !== 0 && <img src={pet.imgUrls[0]} alt="pet" />}
                        {pet.imgUrls.length === 0 && <img src="https://res.cloudinary.com/dhorz8v6v/image/upload/v1641286512/dog-1185460_1280_ogdew3.png" alt="pet" />}
                    </div>
                </div>
                <section className="adopt-table">
                    <table className="pet-table-card">
                        <tbody className="table-body" key={utilService.makeId(6)}>
                            {loggedInUser.pets[idx]?.adoptQue?.map(req => {
                                return (
                                    <AdoptQueCard
                                        pet={pet}
                                        req={req}
                                        loggedInUser={loggedInUser}
                                        idx={idx}
                                        onApproveAdopt={onApproveAdopt}
                                        onDiscardAdopt={onDiscardAdopt} />
                                )
                            })
                            }
                            {newLiveRequest &&
                                <AdoptQueCard pet={pet}
                                    req={newLiveRequest}
                                    loggedInUser={loggedInUser}
                                    idx={idx}
                                    onApproveAdopt={onApproveAdopt}
                                    onDiscardAdopt={onDiscardAdopt} />
                            }
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}
