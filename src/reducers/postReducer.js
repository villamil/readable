import {
    FETCH_POST,
    UPDATE_POST,
    CLEAR_POST,
} from '../actions/actionsTypes';

export default function postReducer(state = {}, actions) {
    switch (actions.type) {
        case CLEAR_POST:
            return {};
        case UPDATE_POST:
            return {
                ...actions.post
            }
        case FETCH_POST:
            return {
                ...actions.post
            }

        default:
            return state;
    }
}