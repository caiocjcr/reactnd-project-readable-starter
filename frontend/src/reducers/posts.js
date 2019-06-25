import { RECEIVE_POSTS, VOTE_POST, ADD_POST, EDIT_POST, DELETE_POST } from '../actions/posts'
import { arrayToObject } from '../utils/helpers';

export default function posts(state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS :
            const postsJson = arrayToObject(action.posts, 'id')
            return postsJson
        case VOTE_POST :
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    voteScore: action.option === 'upVote' ? state[action.postId].voteScore + 1 : state[action.postId].voteScore - 1
                }
            }
        case ADD_POST :
            return {
                ...state,
                [action.post.id]: {
                    ...action.post
                }
            }
        case EDIT_POST :
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    title: action.post.title,
                    body: action.post.body
                }
            }
        case DELETE_POST :
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    deleted: true
                }
            }
        default :
            return state
    }
}