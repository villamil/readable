import {
    UPDATE_COMMENT,
    FETCH_COMMENTS,
    CLEAR_COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
} from '../actions/actionsTypes';

export default function commentsReducer(state = [], actions) {
    switch (actions.type) {
        case CLEAR_COMMENTS:
            return [];
        case FETCH_COMMENTS:
            return actions.comments;
        case UPDATE_COMMENT:
            return state.map((comment) => {
                if (comment.id === actions.comment.id) {
                    return actions.comment;
                }
                return comment;
            });
        case CREATE_COMMENT:
            return [
                ...state,
                actions.comment
            ];
        case DELETE_COMMENT:
            return [
                ...state.filter((comment) => comment.id !== actions.commentId)
            ];
        default:
            return state;
    }
}