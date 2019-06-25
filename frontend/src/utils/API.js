const api = 'http://localhost:3001'

const headers = {
    'Authorization': 'readable'
}

export const getAllCategories = () => 
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const getPost = id =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())

export const getPostsInCategory = category =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())

export const saveVotePost = (postId, option) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    })
    .then(res => res.json())

export const saveVoteComment = (commentId, option) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    })
    .then(res => res.json())

export const saveAddPost = post =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())

export const getComments = postId =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const saveEditPost = post =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: post.title, body: post.body })
    })
    .then(res => res.json())

export const saveDeletePost = postId =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers
    })
    .then(res => res.json())

export const saveDeleteComment = commentId =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers
    })
    .then(res => res.json())

export const saveAddComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())

export const getComment = id =>
    fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

export const saveEditComment = comment =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({body: comment.body, timestamp: comment.timestamp})
    })
    .then(res => res.json())