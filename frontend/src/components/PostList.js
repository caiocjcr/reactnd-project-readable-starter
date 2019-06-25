import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'


class PostList extends Component {
    render() {
        const { postsIds } = this.props
        return (
            <div className="content">
                {postsIds.map(id => (
                    <Post key={id} id={id} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    if(ownProps.category.name === 'all') {
        if(ownProps.sortBy === 'votes') {
            return {
                postsIds: Object.keys(posts)
                    .sort((a, b) => posts[b].voteScore - posts[a].voteScore)
                    .filter(p => !posts[p].deleted)
            }
        } else if(ownProps.sortBy === 'dates') {
            return {
                postsIds: Object.keys(posts)
                    .sort((a, b) => posts[b].timestamp - posts[a].timestamp)
                    .filter(p => !posts[p].deleted)
            }
        }
    }
    if(ownProps.sortBy === 'votes') {
        return {
            postsIds: Object.keys(posts)
                .sort((a, b) => posts[b].voteScore - posts[a].voteScore)
                .filter(p => posts[p].category === ownProps.category.name && !posts[p].deleted)
        }
    } else if(ownProps.sortBy === 'dates') {
        return {
            postsIds: Object.keys(posts)
                .sort((a, b) => posts[b].timestamp - posts[a].timestamp)
                .filter(p => posts[p].category === ownProps.category.name && !posts[p].deleted)
        }
    } else {
        return {
            postsIds: Object.keys(posts)
        }
    }
}

export default connect(mapStateToProps)(PostList)