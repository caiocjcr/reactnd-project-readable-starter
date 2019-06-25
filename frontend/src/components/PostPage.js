import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Post from './Post'
import Comment from './Comment'
import { getComments } from '../utils/API';
import { receiveComments } from '../actions/comments'

class PostPage extends Component {

    componentDidMount() {
        const postId = this.props.match.params.id
        getComments(postId)
            .then(comments => this.props.dispatch(receiveComments(comments)))
    }

    render() {
        const id = this.props.match.params.id
        
        return (
            <div className='content'>
                <Post id={id} />
                {!this.props.isPostDeleted && this.props.commentIds.map(id => (
                    <Comment key={id} id={id} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ comments, posts }, ownProps) {
    let isPostDeleted = false
    if(posts[ownProps.match.params.id] !== undefined) {
        isPostDeleted = posts[ownProps.match.params.id].deleted
    }
    if(ownProps.sortBy === 'votes') {
        return {
            commentIds: Object.keys(comments)
                .sort((a, b) => comments[b].voteScore - comments[a].voteScore)
                .filter(c => !comments[c].deleted && !comments[c].parentDeleted),
            isPostDeleted
        }
    } else if(ownProps.sortBy === 'dates') {
        return {
            commentIds: Object.keys(comments)
                .sort((a, b) => comments[b].timestamp - comments[a].timestamp)
                .filter(c => !comments[c].deleted && !comments[c].parentDeleted),
            isPostDeleted
        }
    } else {
        return {
            commentIds: Object.keys(comments),
            isPostDeleted
        }
    }
}

export default connect(mapStateToProps)(withRouter(PostPage))