import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { handleVotePost, handleDeletePost } from '../actions/posts';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

class Post extends Component {

    handleUpVote = () => {
        this.props.dispatch(handleVotePost(this.props.post.id, 'upVote'))
    }

    handleDownVote = () => {
        this.props.dispatch(handleVotePost(this.props.post.id, 'downVote'))
    }

    editPost = () => {
        this.props.history.push(`/edit_post/${this.props.post.id}`)
    }

    deletePost = () => {
        this.props.dispatch(handleDeletePost(this.props.post.id))
        if(this.props.location.pathname !== '/') {
            this.props.history.push('/')
        }
    }

    commentPost = () => {
        const { post } = this.props
        this.props.history.push(`/${post.category}/${post.id}/new_comment`)
    }

    render() {
        const { post } = this.props
        if (post !== undefined) {
            return (
                <div className='post-container'>
                    <div className='post-content'>
                        <div className='post-header'>
                            posted by {post.author}, {formatDate(post.timestamp)}. {post.commentCount} total comments
                        </div>
                        <div className='post-title'>
                            <Link to={`/${post.category}/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                        <div className='post-body'>
                            {post.body}
                        </div>
                    </div>
                    <div className='post-controls'>
                        <button className='vote-button' onClick={this.handleUpVote} >
                            Upvote
                        </button>
                        <div>
                            score: {post.voteScore}
                        </div>
                        <button className='vote-button' onClick={this.handleDownVote}>
                            Downvote
                        </button>
                        <button className='control-button' onClick={this.editPost}>
                            Edit
                        </button>
                        <button className='control-button' onClick={this.commentPost}>
                            Comment
                        </button>
                        <button className='control-button' onClick={this.deletePost}>
                            Delete
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='content'>
                    Post not found
                </div>
            )
        }
    }
}

function mapStateToProps({ posts }, ownProps) {
    if(posts[ownProps.id] !== undefined) {
        return {
            post: posts[ownProps.id].deleted ? undefined : posts[ownProps.id]
        }
    } else {
        return {
            post: undefined
        }
    }
}

export default connect(mapStateToProps)(withRouter(Post))