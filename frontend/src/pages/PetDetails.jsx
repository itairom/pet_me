import { Component } from 'react'
<<<<<<< HEAD
import { connect } from 'react-redux'
import { updatePet } from '../store/actions/petActions.js'
// import {  } from '../store/actions/petActions.js'
import { petService } from '../services/petService.js'
=======
import { petService } from '../services/petService'

>>>>>>> ab9adb42307b6117ec522b6c82d89b0dc07f37d9

export class PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false
    }

    componentDidMount() {
        console.log('in',this.props.match);
        const petId = this.props.match.params.petId
        console.log(petId);
        petService.getPetByid(petId).then(pet => {
            this.setState({ pet })
        })
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
<<<<<<< HEAD
        const pet = this.props.pet
        const { address, lat, lng } = pet.owner.loc
=======
        const {pet }= this.state
        // const { } = pet.owner
        if (!pet) return <h1>loading</h1>

console.log(pet);

>>>>>>> ab9adb42307b6117ec522b6c82d89b0dc07f37d9
        return (
            <section >
                <header className="details-header flex ">
                    <div>
                        <h1>{ pet.name }</h1>
<<<<<<< HEAD
                        <h3>{ address }</h3>
=======
                        <h3>{ pet.name }</h3>
>>>>>>> ab9adb42307b6117ec522b6c82d89b0dc07f37d9
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