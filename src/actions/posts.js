import * as APIUtils from '../utils/api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const CLEAR_POST = 'CLEAR_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

export function clearPost() {
    return {
        type: CLEAR_POST
    }
}

export function createPost(post) {
    return {
        type: CREATE_POST,
        post
    }
}

export const newPost = body => dispatch => (
    APIUtils
        .createPost(body)
        .then(post => dispatch(createPost(post)))
);

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
};

export function removePost(post) {
    return {
        type: DELETE_POST,
        post
    }
}

export const modifyPost = (postId, body) => dispatch => (
    APIUtils
        .updatePost(postId, body)
        .then(post => dispatch(updatePost(post)))
);

export const deletePost = (postId) => dispatch => (
    APIUtils
        .deletePost(postId)
        .then(post => dispatch(removePost(post)))
)

export const votePost = (postId, vote) => dispatch => (
    APIUtils
        .votePost(postId, vote)
        .then((post) => dispatch(updatePost(post)))
);

export const receivePosts = (posts) => ({
    type: FETCH_POSTS,
    posts
});

export const fetchPosts = () => dispatch => (
    APIUtils
        .fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
);

export const fetchPostsByCategory = (category) => dispatch => (
    APIUtils
        .fetchPostsByCategory(category)
        .then(posts => dispatch(receivePosts(posts)))
);

export const receivePost = (post) => ({
    type: FETCH_POST,
    post
});

export const fetchPost = (postId) => dispatch => (
    APIUtils
        .fetchPost(postId)
        .then(post => dispatch(receivePost(post)))
);