import { saveVotePost, saveAddPost, saveEditPost, saveDeletePost } from "../utils/API";

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
	}
}

export function votePost (postId, option) {
    return {
        type: VOTE_POST,
        postId,
        option
    }
}

export function handleVotePost (postId, option) {
    return dispatch => {
        dispatch(votePost(postId, option))

        return saveVotePost(postId, option)
            .catch(e => console.log(e))
    }
}

export function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost (post) {
    return dispatch => {
        return saveAddPost(post)
            .then(res => dispatch(addPost(res)))
            .catch(e => console.log(e))
    }
}

export function editPost (post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function handleEditPost (post) {
    return dispatch => {
        return saveEditPost(post)
            .then(() => dispatch(editPost(post)))
            .catch(e => console.log(e))
    }
}

export function deletePost (postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function handleDeletePost (postId) {
    return dispatch => {
        return saveDeletePost(postId)
            .then(() => dispatch(deletePost(postId)))
            .catch(e => console.log(e))
    }
}