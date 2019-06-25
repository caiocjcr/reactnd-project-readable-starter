import { saveVoteComment, saveDeleteComment, getAllPosts, saveAddComment, saveEditComment } from '../utils/API'
import { receivePosts } from './posts';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export function receiveComments (comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function voteComment (commentId, option) {
    return {
        type: VOTE_COMMENT,
        commentId,
        option
    }
}

export function handleVoteComment (commentId, option) {
    return dispatch => {
        dispatch(voteComment(commentId, option))

        return saveVoteComment(commentId, option)
            .catch(e => console.log(e))
    }
}

export function deleteComment (commentId) {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export function handleDeleteComment (commentId) {
    return dispatch => {
        saveDeleteComment(commentId)
            .then(() => {
                dispatch(deleteComment(commentId))
                getAllPosts()
                    .then(posts => dispatch(receivePosts(posts)))
            })
            .catch(e => console.log(e))
    }
}

export function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleAddComment (comment) {
    return dispatch => {
        saveAddComment(comment)
            .then(() => {
                dispatch(addComment(comment))
                getAllPosts()
                    .then(posts => dispatch(receivePosts(posts)))
            })
            .catch(e => console.log(e))
    }
}

export function editComment (comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function handleEditComment (comment) {
    return dispatch => {
        saveEditComment(comment)
            .then(() => dispatch(editComment(comment)))
            .catch(e => console.log(e))
    }
}