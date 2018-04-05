import { combineReducers } from 'redux';
import posts from './postsReducer';
import post from './postReducer';
import comments from './commentsReducer';
import categories from './categoryReducer';
import sorting from './sortingReducer';

export default combineReducers({
    posts,
    post,
    comments,
    categories,
    sorting
});;