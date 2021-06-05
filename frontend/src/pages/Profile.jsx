import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import Pin from '../assets/img/svg/pin.svg' // relative path to image 
import { petService } from '../services/petService'
import { onExplore } from '../store/actions/userActions'

import { utilService } from '../services/utilService'
import { socketService } from '../services/socketService'
import { store } from 'react-notifications-component';
import { cloudinaryService } from '../services/cloudinaryService'
import StarRateIcon from '@material-ui/icons/StarRate';

import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../store/actions/userActions'

class _Profile extends Component {
    state = {
        userPets: []
    }

    async componentDidMount() {
        await this.onLoadPets()
        this.props.onExplore()
    }

    onLoadPets = () => {
        let pets = []
        this.props.loggedInUser.pets.forEach(pet =>
            petService.getPetByid(pet._id)
                .then(petItem => {
                    pets.unshift(petItem)
                })
        )
        console.log(pets);
        this.setState({ userPets: pets })
    }



    render() {
        const { loggedInUser } = this.props
        console.log("🚀 ~ file: Profile.jsx ~ line 44 ~ _Profile ~ render ~ loggedInUser", loggedInUser)
        const { userPets } = this.state
        if (!loggedInUser) return <img src={Loader} alt="loadnig" />
        if (!userPets) return <img src={Loader} alt="loadnig" />
        return (
            <section className="main-profile main-container">
                <section className="user-card">
                    <div className="profile-img">
                        {/* <button onClick={() => cloudinaryService.uploadImg()}>U</button> */}
                        <img src={loggedInUser.imgUrl} alt="img" />
                    </div>
                    <section className="user-info">
                        <h1>{loggedInUser.fullname} </h1>
                        <h4>{loggedInUser.username} </h4>
                        <h4 className="italic">"{loggedInUser.title}"</h4>
                        <div className="location-info">
                            <img src={Pin} alt="location info" />
                            <div>{loggedInUser.loc.address}</div>
                        </div>
                        <div className="user-rate">
                        {loggedInUser.reviews[0].rate}
                        <StarRateIcon />
                        </div>
                    </section>
                </section>

                <section className="user-pets">
                    <h1>Your pets</h1>
                    {userPets.map((pet, idx) => {
                        return (

                            <div className="adopt-card">
                                <h2>{pet.name}</h2>

                                <h3>Request Queue</h3>
                                <section className="adopt-table">
                                    <img src={pet.imgUrls[0]}
                                        alt="pet" />
                                    <table>
                                        <thead className="table-head">
                                            <tr>
                                                <td>Adopter Name</td>
                                                <td>Message</td>
                                                <td>Date</td>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body">
                                            {loggedInUser.pets[idx]
                                                .adoptQue.map(pet => {
                                                    return (<tr>
                                                        <td>{pet.fullname}</td>
                                                        <td>{pet.message}</td>
                                                        <td>{utilService.timeSince(pet.date, 'ago')}</td>
                                                    </tr>)
                                                })}
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        )
                    })}

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
