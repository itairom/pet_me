import { LongTxt } from './LongTxt'


export function CommentsCmp({ pet }) {
    return (
        <section className="comments-container">
            <h3 className="comments-head">Comments</h3>
            <ul>
                { pet.comments.map(comment =>
                    <div className="comments-list">
                        <li>
                            <div className="reviewer-preview-card flex column">
                                <img src={ comment.by.imgUrl } alt="skeleton" />
                                <div className="flex column">
                                    <span className="commenter-name">{ comment.by.fullname }</span>
                                    {/* TODO: reconfigure date by fixed times */ }
                                    <span className="comment-time">{ Date(comment.by.created) }</span>
                                </div>
                                <LongTxt className="comment-desc" txt={ comment.txt } />
                            </div>
                        </li>
                    </div>
                ) }
            </ul>
        </section>
    )
}