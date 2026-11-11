export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  if (!res.ok) {
    throw new Error('Failed to retrieve recipes.')
  }
  return await res.json()
}
export const getPostById = async (postId) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`)
  if (!res.ok) {
    throw new Error('Failed to retrieve recipe.')
  }
  return await res.json()
}
export const createPost = async (token, post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  if (!res.ok) {
    throw new Error('Failed to create recipe.')
  }
  return await res.json()
}
