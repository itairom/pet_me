import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import { onExplore } from '../store/actions/userActions'
import { loadUsers, login, logout, removeUser, signup, approveAdopt, discardAdopt, getUser, updateUser } from '../store/actions/userActions'
import { loadPets } from '../store/actions/petActions'
import { socketService } from '../services/socketService'
import { userService } from '../services/userService'
import { Link } from 'react-router-dom'
import RequestPetCard from '../cmps/profile/RequestPetCard'
import OwnerPetsCard from '../cmps/profile/OwnerPetsCard'
import { petService } from '../services/petService'
import TopInfo from '../cmps/profile/TopInfo'


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
        this.onLoadPets()
        this.loadLoggedInUser()
    }

    loadLoggedInUser = async () => {
        await userService.updateLoggedInUser(this.props.loggedInUser._id);
    }

    onLoadPets = () => {
        this.props.loadPets()
            .then(() => {
                const userPets = this.props.loggedInUser.pets.map(userPet => {
                    return this.props.pets.filter(pet => {
                        pet.isAdopted = userPet.isAdopted
                        return (userPet._id === pet._id)
                    })
                }).flatMap(e => e)
                this.setState({ userPets })
            })
    }
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
         await petService.add(petById)
    }

    onApproveAdopt = (pet, req, loggedInUser, idx) => {
        const msg = loggedInUser.fullname + ' just approved your request to adopt ' + pet.name
        const data = { pet, req, loggedInUser, idx, msg }
        this.props.approveAdopt(data)

        // socketService.emit('aprove-adopt', data)
        this.loadLoggedInUser()

    }

    onDiscardAdopt = (pet, req, loggedInUser, idx) => {
        const msg = loggedInUser.fullname + ' just approved your request to adopt ' + pet.name
        const data = { pet, req, loggedInUser, idx, msg }
        this.props.discardAdopt(data)

        // socketService.emit('aprove-adopt', data)
        this.loadLoggedInUser()

    }


    render() {
        this.loadLoggedInUser()
        const { loggedInUser } = this.props
        const { userPets } = this.state
        let newLiveRequest = null
        // let newLiveApprove = null
        if (this.state.newLiveRequest) {
            const { newRequest } = this.state.newLiveRequest
            newLiveRequest = newRequest
        }
        if (!loggedInUser) return <img src={Loader} alt="loadnig" />
        if (loggedInUser.pets?.legnth > 0 && userPets.length < 1) return <img src={Loader} alt="loadnig" />
        return (

            <section className="main-profile main-container">
                <TopInfo updateUser={updateUser} loggedInUser={loggedInUser} />
                <section className="profile-pets-container flex column" >
                    <div className="user-pets">
                        <h1>My pets</h1>
                        {userPets && userPets.map((pet, idx) => {
                            return (<OwnerPetsCard
                                petKey={pet._id}
                                pet={pet}
                                idx={idx}
                                loggedInUser={loggedInUser}
                                onApproveAdopt={this.onApproveAdopt}
                                onDiscardAdopt={this.onDiscardAdopt}
                                newLiveRequest={newLiveRequest}
                            />)
                        })}
                    </div>
                    <div className="user-requests">
                        <h1>My requests</h1>
                        {loggedInUser.requests?.map(petId => {
                            return <RequestPetCard petId={petId} />
                        })}
                        {loggedInUser.requests?.length === 0 && <h1 className='no-req'>No Requests!</h1>}
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
    getUser,
    updateUser
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)


