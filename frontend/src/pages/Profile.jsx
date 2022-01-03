import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import Pin from '../assets/img/svg/pin.svg' // relative path to image 
import { onExplore } from '../store/actions/userActions'
import Rating from '@material-ui/lab/Rating';
import { utilService } from '../services/utilService'
import { loadUsers, login, logout, removeUser, signup, approveAdopt, discardAdopt, getUser } from '../store/actions/userActions'
import { loadPets } from '../store/actions/petActions'
import { socketService } from '../services/socketService'
import { userService } from '../services/userService'
import { Link } from 'react-router-dom'
import RequestPetCard from '../cmps/profile/RequestPetCard'
import { petService } from '../services/petService'

// import OwnerPetsCard from '../cmps/profile/OwnerPetsCard'


class _Profile extends Component {
    state = {
        userPets: [],
        userRequests: [],
        isGotRequests: false,
        isRemoveReq: false,
        reqBtnTxt: '',
        adoptionRequestsInfo: [],
        loggedInUser: null,
        newLiveRequest: null,
        newLiveApprove: null,
        updatedPets: null
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.onLoadPets()
        this.socketListeners()
        this.loadLoggedInUser()
        this.props.onExplore()
        socketService.on('adopt-request-owner-data', (data) => {
            this.setState({ IncomingLiveData: data })
        })
    }
    componentDidUpdate() {
        this.loadLoggedInUser()
    }

    loadLoggedInUser = async () => {
        await userService.updateLoggedInUser(this.props.loggedInUser._id);
    }

    onLoadPets = () => {
        this.props.loadPets()
            .then(() => {
                //find why pets dont load 
                const userPets = this.props.loggedInUser.pets.map(userPet => {
                    return this.props.pets.filter(pet => {
                        pet.isAdopted = userPet.isAdopted
                        return (userPet._id === pet._id)
                    })
                }).flatMap(e => e)
                this.setState({ userPets })
            })
    }
    // onLoadPets = () => {
    //     this.props.loadPets()
    //         .then(() => {
    //             //find why pets dont load 
    //             const userPets = this.props.loggedInUser.pets.map(userPet => {
    //                 return this.props.pets.filter(pet => userPet._id === pet._id)
    //             }).flatMap(e => e)
    //             this.setState({ userPets })
    //         })
    // }

    socketListeners = () => {
        socketService.on('adopt-request-owner-data', (data) => {
            this.setState({ newLiveRequest: data })

        })
        socketService.on('adopt-request-approved-data', (data) => {
            this.setState({ newLiveApprove: data.pet })

        })
    }

    onLoadRequests = () => {
        const adoptionRequestsInfo = this.props.users.map(user => {
            return user.pets.map(pet => {
                return pet.adoptQue.map(request => {
                    if (request.userId === this.props.loggedInUser._id) {
                        return { user, pet: { ...pet, userId: user._id } }
                    }
                    return undefined
                }).filter(e => e)
            }).flatMap(e => e)
        });
        this.setState({ adoptionRequestsInfo })
    }

    removeReq = (ev) => {
    }
    toggleRemoveReq = () => {
    }
    reqBtnTxt = (txt) => {
        this.setState({ reqBtnTxt: txt })
    }

    setPetStatus = async (pet) => {
        const petById = await petService.getPetByid(pet._id)
        petById.isAdopted = true
        const modifyPet = await petService.add(petById)
    }

    approveAdopt = (pet, req, loggedInUser, idx) => {
        const msg = loggedInUser.fullname + ' just approved your request to adopt ' + pet.name
        const data = { pet, req, loggedInUser, idx, msg }
        this.props.approveAdopt(data)

        // socketService.emit('aprove-adopt', data)
    }

    onDiscardAdopt = (pet, req, loggedInUser, idx) => {
        const msg = loggedInUser.fullname + ' just approved your request to adopt ' + pet.name
        const data = { pet, req, loggedInUser, idx, msg }
        this.props.discardAdopt(data)

        // socketService.emit('aprove-adopt', data)
    }


    render() {
        this.loadLoggedInUser()
        const { loggedInUser } = this.props
        const { userPets } = this.state
        let newLiveRequest = null
        let newLiveApprove = null
        if (this.state.newLiveRequest) {
            const { newRequest } = this.state.newLiveRequest
            newLiveRequest = newRequest
        }

        if (!loggedInUser) return <img src={Loader} alt="loadnig" />
        if (loggedInUser.pets?.legnth > 0 && userPets.length < 1) return <img src={Loader} alt="loadnig" />
        return (

            <section className="main-profile main-container">
                <section className="user-card">
                    <div className="profile-img">
                        <img src={loggedInUser.imgUrl} alt={<AccountCircleOutlinedIcon />} />
                    </div>
                    <section className="user-info">
                        <h1>{loggedInUser.fullname} </h1>
                        <h4>{loggedInUser.username} </h4>
                        <h4 className="italic">"{loggedInUser.title}"</h4>
                        <div className="location-info">
                            <img src={Pin} alt="location info" />
                            <div>{loggedInUser?.loc?.address}</div>
                        </div>
                        <div className="user-rate">
                            <Rating name="disabled" value={loggedInUser.rating ? loggedInUser.rating : loggedInUser.reviews[0]?.rate} disabled />
                        </div>
                    </section>
                </section>

                <section className="profile-pets-container flex" >

                    <div className="user-pets">
                        <h1>My pets</h1>
                        {userPets && userPets.map((pet, idx) => {
                            return (
                                <>
                                    {/* <OwnerPetsCard pet={pet} idx={idx} /> */}
                                    <div className="adopt-card flex" key={utilService.makeId(6)}>
                                        <div className="adopt-card-info">
                                            <div className="pet-header flex">
                                                <div className="pet-header-txt flex column">
                                                    <Link to={`./${pet._id}`}>
                                                        <h3>{pet.name}   {pet.isAdopted && <span>Adopted</span>} </h3>
                                                    </Link>
                                                    <span>Added: {utilService.timeSince(pet.addedAt, 'ago')}</span>
                                                    <h4>Request Queue: </h4>
                                                </div>
                                                <div className="pet-img-box flex align-center">
                                                    <img src={pet.imgUrls[0]} alt="pet" />
                                                </div>
                                            </div>
                                            <section className="adopt-table">
                                                <table className="pet-table-card">
                                                    <tbody className="table-body" key={utilService.makeId(6)}>
                                                        {loggedInUser.pets[idx]?.adoptQue?.map(req => {
                                                            return (
                                                                <div className="adopt-que-card flex space-between" key={utilService.makeId(6)}>
                                                                    <tr className="flex column">
                                                                        <td className="req-name">{req.fullname}</td>
                                                                        <td className="req-msg">{req.message}</td>
                                                                        <td className="req-time">{utilService.timeSince(req.date, 'ago')}</td>
                                                                    </tr>
                                                                    <button onClick={() => this.approveAdopt(pet, req, loggedInUser, idx)} className="aprove-btn">Approve Adoption</button>
                                                                    <button onClick={() => this.onDiscardAdopt(pet, req, loggedInUser, idx)} className="aprove-btn">Discard Adoption</button>
                                                                </div>
                                                            )
                                                        })
                                                        }
                                                        {newLiveRequest &&
                                                            <tr key={utilService.makeId(6)}>
                                                                <td>{newLiveRequest.fullname}</td>
                                                                <td>{newLiveRequest.message}</td>
                                                                <td>{utilService.timeSince(newLiveRequest.date, 'ago')}</td>
                                                                <td><button onClick={() => this.approveAdopt(pet, newLiveRequest, loggedInUser, idx)} className="aprove-btn">Aprove</button></td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </section>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="user-requests">
                        <h1>My requests</h1>
                        {loggedInUser.requests.map(petId => {
                            return <RequestPetCard petId={petId} />
                        })}
                    </div>
                    <div className="user-requests hide">
                        <div className="request-list flex column">
                            {userPets.map((pet, idx) => {
                                return (
                                    loggedInUser?.pets[idx]
                                        .adoptQue?.map(req => {
                                            return (
                                                <div className="request-card flex column" key={utilService.makeId(6)}>
                                                    <div className="main-card-section">
                                                        <div className="request-info">
                                                            <div className="req-owner-name flex">
                                                                <h3>From:</h3>
                                                                <span className="owner-name">{req.fullname}</span>
                                                            </div>
                                                            <div className="req-pet-info flex">
                                                                <h3 className="about-pet">Messege:</h3>
                                                                <span className="pet-name">{req.message}</span>
                                                            </div>
                                                            <div className="req-time">{utilService.timeSince(req.date, 'ago')}</div>
                                                        </div>
                                                        <div className="request-statue">
                                                            <button onClick={() => this.toggleRemoveReq}
                                                                onMouseOver={() => this.reqBtnTxt('Delete this Request')}
                                                                onMouseOut={() => this.reqBtnTxt('Requested/Aprove')}
                                                                className={this.state.isRemoveReqHover ? 'remove-request hovering' : 'remove-request'}>
                                                                {this.state.reqBtnTxt ? this.state.reqBtnTxt : 'Requested/Aprove'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="card-extention"></div>
                                                </div>
                                            )
                                        })
                                )
                            })}
                        </div>
                    </div>
                </section>
                <Link className='primary-btn' to={'./add'} >Add Pet</Link>

            </section >
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
        isLoading: state.systemModule.isLoading,
        pets: state.petModule.pets,
    }
}
const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers,
    loadPets,
    onExplore,
    discardAdopt,
    approveAdopt,
    getUser
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)
