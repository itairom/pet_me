import { Component } from 'react'
import { petService } from '../services/petService'
import { connect } from 'react-redux'
import { addLike } from '../store/actions/petActions'

export class _PetDetails extends Component {
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
        // const { pets } = this.props
        // //Yaara added:
        // const id = this.props.match.params.petId;
        // const p = pets.filter(pet => pet._id === id);
        // console.log("Pet: ", p);


        const { pet } = this.state
        // const { pet: { owner } } = this.state
        console.log(pet);
        // const { loc } = pet.owner

        if (!pet) return <h1>loading</h1>
        return (
            <section className="pet-details-section">
                <header className="details-header flex">
                    <div className="details-title flex column">
                        <h3 className="pet-name">{ pet.name }</h3>
                        { <span className="pet-location">{ pet.owner.loc.address }</span> }
                    </div>
                    <div className="details-header-btns">
                        {/* TODO: add icons +actions btns */ }
                        <span className="share-pet">share</span>
                        <span className="like-pet">
                            <button onClick={ () => this.props.addLike(pet._id) }>like</button></span>
                    </div>
                </header>
                <div className="details-imgs-container grid">
                    { pet.imgUrls.map((imgUrl) => {
                        return <img src={ imgUrl } alt="skeleton" />
                    }) }
                </div>
                <div className="details-info-container">
                    <div className="info-header">
                    
                    </div>
                </div>
            </section>
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
    addLike
    // updatePet
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)

//Yaara added:
//actions: 