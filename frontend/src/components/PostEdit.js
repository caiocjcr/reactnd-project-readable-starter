import React, { Component } from 'react'
import { generateUID } from '../utils/helpers';
import { connect } from 'react-redux'
import { handleAddPost, handleEditPost } from '../actions/posts';
import { withRouter } from 'react-router-dom'

class PostEdit extends Component {
    state = {
        postId: null,
        author: '',
        title: '',
        body: '',
        category: 'react'
    }

    componentDidMount() {
        if(this.props.post !== undefined) {
            const { post } = this.props
            this.setState({
                postId: post.id,
                author: post.author,
                title: post.title,
                body: post.body,
                category: post.category
            })
        } else if (this.props.post === undefined && this.props.id) {
            alert(`Unable to find post ${this.props.id}! Redirecting...`)
            this.props.history.push('/')
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    savePost = event => {
        event.preventDefault()
        let newPost = {}
        if(this.props.id !== undefined) {
            newPost = this.props.post
            newPost.author = this.state.author
            newPost.title = this.state.title
            newPost.body = this.state.body
            newPost.category = this.state.category
        } else {
            newPost.author = this.state.author
            newPost.title = this.state.title
            newPost.body = this.state.body
            newPost.category = this.state.category
            newPost.id = generateUID()
            newPost.timestamp = Date.now()
        }
        this.props.dispatch(handleAddPost(newPost))
        this.props.history.push('/')
    }

    editPost = event => {
        event.preventDefault()
        const post = {
            id: this.state.postId,
            title: this.state.title,
            body: this.state.body,
            category: this.state.category
        }
        this.props.dispatch(handleEditPost(post))
        this.props.history.push(`/${post.category}/${post.id}`)
    }

    render() {
        const { author, title, body, category } = this.state
        const { categories } = this.props
        const newPost = this.props.post === undefined
        return (
            <div className='content'>
                <form className='post-form' onSubmit={newPost ? this.savePost : this.editPost}>
                    <div className='post-item'>
                        Author:
                        <input disabled={!newPost} name='author' type='text' value={author} onChange={this.handleChange} />
                    </div>
                    <div className='post-item'>
                        Title:
                        <input name='title' type='text' value={title} onChange={this.handleChange} />
                    </div>
                    <div className='post-item'>
                        Category:
                        <select disabled={!newPost} name='category' value={category} onChange={this.handleChange}>
                            {categories.map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                        </select>
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

function mapStateToProps({ categories, posts }, ownProps) {
    if(ownProps.id !== undefined) {
        return {
            categories,
            post: posts[ownProps.id]
        }
    }
    return {
        categories
    }
}

export default connect(mapStateToProps)(withRouter(PostEdit))