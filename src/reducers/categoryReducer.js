import { FETCH_CATEGORIES } from '../actions/actionsTypes';

export default function categories(state = [], actions) {
    switch (actions.type) {
        case FETCH_CATEGORIES:
            return [
                ...actions.categories
            ]
        default:
            return state;
    }
}