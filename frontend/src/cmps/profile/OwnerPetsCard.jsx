// import React from 'react'
// import { utilService } from '../../services/utilService'
// import { connect } from 'react-redux'
// import { approveAdopt } from '../store/actions/userActions'

// function _OwnerPetsCard({ pet, idx }) {
//     return (
//         <div className="adopt-card flex" key={utilService.makeId(6)}>
//             <div className="adopt-card-info">
//                 <div className="pet-header flex">
//                     <div className="pet-header-txt flex column">
//                         <h3>{pet.name}</h3>
//                         <span>Added: {utilService.timeSince(pet.addedAt, 'ago')}</span>
//                         <h4>Request Queue: </h4>
//                     </div>
//                     <div className="pet-img-box flex align-center">
//                         <img src={pet.imgUrls[0]} alt="pet" />
//                     </div>
//                 </div>
//                 <section className="adopt-table">
//                     <table className="pet-table-card">
//                         <tbody className="table-body" key={utilService.makeId(6)}>
//                             {loggedInUser.pets[idx].adoptQue.map(req => {
//                                 return (
//                                     <div className="adopt-que-card flex space-between" key={utilService.makeId(6)}>
//                                         <tr className="flex column">
//                                             <td className="req-name">{req.fullname}</td>
//                                             <td className="req-msg">{req.message}</td>
//                                             <td className="req-time">{utilService.timeSince(req.date, 'ago')}</td>
//                                         </tr>
//                                         <button onClick={() => this.approveAdopt(pet, req, loggedInUser, idx)} className="aprove-btn">Approve Adoption</button>
//                                     </div>
//                                 )
//                             })
//                             }
//                             {newLiveRequest &&
//                                 <tr key={utilService.makeId(6)}>
//                                     <td>{newLiveRequest.fullname}</td>
//                                     <td>{newLiveRequest.message}</td>
//                                     <td>{utilService.timeSince(newLiveRequest.date, 'ago')}</td>
//                                     <td><button onClick={() => this.approveAdopt(pet, newLiveRequest, loggedInUser, idx)} className="aprove-btn">Aprove</button></td>
//                                 </tr>
//                             }
//                         </tbody>
//                     </table>
//                 </section>
//             </div>
//         </div>
//     )


// }
// const mapStateToProps = state => {
//     return {
//         loggedInUser: state.userModule.loggedInUser,
//     }
// }
// const mapDispatchToProps = {
//     approveAdopt,

// }


// export const OwnerPetsCard = connect(mapStateToProps, mapDispatchToProps)(_OwnerPetsCard)

