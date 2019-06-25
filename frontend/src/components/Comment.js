import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { handleVoteComment, handleDeleteComment } from '../actions/comments';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Comment extends Component {

    handleUpVote = () => {
        this.props.dispatch(handleVoteComment(this.props.comment.id, 'upVote'))
    }

    handleDownVote = () => {
        this.props.dispatch(handleVoteComment(this.props.comment.id, 'downVote'))
    }

    deleteComment = () => {
        this.props.dispatch(handleDeleteComment(this.props.comment.id))
    }

    editComment = () => {
        const { comment } = this.props
        this.props.history.push(`/edit_comment/${comment.id}`)
    }

    render() {
        const { comment } = this.props
        return (
            <div className='comment-container'>
                <div className='post-content'>
                    <div className='post-header'>
                        commented by {comment.author}, {formatDate(comment.timestamp)}.
                    </div>
                    <div className='post-title'>
                        {comment.title}
                    </div>
                    <div className='post-body'>
                        {comment.body}
                    </div>
                </div>
                <div className='post-controls'>
                    <button className='vote-button' onClick={this.handleUpVote} >
                        Upvote
                    </button>
                    <div>
                        score: {comment.voteScore}
                    </div>
                    <button className='vote-button' onClick={this.handleDownVote}>
                        Downvote
                    </button>
                    <button className='control-button' onClick={this.editComment}>
                        Edit
                    </button>
                    <button className='control-button' onClick={this.deleteComment}>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ comments }, ownProps) {
    return {
        comment: comments[ownProps.id]
    }
}

export default connect(mapStateToProps)(withRouter(Comment))