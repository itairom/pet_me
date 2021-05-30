import React, { Component } from 'react'
import { petService } from '../services/petService'
import { connect } from 'react-redux'
import { addLike } from '../store/actions/petActions'
import { LongTxt } from '../cmps/LongTxt'
import { CommentsCmp } from '../cmps/CommentsCmp'

class _PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false,
        isOpanModal: false
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

    onShare = () => {
        this.setState({ isOpanModal: !this.state.isOpanModal })
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
        const { pets } = this.props
        //Yaara added:
        const id = this.props.match.params.petId;
        const pet = pets.filter(pet => pet._id === id).pop();
        console.log("Pet: ", pet);


        // const { pet } = this.state
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
                    <span className="share-pet" onClick={ () => this.onShare }>share
                        <div className={ 'share-modal' + this.state.isOpanModal ? 'hide' : '' }>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatem alias, ipsum deserunt veritatis dignissimos fugiat consequatur suscipit nostrum! Dolorum magnam odit soluta porro, error veniam officiis sit! Reprehenderit, earum!
                        </div>
                    </span>
                </header>
                <div className="details-imgs-container grid">
                    { pet.imgUrls.map((imgUrl, idx) => {
                        return <img key={ pet._id + idx } src={ imgUrl } alt="skeleton" />
                    }) }
                </div>
                <div className="details-main-section flex">

                    <div className="details-info-container">
                        <div className="info-header flex ">
                            <div className="flex column">
                                <h3>{ pet.name + ', owned by ' + pet.owner.name }</h3>
                                <span>{ pet.title }</span>

                            </div>
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
    addLike,
    // updatePet
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)

