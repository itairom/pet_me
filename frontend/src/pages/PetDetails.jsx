import { Component } from 'react'
import { connect } from 'react-redux'
import { updatePet } from '../store/actions/petActions.js'
// import {  } from '../store/actions/petActions.js'
import { petService } from '../services/petService.js'

export class PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false
    }

    componentDidMount() {
        this.setState.pet = this.props.pet
        console.log(this.props.pet)
        // this.loadPet()
        // this.props.loadComments()
    }

    //get pets from petService
    // loadPet = () => {
    //     const { petId } = this.props.match.params
    //     const pets = petService.query()
    // .then(pets => {
    // console.log(pets)
    // this.setState({ pet })
    // })
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
        const pet = this.props.pet
        const { address, lat, lng } = pet.owner.loc
        return (
            <section >
                <header className="details-header flex ">
                    <div>
                        <h1>{ pet.name }</h1>
                        <h3>{ address }</h3>
                    </div>
                    <div>
                        <span className="share-pet">share</span>
                        <span className="like-pet">like</span>
                    </div>
                </header>
            </section>
        )
    }
}

    // const mapStateToProps = state => {
    //     return {
    //         users: state.userModule.users,
    //         pets: state.petModule.pets,
    //         loggedInUser: state.userModule.loggedInUser
    //     }
    // }

    // const mapDispatchToProps = {
    //     updatePet
    // }

    // export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)