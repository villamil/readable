import * as APIUtils from '../utils/api';
import { FETCH_CATEGORIES } from './actionsTypes';

export const receiveCategories = (categories) => ({
    type: FETCH_CATEGORIES,
    categories,
});

export const fetchCategories = () => dispatch => (
    APIUtils
        .fetchCategories()
        .then(data => dispatch(receiveCategories(data.categories)))
);
