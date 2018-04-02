import * as APIUtils from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const receiveCategories = (categories) => ({
    type: FETCH_CATEGORIES,
    categories,
});

export const fetchCategories = () => dispatch => (
    APIUtils
        .fetchCategories()
        .then(data => dispatch(receiveCategories(data.categories)))
);
