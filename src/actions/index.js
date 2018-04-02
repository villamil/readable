import * as APIUtils from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UPDATE_SORTING = 'UPDATE_SORTING';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const POST_VOTE = 'POST_VOTE';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';
export const CLEAR_POST = 'CLEAR_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';


export function changeSort({ actualOrder, fieldToOrder }) {
    return {
        type: UPDATE_SORTING,
        payload: {
            actualOrder,
            fieldToOrder
        }
    }
};

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

export function clearComments() {
    return {
        type: CLEAR_COMMENTS
    }
};

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

export const receiveComments = (comments) => ({
    type: FETCH_COMMENTS,
    comments,
});

export const receiveCategories = (categories) => ({
    type: FETCH_CATEGORIES,
    categories,
});

export const fetchCategories = () => dispatch => (
    APIUtils
        .fetchCategories()
        .then(data => dispatch(receiveCategories(data.categories)))
);

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
        .then(console.log)
        .then(() => dispatch(removeComment(commentId)))
);