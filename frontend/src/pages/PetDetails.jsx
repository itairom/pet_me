import React, { Component } from 'react'
import { petService } from '../services/petService'
import { utilService } from '../services/utilService'
import { connect } from 'react-redux'
import { toggleLike, loadPets } from '../store/actions/petActions'
import { adoptRequest } from '../store/actions/userActions'
import { LongTxt } from '../cmps/LongTxt'
import { CommentsCmp } from '../cmps/CommentsCmp'
import { GoogleMap } from '../cmps/GoogleMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import { faEnvelope, faHeart, faShare, faVenusMars, faCat, faSyringe, faStethoscope, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
// import TodayIcon from '@material-ui/icons/Today';
import SportsIcon from '@material-ui/icons/Sports';

// import { ReactComponent as Male } from '../assets/img/svg/mars.svg'
// import { ReactComponent as Female } from '../assets/img/svg/venus.svg'
// import { ReactComponent as Heart } from '../assets/img/svg/heart.svg'
// import { ReactComponent as HeartFill } from '../assets/img/svg/heart-fill.svg'
// import { ReactComponent as RedHeart } from '../assets/img/svg/red-heart.svg'

import FavoriteIcon from '@material-ui/icons/Favorite';


class _PetDetails extends Component {
    state = {
        pet: null,
        isEditMode: false,
        isOpanModal: false,
        isLiked: false
    }

    componentDidMount() {

        const id = this.props.match.params.petId;
        this.props.loadPets()
            .then(() => {
                const pet = this.props.pets.find(pet => pet._id === id)
                this.setState({ pet })
                this.checkUserLike(pet)
            })
    }

    onAdoptRequest = () => {
        const request = {
            fullname: this.props.loggedInUser.fullname,
            userId: this.props.loggedInUser._id,
            date: Date.now(),
            message: 'Im intrested to adopt your pet.. call me up',
            petId: this.state.pet._id
        }

        this.props.adoptRequest(request)
    }

    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ pet: { ...this.state.pet, [name]: value } })
    }

    checkUserLike = (pet) => {
        // const id = this.props.match.params.petId;
        // const pet = this.props.pets.find(pet => pet._id === petId)
        const { loggedInUser } = this.props
        if (!loggedInUser) return
        const userId = pet.likedBy.find(userId => userId === loggedInUser._id)
        const isAlreadyLiked = userId ? true : false;
        this.setState({ isLiked: !isAlreadyLiked })
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
        // const id = this.props.match.params.petId;
        // const pet = this.props.pets.find(pet => pet._id === id);
        const { pet } = this.state
        if (!pet) return <h1>loading</h1>

        return (
            <section className="pet-details-section main-container">
                <header className="details-header flex column">
                    <div className="details-title flex column">
                        <h3 className="pet-name">{pet.name}</h3>
                        {<span className="pet-location">{pet.owner.loc.address}</span>}
                    </div>
                    <div className="details-header-btns">
<<<<<<< HEAD
                        {/* TODO: add icons +actions btns */}
                        <span className="pet-likes">{pet.likes}</span>
                        <span className="pet-like-btn" onClick={() => this.onLike(pet._id)}>
                            <FontAwesomeIcon icon={faHeart} className={isLiked ? 'heart' : 'heart fill'} />
=======
                        {/* TODO: add icons +actions btns */ }
                        <span className="pet-likes">{ pet.likes }</span>
                        <span className="pet-like-btn" onClick={ () => this.onLike(pet._id) }>
                            <FavoriteIcon className={ !isLiked ? 'heart heart-empty' : 'heart heartfill' } />
>>>>>>> cb8fbf737a6fda293979878eae7fcfcfea6d0341
                        </span>
                        <span className="share-pet" onClick={() => this.onShare}><FontAwesomeIcon icon={faShare} />
                            <div className={'share-modal' + this.state.isOpanModal ? 'hide' : ''}>
                            </div>
                        </span>
                    </div>
                </header>
                <div className="details-imgs-container grid">
                    {pet.imgUrls.map((imgUrl, idx) => {
                        return <img key={pet._id + idx} src={imgUrl} alt="skeleton" />
                    })}
                </div>
                <div className="details-main-section flex">

                    <div className="details-info-container">
                        <div className="info-header flex ">
<<<<<<< HEAD
                            <div className="flex column">
                                <h3>{pet.name + ', owned by ' + pet.owner.name}</h3>
                                <span>{pet.title}</span>
=======
                            <div className="info-header-txt flex column">
                                <h3>{ pet.name + ', owned by ' + pet.owner.name }</h3>
                                <span>{ pet.title }</span>
>>>>>>> cb8fbf737a6fda293979878eae7fcfcfea6d0341

                            </div>
                            <img src={pet.owner.imgUrl} alt="" />
                        </div>
                        <div className="info-body">
                            <LongTxt className="pet-desc" txt={pet.desc} />
                            {/* <p className="pet-desc">{ pet.desc }</p> */}
<<<<<<< HEAD
                            <ul className="pet-info-list">
                                <li>Age: {(pet.age === 1) ? pet.age + ' year old' : pet.age + ' years old'}</li>
                                <li>Gender: {pet.gender}</li>
                                <li>Breed: {pet.breed}</li>
                                <li>vaccinated: {pet.vaccine ? 'yes' : 'no'}</li>
                                <li>Spayed/Neutered: {pet.neuterSpayed ? 'yes' : 'no'}</li>
                                <li>trained: {pet.trained ? 'yes' : 'no'}</li>
=======
                            <ul className="pet-info-list clean-list">
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <p>
                                        Age: {(pet.age === 1) ? pet.age + ' year old' : pet.age + ' years old'}
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={faVenusMars} />
                                    <p>
                                        Gender: {pet.gender}
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={faCat} />
                                    <p>
                                        Breed: {pet.breed}
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={faSyringe} />
                                    <p>
                                        vaccinated: {pet.vaccine ? 'yes' : 'no'}
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={faStethoscope} />
                                    <p>
                                        Spayed/Neutered: {pet.neuterSpayed ? 'yes' : 'no'}
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <SportsIcon />
                                    <p>
                                        trained: {pet.trained ? 'yes' : 'no'}
                                    </p>
                                </li>
>>>>>>> cb8fbf737a6fda293979878eae7fcfcfea6d0341
                            </ul>
                        </div>
                    </div>
                    <div className="adopt-modal-container flex column">
                        <span className="adoption-time adopt-sign">{'Looking for    a home for ' + utilService.timeSince(pet.addedAt)}</span>
                        <span className="adoption-likes adopt-sign">{'Liked by ' + pet.likes + ' people!'}</span>
<<<<<<< HEAD
                        <button onClick={this.onAdoptRequest} className="adopt-btn el-btn">Adopt Me</button>
=======
                        <button className="adopt-btn el-btn">Adopt Me</button>
>>>>>>> cb8fbf737a6fda293979878eae7fcfcfea6d0341
                        <span><FontAwesomeIcon icon={faEnvelope} /> {pet.owner.name.split(' ')[0].toLowerCase() + '@gmail.com'}</span>
                        <span><FontAwesomeIcon icon={faWhatsapp} /> 054-2312993</span>
                    </div>
                </div>
                <div className="comments-section">
                    <CommentsCmp pet={pet} key={pet._id} />
                </div>
<<<<<<< HEAD
                {/* <button onClick={ () => this.onRemovePet() }>Delete</button> */}
=======
                {/* <button onClick={ () => this.onRemovePet() }>Delete</button> */ }
                <section className="google-map section">
                    <h3 className="pet-loc">Where to find me</h3>
                    <GoogleMap loc={ pet.owner.loc } />
                </section>
>>>>>>> cb8fbf737a6fda293979878eae7fcfcfea6d0341
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
    loadPets,
    adoptRequest
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)

