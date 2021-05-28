import { Component } from 'react'
import { petService } from '../services/petService'


export class PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false
    }

    componentDidMount() {
        const petId = this.props.match.params.petId
        console.log(petId);
        petService.getPetByid(petId).then(pet => {
            this.setState({ pet })
        })
    }

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
        const {pet }= this.state
        // const { } = pet.owner
        if (!pet) return <h1>loading</h1>

console.log(pet);

        return (
            <section >
                <header className="details-header">
                    <div>
                        <h1>{ pet.name }</h1>
                        <h3>{ pet.name }</h3>
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