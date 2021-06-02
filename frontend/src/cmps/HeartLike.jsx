import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleLike } from '../store/actions/petActions'
import FavoriteIcon from '@material-ui/icons/Favorite';


class _HeartLike extends Component {

    state = {
        isLiked: false
    }

    componentDidMount() {
        this.checkUserLike()
    }



    checkUserLike = () => {
        const { loggedInUser, pet } = this.props
        if (!loggedInUser) return   
        const userId = pet.likedBy.find(userId => userId === loggedInUser._id)
        const isAlreadyLiked = userId ? true : false;
        this.setState({ isLiked: isAlreadyLiked })
    }

    onLike = () => {
        const { loggedInUser, pet } = this.props

        if (!loggedInUser) return console.log('you are in guest mode, please logging to like the pet')

        const userId = pet.likedBy.find(userId => userId === loggedInUser._id)
        const isAlreadyLiked = userId ? true : false;
        this.setState({ isLiked: !isAlreadyLiked })
        if (!isAlreadyLiked) this.props.toggleLike(pet._id, loggedInUser._id, 1)
        else {
            const idx = pet.likedBy.findIndex(userId => userId === loggedInUser._id)
            this.props.toggleLike(pet._id, userId, -1, idx)
        }
    }


    render() {
        const { isLiked } = this.state
        return (
            <span className="pet-like-btn" onClick={ () => this.onLike() }>
                <FavoriteIcon className={ !isLiked ? 'heart heart-empty' : 'heart heartfill' } />
            </span>
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
    toggleLike
}

export const HeartLike = connect(mapStateToProps, mapDispatchToProps)(_HeartLike)

