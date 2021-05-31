import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
import Pin from '../assets/img/svg/pin.svg' // relative path to image 
import { petService } from '../services/petService'


import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../store/actions/userActions'

class _Profile extends Component {
    state = {
        userPets: null

    }

    componentDidMount() {
        this.props.loadUsers()
        this.onLoadPets()
    }

    onLoadPets = () => {
        let pets = []
        this.props.loggedInUser.pets.forEach(pet =>
            // { console.log(pet)}
            petService.getPetByid(pet._id)
                .then(petItem => {
                    pets.push(petItem)
                })


        )
        // console.log('pets', pets);

        this.setState({ userPets: pets })
    }


    render() {

        const { loggedInUser } = this.props
        const { userPets } = this.state
        // const { loggedInUser } = this.props
        if (!loggedInUser) return <img src={Loader} alt="loadnig" />
        if (!userPets) return <img src={Loader} alt="loadnig" />


        console.log(userPets);
        // console.log("🚀 ~ ", loggedInUser)
        return (
            <section className="main-profile">
                <section className="user-card">
                    <section className="user-info">
                        <h1>{loggedInUser.fullname}</h1>
                        <img src={loggedInUser.imgUrl} alt="img" />
                        <div className="location-info">
                            <img src={Pin} alt="location info" />
                            <div>{loggedInUser.loc.address}</div>
                        </div>
                    </section>
                </section>

                <section className="user-pets">
                    <h1>Your pets</h1>

                    <div className="adopt-card">
                        <h2>pet name</h2>
                        <section className="adopt-table">
                            <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622366729/petMe/rabbit/rabbit2/1_itx6fr.jpg"
                                alt="" />
                            <table>
                                <thead className=".table-head">
                                    <tr>
                                        <td>Adopter Name</td>
                                        <td>Message</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>Puki</td>
                                        <td>"Hii, i would like to adopt your rabbit"</td>
                                        <td>25.4.21</td>
                                    </tr>
                                    <tr>
                                        <td>Muki</td>
                                        <td>"Very cute! i know someone that like to adopt "</td>
                                        <td>11.4.21</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>



                    {/* {userPets.map( pet => {
                            // return <h1>{pet.name}</h1>
                             return  ( <div>
                                    <h1>{pet.name}</h1>
                                    <h1>{pet.type}</h1>
                                    <h1>{pet.breed}</h1>
                                </div>)
                        })} */}


                </section>



            </section>

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
