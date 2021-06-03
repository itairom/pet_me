import React, { Component } from 'react'
import { petService } from '../services/petService'
import { utilService } from '../services/utilService'
import { socketService } from '../services/socketService'
import { connect } from 'react-redux'
import { toggleLike, loadPets } from '../store/actions/petActions'
import { loadUsers } from '../store/actions/userActions'
import { LongTxt } from '../cmps/LongTxt'
import { CommentsCmp } from '../cmps/CommentsCmp'
import { HeartLike } from '../cmps/HeartLike'
import { GoogleMap } from '../cmps/GoogleMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import { faEnvelope, faShare, faVenusMars, faCat, faSyringe, faStethoscope, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import SportsIcon from '@material-ui/icons/Sports';
import ShareIcon from '@material-ui/icons/Share';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

class _PetDetails extends Component {
    state = {
        pet: null,
        owner: null,
        loggedInUser: null,
        isEditMode: false,
        isOpanModal: false,
        isAttend: false
    }

    componentDidMount() {
        const id = this.props.match.params.petId;
        // socketService.setup()
        // socketService.emit('adopt-request', id)
        socketService.on('eyal', () => {
            console.log('im on!')
        })

        this.props.loadPets()
            .then(() => {
                const pet = this.props.pets.find(pet => pet._id === id)
                this.props.loadUsers()
                    .then(() => {
                        const user = this.props.users.find(user => user._id === pet.owner._id)
                        this.setState({ pet, owner: user, loggedInUser: this.props.loggedInUser })
                    })
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

    onAdopt = () => {
        const { pet, owner, loggedInUser } = this.state
        // console.log('pet, owner, loggedInUser', pet, owner, loggedInUser)
        if (!loggedInUser) return alert('Please login in order to adopt this pet ')
        if (loggedInUser.pets.find(loggedInUserPet => loggedInUserPet._id === pet._id)) return alert('You cannot adopt you own pet')
        this.setState({ isAttend: true })
        const data = {
            owner: owner,
            userId: loggedInUser._id,
            date: Date.now(),
            message: `${loggedInUser.fullname} would like to adopt ${pet.name} \n Click to view`,
            fullname: loggedInUser.fullname
        }
        // AdoptAction()
        socketService.emit('adopt-request', data)
    }


    //if the user clicked attend let the user reclick to undo
    toggleAdopted = () => {
        this.setState({ isAttend: true })
    }

    onRemovePet = () => {
        petService.remove(this.state.pet._id)
        this.props.history.push('/')
    }

    render() {
        // console.log(this.props)
        const id = this.props.match.params.petId
        const pet = this.props.pets.find(pet => pet._id === id)
        // const { pet } = this.props
        if (!pet) return <h1>loading</h1>

        return (
            <section className="pet-details-section main-container">
                <header className="details-header flex column">
                    <div className="details-title flex column">
                        <h1 className="pet-name">{ pet.name }</h1>
                    </div>
                    <div className="details-header-btns">
                        {/* TODO: add icons +actions btns */ }
                        <HeartLike pet={ pet } />
                        <span className="pet-likes">{ pet.likes }</span>

                        <span className="share-pet" onClick={ () => this.onShare }><ShareIcon />
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
                            <div className="info-header-txt flex column">
                                <h3>{ pet.name + ', owned by ' + pet.owner.name }</h3>
                                <span>{ pet.title }</span>

                            </div>
                            <img src={ pet.owner.imgUrl } alt="" />
                        </div>
                        <div className="info-body">
                            <LongTxt className="pet-desc" txt={ pet.desc } />
                            {/* <p className="pet-desc">{ pet.desc }</p> */ }
                            <ul className="pet-info-list clean-list">
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={ faCalendar } />
                                    <p>
                                        {/* Age: {(pet.age === 1) ? pet.age + ' year old' : pet.age + ' years old'} */ }
                                        { pet.age + ' ' + pet.type }
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={ faVenusMars } />
                                    <p>
                                        Gender: { pet.gender }
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={ faCat } />
                                    <p>
                                        Breed: { pet.breed }
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={ faSyringe } />
                                    <p>
                                        vaccinated: { pet.vaccine ? 'yes' : 'no' }
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <FontAwesomeIcon icon={ faStethoscope } />
                                    <p>
                                        Spayed/Neutered: { pet.neuterSpayed ? 'yes' : 'no' }
                                    </p>
                                </li>
                                <li className="flex align-center">
                                    <SportsIcon />
                                    <p>
                                        trained: { pet.trained ? 'yes' : 'no' }
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="adopt-modal-container flex column">
                        <span className="adoption-time adopt-sign">{ 'Looking for    a home for ' + utilService.timeSince(pet.addedAt) }</span>
                        <span className="adoption-likes adopt-sign">{ 'Liked by ' + pet.likes + ' people!' }</span>
                        <button className="adopt-btn el-btn" onClick={ () => this.onAdopt() }>{ (this.state.isAttend) ? 'Request sent' : 'Adopt Me' }</button>
                        <span><FontAwesomeIcon icon={ faEnvelope } /> { pet.owner.name.split(' ')[0].toLowerCase() + '@gmail.com' }</span>
                        <span><FontAwesomeIcon icon={ faWhatsapp } /> 054-2312993</span>
                    </div>
                </div>
                <div className="comments-section">
                    <CommentsCmp pet={ pet } key={ pet._id } />
                </div>
                {/* <button onClick={ () => this.onRemovePet() }>Delete</button> */ }
                <section className="google-map section">
                    <h3 className="pet-loc">Where to find me</h3>
                    <div className="pet-location">
                        <RoomOutlinedIcon />
                        { pet.owner.loc.address }
                    </div>
                    {/* <span>{ pet.owner.loc.address }</span> */ }
                    <GoogleMap loc={ pet.owner.loc } />
                </section>
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
    loadUsers,
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)

