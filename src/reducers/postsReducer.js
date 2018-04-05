import {
    FETCH_POSTS,
    UPDATE_POST,
    CREATE_POST,
    DELETE_POST,
} from '../actions/actionsTypes';

export default function postsReducers(state = [], actions) {
    switch (actions.type) {
        case UPDATE_POST:
            return state.map((post) => {
                if(post.id === actions.post.id) {
                    return actions.post;
                }
                return post;
            })
        case FETCH_POSTS:
            return actions.posts
        case CREATE_POST:
            return [
                ...state,
                actions.post
            ]
        case DELETE_POST: 
            return state.filter((post) => post.id !== actions.post.id);
        default:
            return state;
    }
}