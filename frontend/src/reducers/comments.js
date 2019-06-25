import { RECEIVE_COMMENTS, VOTE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, ADD_COMMENT } from '../actions/comments'
import { arrayToObject } from '../utils/helpers'

export default function comments(state = {}, action) {
    switch(action.type) {
        case RECEIVE_COMMENTS :
            const commentsJson = arrayToObject(action.comments, 'id')
            return commentsJson
        case VOTE_COMMENT :
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    voteScore: action.option === 'upVote' ? state[action.commentId].voteScore + 1 : state[action.commentId].voteScore - 1
                }
            }
        case DELETE_COMMENT :
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    deleted: true
                }
            }
        case EDIT_COMMENT : 
            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    body: action.comment.body,
                    timestamp: action.comment.timestamp
                }
            }
        case ADD_COMMENT :
            return {
                ...state,
                [action.comment.id]: {
                    ...action.comment
                }
            }
        default :
            return state
    }
}