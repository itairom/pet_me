import { Component } from 'react'
import { petService } from '../services/petService'
import { connect } from 'react-redux'
import { addLike } from '../store/actions/petActions'
import { LongTxt } from '../cmps/LongTxt'
import { CommentsCmp } from '../cmps/CommentsCmp'

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

    onRemovePet=()=>{
        petService.remove(this.state.pet._id)
        this.props.history.push('/')
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
                        <span className="like-pet"> { pet.likes }
                            <button onClick={ () => this.props.addLike(pet._id) }>like</button></span>
                    </div>
                    <span className="share-pet">share</span>
                </header>
                <div className="details-imgs-container grid">
                    { pet.imgUrls.map((imgUrl) => {
                        return <img src={ imgUrl } alt="skeleton" />
                    }) }
                </div>
                <div className="details-main-section flex">

                    <div className="details-info-container">
                        <div className="info-header flex ">
                            <h3>{ pet.name + ', owned by ' + pet.owner.name }</h3>
                            <img src={ pet.owner.imgUrl } alt="" />
                        </div>
                        <div className="info-body">
                            <LongTxt className="pet-desc" txt={ pet.desc } />
                            {/* <p className="pet-desc">{ pet.desc }</p> */ }
                            <ul className="pet-info-list">
                                <li>Age: { (pet.age === 1) ? pet.age + ' year old' : pet.age + ' years old' }</li>
                                <li>Gender: { pet.gender }</li>
                                <li>Breed: { pet.breed }</li>
                                <li>vaccinated: { pet.vaccine ? 'yes' : 'no' }</li>
                                <li>Spayed/Neutered: { pet.neuterSpayed ? 'yes' : 'no' }</li>
                                <li>trained: { pet.trained ? 'yes' : 'no' }</li>
                            </ul>
                        </div>
                    </div>
                    <div className="adopt-modal-section">

                    </div>
                </div>
                <div className="comments-section">
                    <CommentsCmp pet={ pet } key={ pet._id } />
                </div>
                <button onClick={()=>this.onRemovePet()}>Delete</button>

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