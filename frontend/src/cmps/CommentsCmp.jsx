import React, { Component } from 'react'
import { LongTxt } from './LongTxt'
import { addComment } from '../store/actions/petActions'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'

class _CommentsCmp extends Component {
    render() {
        const { pet } = this.props

        return (
            <section className="comments-container" >
                <div className="comments-btns flex">
                    <button className="add-comment-btn" onClick={ () => addComment(pet._id) }>Add comment</button>
                    <button className="opan-chat-btn">Chat with the Owner</button>
                </div>
                <h3 className="comments-head">Comments</h3>
                <ul>
                    { pet.comments.map(comment =>
                        <div key={ comment.id } className="comments-list">
                            <li>
                                <div className="reviewer-preview-card flex column">
                                    <img src={ comment.by.imgUrl } alt="skeleton" />
                                    <div className="flex column">
                                        <span className="commenter-name">{ comment.by.fullname }</span>
                                        {/* TODO: reconfigure date by fixed times */ }
                                        <span className="comment-time">{ utilService.timeSince(comment.created) }</span>
                                    </div>
                                    <LongTxt className="comment-desc" txt={ comment.txt } />
                                </div>
                            </li>
                        </div>
                    ) }
                </ul>
                <div className="new-comment-modal">

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
    addComment
}

export const CommentsCmp = connect(mapStateToProps, mapDispatchToProps)(_CommentsCmp)