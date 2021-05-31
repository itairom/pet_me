import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../assets/img/loaders/loader_3.svg' // relative path to image 
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
        
        
        // console.log(userPets);
        console.log("🚀 ~ ", loggedInUser)
        return (
            <section className="main-profile">
                <section className="user-info">
                    <h1>Hello, <span>{loggedInUser.fullname}</span></h1>
                    <img src={loggedInUser.imgUrl} alt="img" />
                    <div>{loggedInUser.loc.address}</div>
                    <section className="user-pets">


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
