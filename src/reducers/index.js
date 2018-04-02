import { combineReducers } from 'redux';
import {
    FETCH_POSTS,
    FETCH_POST,
    UPDATE_POST,
    CLEAR_POST,
    CREATE_POST,
    DELETE_POST,
} from '../actions/posts';
import {
    UPDATE_COMMENT,
    FETCH_COMMENTS,
    CLEAR_COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
} from '../actions/comments';
import {
    UPDATE_SORTING,
} from '../actions/sorting';
import {
    FETCH_CATEGORIES
} from '../actions/categories';

const initialSortingState = {
    actualOrder: {
        voteScore: 'asc',
        timestamp: 'asc'
    },
    fieldToOrder: ''
}

function sorting(state = initialSortingState, actions) {
    switch (actions.type) {
        case UPDATE_SORTING:
            const { actualOrder, fieldToOrder } = actions.payload;
            return {
                actualOrder,
                fieldToOrder
            }
        default:
            return state;
    }
}

function posts(state = [], actions) {
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

function comments(state = [], actions) {
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

function categories(state = [], actions) {
    switch (actions.type) {
        case FETCH_CATEGORIES: 
            return [
                ...actions.categories
            ]
        default:
            return state;
    }
}

function post(state = {}, actions) {
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

export default combineReducers({
    posts,
    post,
    comments,
    categories,
    sorting
});;