import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import Pin from '../assets/img/svg/pin.svg' // relative path to image 
import { petService } from '../services/petService'
import { utilService } from '../services/utilService'
import { socketService } from '../services/socketService'
import { store } from 'react-notifications-component';


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

    componentDidMount() {
        socketService.on('user-updated', (data) => {
            console.log(data)
        })
        // this.onLoadPets()
        // this.props.loadUsers()
        // console.log(this.props.loggedInUser)
        // socketService.on('data-to-profile', (data) => {
        //     console.log('data recived in profile', data)
        //     console.log('requested from socket')
        //     console.log('loggedninuser', this.props.loggedInUser)
        //     store.addNotification({
        //         title: "Wonderful!",
        //         message: data.message,
        //         type: "info",
        //         insert: "top-right",
        //         container: "bottom-right",
        //         animationIn: ["animate__animated", "animate__fadeIn"],
        //         animationOut: ["animate__animated", "animate__fadeOut"],
        //         dismiss: {
        //             duration: 5000,
        //             onScreen: true
        //         }
        //     });
        // })
    }

    onLoadPets = () => {
        let pets = []
        this.props.loggedInUser.pets.forEach(pet =>
            petService.getPetByid(pet._id)
                .then(petItem => {
                    pets.unshift(petItem)
                })
        )
        this.setState({ userPets: pets })
    }


    render() {

        const { loggedInUser } = this.props
        const { userPets } = this.state
        if (!loggedInUser) return <img src={ Loader } alt="loadnig" />
        if (!userPets) return <img src={ Loader } alt="loadnig" />
        console.log("🚀 ~ file: Profile.jsx ~ line 45 ~ _Profile ~ render ~ userPets", userPets)
        return (
            <section className="main-profile">
                <section className="user-card">
                    <section className="user-info">
                        <h1>{ loggedInUser.fullname }</h1>
                        <img src={ loggedInUser.imgUrl } alt="img" />
                        <div className="location-info">
                            <img src={ Pin } alt="location info" />
                            <div>{ loggedInUser.loc.address }</div>
                        </div>
                    </section>
                </section>

                <section className="user-pets">
                    <h1>Your pets</h1>
                    { userPets.map((pet, idx) => {
                        return (

                            <div className="adopt-card">
                                <h2>{ pet.name }</h2>

                                <section className="adopt-table">
                                    <img src={ pet.imgUrls[0] }
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
                                            { loggedInUser.pets[idx]
                                                .adoptQue.map(pet => {
                                                    return (<tr>
                                                        <td>{ pet.fullname }</td>
                                                        <td>{ pet.message }</td>
                                                        <td>{ utilService.timeSince(pet.date, 'ago') }</td>
                                                    </tr>)
                                                }) }
                                        </tbody>
                                    </table>
                                </section>
                            </div>

                        )
                    }) }

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
    loadUsers
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)
