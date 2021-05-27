import { Component } from 'react'
import { connect } from 'react-redux'
import { updatePet } from '../store/actions/petActions.js'
// import {  } from '../store/actions/petActions.js'
import {petService} from '../services/petService.js'

class _PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false
    }

    componentDidMount() {
        const petId = this.props.match.params.toyId
        petService.getById(toyId).then(toy => {
            this.setState({ toy })
        })


        this.props.loadComments()
    }

    //get pets from petService
    // loadPet = () => {
    //     const { petId } = this.props.match.params
    //     petService.getById(petId)
    //         .then(pet => {
    //             this.setState({ pet })
    //         })
    // }


    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ pet: { ...this.state.pet, [name]: value } })
    }

    //owner only btn 
    onUpdatePet = () => {
        this.props.updatePet(this.state.pet)
        this.toggleEditMode()
    }

    //for owner edit adoption option
    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    //if the user clicked attend let the user reclick to undo
    toggleAdopted = () => {
        this.setState({ pet: { ...this.state.pet, isAttend: !this.state.pet.isAttend } })
    }

    render() {
        return (
            <h1>hi</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        pets: state.petModule.pets,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    updatePet
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)