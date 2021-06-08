import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import StarRateIcon from '@material-ui/icons/StarRate'
// import { store } from 'react-notifications-component'
// import { petService } from '../services/petService'
// import { userService } from '../services/userService'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import Pin from '../assets/img/svg/pin.svg' // relative path to image 

import { onExplore } from '../store/actions/userActions'
import Rating from '@material-ui/lab/Rating';
import { utilService } from '../services/utilService'
import { loadUsers, login, logout, removeUser, signup, approveAdopt, getUser } from '../store/actions/userActions'
import { loadPets } from '../store/actions/petActions'
import { socketService } from '../services/socketService'
import { userService } from '../services/userService'


class _Profile extends Component {
    state = {
        userPets: [],
        userRequests: [],
        isGotRequests: false,
        isRemoveReq: false,
        reqBtnTxt: '',
        adoptionRequestsInfo: [],
        loggedInUser: null,
        IncomingLiveData: null

    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.onLoadPets()
        this.loadLoggedInUser()
        this.socketListeners()
        this.props.onExplore()
    }

    componentWillUnmount() {
    }

    loadLoggedInUser = () => {
        userService.updateLoggedInUser(this.props.loggedInUser._id);
        // const loggedInUser = this.props.getUser(this.props.loggedInUser)
        // this.setState({ loggedInUser: this.props.loggedInUser })
    }

    onLoadPets = () => {
        this.props.loadPets()
            .then(() => {
                const userPets = this.props.loggedInUser.pets.map(userPet => {
                    return this.props.pets.filter(pet => userPet._id === pet._id)
                }).flatMap(e => e)
                this.setState({ userPets })
            })
    }

    socketListeners = () => {
        socketService.on('adopt-request-owner-data', (data) => {
            this.setState({ IncomingLiveData: data })
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

    approveAdopt = (pet, req, loggedInUser, idx) => {
        const msg = loggedInUser.fullname + ' just approved your request to adopt ' + pet.name
        const data = { pet, req, loggedInUser, idx, msg }
        this.props.approveAdopt(data)
        socketService.emit('aprove-adopt', msg)
    }

    render() {
        this.loadLoggedInUser()
        const { loggedInUser } = this.props
        const { userPets } = this.state
        let newRequest1 = null
        if (this.state.IncomingLiveData) {
            const { newRequest } = this.state.IncomingLiveData
            newRequest1 = newRequest
        }
        if (!loggedInUser) return <img src={ Loader } alt="loadnig" />
        if (!userPets) return <img src={ Loader } alt="loadnig" />
        return (

            <section className="main-profile main-container">

                <section className="user-card">
                    <div className="profile-img">
                        {/* <button onClick={() => cloudinaryService.uploadImg()}>U</button> */ }
                        <img src={ loggedInUser.imgUrl } alt={ <AccountCircleOutlinedIcon /> } />
                    </div>
                    <section className="user-info">
                        <h1>{ loggedInUser.fullname } </h1>
                        <h4>{ loggedInUser.username } </h4>
                        <h4 className="italic">"{ loggedInUser.title }"</h4>
                        <div className="location-info">
                            <img src={ Pin } alt="location info" />
                            <div>{ loggedInUser.loc.address }</div>
                        </div>
                        <div className="user-rate">
                            <Rating name="disabled" value={ loggedInUser.rating ? loggedInUser.rating : loggedInUser.reviews[0]?.rate } disabled />
                        </div>
                    </section>
                    {/* <div><button className="logout">Logout</button></div> */ }
                </section>

                {/* <section className={ this.state.isGotRequests ? 'profile-pets-container flex' : 'profile-pets-container hide' }> */ }
                <section className="profile-pets-container flex" >

                    <div className="user-pets">
                        <h1>My pets</h1>
                        <h1>{ this.state.IncomingLiveData && this.state.IncomingLiveData.petId }</h1>
                        { userPets.map((pet, idx) => {
                            return (
                                <div className="adopt-card flex" key={ utilService.makeId(6) }>
                                    <div className="adopt-card-info">

                                        <div className="pet-header flex">
                                            <div className="pet-header-txt">
                                                <h3>{ pet.name }</h3>
                                                <h4>Added: { utilService.timeSince(pet.addedAt, 'ago') }</h4>
                                                <h4>Request Queue</h4>
                                            </div>
                                            <div className="pet-img-box flex align-center">
                                                <img src={ pet.imgUrls[0] } alt="pet" />
                                            </div>
                                        </div>
                                        <section className="adopt-table">
                                            <table className="pet-table-card">
                                                {/* <thead className="table-head">
                                                <tr>
                                                    <td>Adopter Name</td>
                                                    <td>Message</td>
                                                    <td>Date</td>
                                                    <td></td>
                                                </tr>
                                            </thead> */}
                                                <tbody className="table-body" key={ utilService.makeId(6) }>
                                                    { loggedInUser.pets[idx]
                                                        .adoptQue.map(req => {
                                                            return (<tr key={ utilService.makeId(6) }>
                                                                <td>{ req.fullname }</td>
                                                                <td>{ req.message }</td>
                                                                <td>{ utilService.timeSince(req.date, 'ago') }</td>
                                                                <td><button onClick={ () => this.approveAdopt(pet, req, loggedInUser, idx) } className="aprove-btn">Aprove</button></td>
                                                            </tr>)
                                                        })
                                                    }
                                                    { newRequest1 &&
                                                        <tr key={ utilService.makeId(6) }>
                                                            <td>{ newRequest1.fullname }</td>
                                                            <td>{ newRequest1.message }</td>
                                                            <td>{ utilService.timeSince(newRequest1.date, 'ago') }</td>
                                                            <td><button onClick={ () => this.approveAdopt(pet, newRequest1, loggedInUser, idx) } className="aprove-btn">Aprove</button></td>
                                                        </tr>
                                                    }
                                                </tbody>

                                            </table>
                                        </section>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>

                    <div className="user-requests hide">
                        <h1>My requests</h1>
                        <div className="request-list flex column">
                            { userPets.map((pet, idx) => {
                                return (
                                    loggedInUser.pets[idx]
                                        .adoptQue.map(req => {
                                            return (
                                                <div className="request-card flex column" key={ utilService.makeId(6) }>
                                                    <div className="main-card-section">
                                                        {/* <img src={ pet.imgUrl[0] } alt="pet-img" className="pet-img" /> */ }
                                                        <div className="request-info">
                                                            <div className="req-owner-name flex">
                                                                <h3>From:</h3>
                                                                <span className="owner-name">{ req.fullname }</span>
                                                            </div>
                                                            <div className="req-pet-info flex">
                                                                <h3 className="about-pet">Messege:</h3>
                                                                <span className="pet-name">{ req.message }</span>
                                                            </div>
                                                            <div className="req-time">{ utilService.timeSince(req.date, 'ago') }</div>
                                                        </div>
                                                        <div className="request-statue">
                                                            <button onClick={ () => this.toggleRemoveReq }
                                                                // onMouseOver={ () => this.hoverRemoveReq }
                                                                onMouseOver={ () => this.reqBtnTxt('Delete this Request') }
                                                                onMouseOut={ () => this.reqBtnTxt('Requested/Aprove') }
                                                                className={ this.state.isRemoveReqHover ? 'remove-request hovering' : 'remove-request' }>
                                                                {/* ⬆ Hover will reveal 'Delete this Request' and change the color */ }
                                                                {/* ⬇ change Requested/Aprove with adoptQue.status */ }
                                                                {/* { this.state.isRemoveReqHover ? 'Delete this Request' : 'Requested/Aprove' } */ }
                                                                { this.state.reqBtnTxt ? this.state.reqBtnTxt : 'Requested/Aprove' }
                                                                {/* <div className={ this.state.isRemoveReq ? 'remove' : 'remove hide' }>
                                                <button onClick={ (event) => this.removeReq(event) }>Yes</button>
                                                <button onClick={ (event) => this.removeReq(event) }>No</button>
                                            </div> */}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* for commenting back to owner - opan bottom modal */ }
                                                    <div className="card-extention"></div>
                                                </div>
                                            )
                                        })

                                )
                            }) }
                        </div>
                    </div>
                </section>

            </section >
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
        isLoading: state.systemModule.isLoading,
        pets: state.petModule.pets
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
    approveAdopt,
    getUser
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)
