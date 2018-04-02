const APP_KEY = 'ud123';

const headers = {
    'Authorization': APP_KEY,
    'Content-Type': 'application/json'
}

export function fetchPosts() {
    return fetch(`http://localhost:3001/posts`, {
        method:'get',
        headers,
    })
    .then((res) => res.json());
}

export function fetchPostsByCategory(category) {
    return fetch(`http://localhost:3001/${category}/posts`, {
        method:'get',
        headers,
    })
    .then((res) => res.json());
}

export function fetchPost(postId) {
    return fetch(`http://localhost:3001/posts/${postId}`, {
        method:'get',
        headers,
    })
    .then((res) => res.json());
}

export function votePost(postId, vote) {
    return fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'post',
        headers,
        body: JSON.stringify({
            option: vote === 1 ? 'upVote' : 'downVote'
        })
    })
    .then((res) => res.json());
}

export function createPost(post) {
    return fetch(`http://localhost:3001/posts`, {
        method: 'post',
        headers,
        body: JSON.stringify(post)
    })
    .then((res) => res.json());
}

export function updatePost(postId, body) {
    return fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'put',
        headers,
        body: JSON.stringify(body)
    })
    .then((res) => res.json());
}

export function deletePost(postId) {
    return fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'delete',
        headers,
    })
    .then((res) => res.json());
}


export function voteComment(commentId, vote) {
    return fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'post',
        headers,
        body: JSON.stringify({
            option: vote === 1 ? 'upVote' : 'downVote'
        })
    })
    .then((res) => res.json());
}

export function fetchComments(postId) {
    return fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: 'get',
        headers,
    })
    .then((res) => res.json());
}

export function fetchCategories() {
    return fetch(`http://localhost:3001/categories`, {
        method: 'get',
        headers
    })
    .then((res) => res.json());
}

export function createComment(body) {
    return fetch(`http://localhost:3001/comments`, {
        method: 'post',
        headers,
        body: JSON.stringify(body),
    })
    .then((res) => res.json());
}

export function deleteComment(commentId) {
    return fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'delete',
        headers,
    })
    .then((res) => res.json()); 
}