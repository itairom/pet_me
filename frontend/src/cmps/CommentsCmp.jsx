import React, { Component } from 'react'
import { LongTxt } from './LongTxt'
import { addComment } from '../store/actions/petActions'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'

class _CommentsCmp extends Component {
    state = {
        isCommenting: false,
        commentToEdit: {
            txt: '',
            petId: this.props.pet._id,
            loggedInUser: null
        }
    }

    onSubmit = (ev, commentToEdit, petId) => {
        this.toggleAddComment()
        this.props.addComment(ev, commentToEdit, petId)
        this.setState(prevState => ({
            commentToEdit: {
                ...prevState.commentToEdit,
                txt: '',
            }
        }))
    }

    toggleAddComment = () => {
        if (!this.state.isCommenting) {
            if (!this.props.loggedInUser) return alert('Please login first in order to comment on this pet')
        }
        this.setState({ isCommenting: !this.state.isCommenting })
        console.log('im submiting', this.state.isCommenting)
    }

    handleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            commentToEdit: {
                ...prevState.commentToEdit,
                [name]: value,
                loggedInUser: this.props.loggedInUser
            }
        }))
    }

    render() {
        const { pet } = this.props

        return (
            <section className="comments-container" >
                <div className="comments-btns flex">
                    <button className="add-comment-btn" onClick={ () => this.toggleAddComment() }>Add comment</button>
                    {/* <button className="opan-chat-btn">Chat with the Owner</button> */ }
                </div>
                <h3 className="comments-head">Comments</h3>
                <div className="comments-body">
                    <ul>
                        { pet.comments.map(comment =>
                            <div key={ comment.id } className="comments-list">
                                <li>
                                    <div className="reviewer-preview-card flex column">
                                        <img src={ comment.by.imgUrl } alt="skeleton" />
                                        <div className="flex column">
                                            <span className="commenter-name">{ comment.by.fullname }</span>
                                            {/* TODO: reconfigure date by fixed times */ }
                                            <span className="comment-time">{ utilService.timeSince(comment.created, 'ago') }</span>
                                        </div>
                                        <LongTxt className="comment-desc" txt={ comment.txt } />
                                    </div>
                                </li>
                            </div>
                        ) }
                    </ul>
                    <div className={ this.state.isCommenting ? 'new-comment-modal' : 'new-comment-modal hide' }
                        onClick={ () => { this.toggleAddComment() } }>
                        <form className="modal-form" onSubmit={ (ev) =>
                            this.onSubmit(ev, this.state.commentToEdit, this.props.pet._id) }
                            onClick={ e => { e.stopPropagation() } }>
                            <h2>Add a comment</h2>
                            <textarea
                                name="txt"
                                onChange={ this.handleChange }
                                value={ this.state.commentToEdit.txt }
                                placeholder="comment your heart!"
                                autocomplete="off">
                            </textarea>
                            <div class="modal-btns flex">
                                <button className="close-modal">close</button>
                                <button className="post-comment">post</button>
                            </div>
                        </form>
                    </div>

                </div>
            </section >
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
    addComment
}

export const CommentsCmp = connect(mapStateToProps, mapDispatchToProps)(_CommentsCmp)