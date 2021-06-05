import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import StarRateIcon from '@material-ui/icons/StarRate'
import React, { Component } from 'react'
// import { store } from 'react-notifications-component'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import Pin from '../assets/img/svg/pin.svg' // relative path to image 
import { petService } from '../services/petService'
// import { socketService } from '../services/socketService'
import { onExplore } from '../store/actions/userActions'

import { utilService } from '../services/utilService'
import { loadUsers, login, logout, removeUser, signup } from '../store/actions/userActions'


class _Profile extends Component {
    state = {
        userPets: [],
        userRequests: [],
        isRemoveReq: false,
        reqBtnTxt: ''
    }

    async componentDidMount() {
        this.onLoadRequests()
        await this.onLoadPets()
        this.props.onExplore()
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    onLoadPets = async () => {
        let pets = this.props.loggedInUser.pets;
        const userPets = await Promise.all(pets.map(async pet => {
            return await petService.getPetByid(pet._id)
        }));
        this.setState({ userPets })
    }


    onLoadRequests = () => {
        const userRequests = this.props.users.map(user => {
            return user.pets.map(pet => {
                return pet.adoptQue.map(request => request.userId === this.props.loggedInUser._id)
            })
        });
        this.setState({ userRequests })
    }

    removeReq = (ev) => {
        console.log(ev.target.value)
    }
    toggleRemoveReq = () => {
        console.log('button revealed')
    }
    reqBtnTxt = (txt) => {
        this.setState({ reqBtnTxt: txt })
        console.log('change to ' + txt)
    }


    render() {
        // console.log("🚀 ~ file: Profile.jsx ~ line 44 ~ _Profile ~ render ~ loggedInUser", loggedInUser)
        const { loggedInUser } = this.props
        const { userRequests } = this.state
        const { userPets } = this.state
        console.log('userRequests', userRequests)
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
                            { loggedInUser.reviews[0].rate }
                            <StarRateIcon />
                        </div>
                    </section>
                    <div><button className="logout">Logout</button></div>
                </section>

                <section className="profile-pets-container flex ">
                    <div className="user-pets">
                        <h1>My pets</h1>
                        { userPets.map((pet, idx) => {
                            return (
                                <div className="adopt-card">
                                    <h2>{ pet.name }</h2>
                                    <h3>Request Queue</h3>
                                    <section className="adopt-table">
                                        <img src={ pet.imgUrls[0] }
                                            alt="pet" />
                                        <table className="pet-table-card">
                                            <thead className="table-head">
                                                <tr>
                                                    <td>Adopter Name</td>
                                                    <td>Message</td>
                                                    <td>Date</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody className="table-body">
                                                { loggedInUser.pets[idx]
                                                    .adoptQue.map(pet => {
                                                        return (<tr>
                                                            <td>{ pet.fullname }</td>
                                                            <td>{ pet.message }</td>
                                                            <td>{ utilService.timeSince(pet.date, 'ago') }</td>
                                                            <td><button className="aprove-btn">Aprove</button></td>
                                                        </tr>)
                                                    }) }
                                            </tbody>

                                        </table>
                                    </section>
                                </div>
                            )
                        }) }
                    </div>

                    <div className="user-requests">
                        <h1>My requests</h1>
                        <div className="request-list flex column">
                            {/* TODO: add map() from pets to pet: */ }
                            {/* { userPets.map((pet, idx) => { */ }
                            <div className="request-card flex column">
                                <div className="main-card-section">
                                    <img src={ loggedInUser.imgUrl } alt="" className="pet-img" />
                                    <div className="request-info">
                                        <div className="req-owner-name flex">
                                            <h3>To:</h3>
                                            <span className="owner-name">Owner name</span>
                                        </div>
                                        <div className="req-pet-info flex">
                                            <h3 className="about-pet">About pet:</h3>
                                            <span className="pet-name">Pet name</span>
                                        </div>
                                        <div className="req-time">{ 'time' }</div>
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
                                            <div className={ this.state.isRemoveReq ? 'remove' : 'remove hide' }>
                                                <button onClick={ (event) => this.removeReq(event) }>Yes</button>
                                                <button onClick={ (event) => this.removeReq(event) }>No</button>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {/* for commenting back to owner - opan bottom modal */ }
                                <div className="card-extention"></div>
                            </div>
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
        isLoading: state.systemModule.isLoading

    }
}
const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers,
    onExplore
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)
