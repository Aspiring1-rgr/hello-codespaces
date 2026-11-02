import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'
import { useState } from 'react'
export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [token] = useAuth()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents, imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
      setContents('')
      setImageUrl('')
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }
  if (!token) return <div>Please log in to create new posts.</div>
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Recipe</h2>
      <div>
        <label htmlFor='create-title'>Recipe Name: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-contents'>Recipe Instructions: </label>
        <textarea
          id='create-contents'
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-image'>Recipe Image URL: </label>
        <input
          type='url'
          name='create-image'
          id='create-image'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder='https://example.com/recipe.jpg'
        />
      </div>
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || !contents || createPostMutation.isPending}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          <p>Recipe created successfully!</p>
        </>
      ) : null}
    </form>
  )
}
