import React, { Component } from 'react'
import { generateUID } from '../utils/helpers';
import { connect } from 'react-redux'
import { handleAddComment, handleEditComment } from '../actions/comments';
import { withRouter } from 'react-router-dom'
import { getComment } from '../utils/API';

class CommentEdit extends Component {
    state = {
        author: '',
        body: ''
    }

    componentDidMount() {
        if(this.props.id !== undefined) {
            getComment(this.props.id)
                .then(comment => {
                    if(comment.error) {
                        alert(`Unable to find comment ${this.props.id}! Redirecting...`)
                        this.props.history.push('/')
                    } else {
                        this.setState({
                            author: comment.author,
                            body: comment.body
                        })
                    }
                })
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    saveComment = event => {
        event.preventDefault()
        let newComment = {}
        if(this.props.id !== undefined) {
            newComment = this.props.comment
            newComment.author = this.state.author
            newComment.body = this.state.body
        } else {
            newComment.author = this.state.author
            newComment.body = this.state.body
            newComment.parentId = this.props.match.params.postId
            newComment.id = generateUID()
            newComment.timestamp = Date.now()
        }
        this.props.dispatch(handleAddComment(newComment))
        this.props.history.goBack()
    }

    editComment = event => {
        event.preventDefault()
        const comment = {
            id: this.props.id,
            body: this.state.body,
            timestamp: Date.now()
        }
        this.props.dispatch(handleEditComment(comment))
        this.props.history.goBack()
    }

    render() {
        const { author, body } = this.state
        const newComment = this.props.match.params.commentId === undefined
        return (
            <div className='content'>
                <form className='post-form' onSubmit={newComment ? this.saveComment : this.editComment}>
                    <div className='post-item'>
                        Author:
                        <input disabled={!newComment} name='author' type='text' value={author} onChange={this.handleChange} />
                    </div>
                    <div className='post-item'>
                        Content:
                    </div>
                    <div className='post-item'>
                        <textarea rows='6' name='body' value={body} onChange={this.handleChange} style={{ width: '100%', resize: 'none' }} />
                    </div>
                    <div className='post-item'>
                        <button style={{ width: '100% '}} type='submit'>
                            Done
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


export default connect()(withRouter(CommentEdit))