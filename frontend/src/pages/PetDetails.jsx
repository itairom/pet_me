import React, { Component } from 'react'
import { petService } from '../services/petService'
import { connect } from 'react-redux'
import { toggleLike, loadPets } from '../store/actions/petActions'
import { LongTxt } from '../cmps/LongTxt'
import { CommentsCmp } from '../cmps/CommentsCmp'
// import { ReactComponent as Male } from '../assets/img/svg/mars.svg'
// import { ReactComponent as Female } from '../assets/img/svg/venus.svg'
// import { ReactComponent as Heart } from '../assets/img/svg/heart.svg'
// import { ReactComponent as HeartFill } from '../assets/img/svg/heart-fill.svg'
import { ReactComponent as RedHeart } from '../assets/img/svg/red-heart.svg'



class _PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false,
        isOpanModal: false,
        isLiked: false
    }

    componentDidMount() {
        // const petId = this.props.match.params.petId
        // petService.getPetByid(petId).then(pet => {
        //     this.setState({ pet })
        // })
        const id = this.props.match.params.petId;
        const pet = this.props.pets.find(pet => pet._id === id);
        this.props.loadPets()
        // console.log(pet)
    }

    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ pet: { ...this.state.pet, [name]: value } })
    }

    onLike = (petId) => {
        const id = this.props.match.params.petId;
        const pet = this.props.pets.find(pet => pet._id === id)
        const { loggedInUser } = this.props

        if (!loggedInUser) return console.log('you are in guest mode, please logging to like the pet')

        console.log('loggedInUser', loggedInUser)
        const userId = pet.likedBy.find(userId => userId === loggedInUser._id)
        const isAlreadyLiked = userId ? true : false;
        this.setState({ isLiked: !isAlreadyLiked })
        console.log(this.state.isLiked)
        if (!isAlreadyLiked) this.props.toggleLike(petId, loggedInUser._id, 1)
        else {
            const idx = pet.likedBy.findIndex(userId => userId === loggedInUser._id)
            this.props.toggleLike(petId, userId, -1, idx)
        }
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

    onRemovePet = () => {
        petService.remove(this.state.pet._id)
        this.props.history.push('/')
    }

    render() {
        // console.log('this.state', this.state)
        const { isLiked } = this.state
        const id = this.props.match.params.petId;
        const pet = this.props.pets.find(pet => pet._id === id);
        if (!pet) return <h1>loading</h1>

        return (
            <section className="pet-details-section main-container">
                <header className="details-header flex">
                    <div className="details-title flex column">
                        <h3 className="pet-name">{ pet.name }</h3>
                        { <span className="pet-location">{ pet.owner.loc.address }</span> }
                    </div>
                    <div className="details-header-btns">
                        {/* TODO: add icons +actions btns */ }
                        <span className="pet-likes">{ pet.likes }</span>
                        <span className="pet-like-btn" onClick={ () => this.onLike(pet._id) }>
                            {/* <HeartFill className={ isLiked ? 'preview-heart-red' : 'preview-heart' } /> */ }
                            <RedHeart className="preview-heart" />
                            {/* // (!isLiked) ? <Heart className="preview-heart" /> : <HeartFill className="preview-heart" /> */ }

                        </span>
                        <span className="share-pet" onClick={ () => this.onShare }>share
                        <div className={ 'share-modal' + this.state.isOpanModal ? 'hide' : '' }>
                            </div>
                        </span>
                    </div>
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
                    <div className="adopt-modal-container flex column align-center ">
                        <button className="adopt-btn el-btn">Adopt Me</button>
                    </div>
                </div>
                <div className="comments-section">
                    <CommentsCmp pet={ pet } key={ pet._id } />
                </div>
                {/* <button onClick={ () => this.onRemovePet() }>Delete</button> */ }
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
    toggleLike,
    loadPets
    // updatePet
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)

