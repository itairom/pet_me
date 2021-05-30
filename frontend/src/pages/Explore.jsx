import { connect } from 'react-redux'
import React from 'react'
import { PetList } from '../cmps/PetList';
import { petService } from '../services/petService'

import { loadPets } from '../store/actions/petActions'
import userIcon from '../assets/img/loaders/1.gif' // relative path to image 
class _Explore extends React.Component {

    state = {
        pets: null
    }
    componentDidMount() {

        console.log('filterBy', this.props.location.search);
        this.props.loadPets(this.props.match.params)
        this.setState({ pets: this.props.pets })
    }

    // onLiking = (petId) => {
    //     let pet = petService.getPetByid(petId)
    //     console.log('pet liking',pet);
    // }

    render() {
        const { pets } = this.props


        if (!pets) return <img src={userIcon} alt="loading" />
        return (
            <section className="main-container">
                <h1>Explore</h1>
                < PetList pets={pets} />
            </section>
        )
    }
}



function mapStateToProps(state) {
    return {
        pets: state.petModule.pets
    }
}

const mapDispatchToProps = {
    loadPets
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)