import * as APIUtils from '../utils/api';
import { 
    CLEAR_COMMENTS, 
    UPDATE_COMMENT,
    FETCH_COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
} from './actionsTypes';

export function clearComments() {
    return {
        type: CLEAR_COMMENTS
    }
};

export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
};

export const voteComment = (commentId, vote) => dispatch => (
    APIUtils
        .voteComment(commentId, vote)
        .then((comment) => dispatch(updateComment(comment)))
);

export const changeComment = (commentId, body) => dispatch => (
    APIUtils
        .updateComment(commentId, body)
        .then((comment) => dispatch(updateComment(comment)))
);

export const receiveComments = (comments) => ({
    type: FETCH_COMMENTS,
    comments,
});


export const fetchComments = (postId) => dispatch => (
    APIUtils
        .fetchComments(postId)
        .then(comments => dispatch(receiveComments(comments)))
);

export const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
});

export const postComment = (body) => dispatch => (
    APIUtils
        .createComment(body)
        .then(comment => dispatch(createComment(comment)))
);

export const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

export const deleteComment = (commentId) => dispatch => (
    APIUtils
        .deleteComment(commentId)
        .then(() => dispatch(removeComment(commentId)))
);