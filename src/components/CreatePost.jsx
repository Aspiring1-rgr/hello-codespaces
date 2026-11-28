import React, { useState } from 'react'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [token] = useAuth()

  const [createPost, { loading, data, error }] = useGraphQLMutation(
    CREATE_POST,
    {
      variables: {
        title,
        contents,
        imageUrl,
      },
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
      refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
      awaitRefetchQueries: true,
    },
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await createPost()

      if (result.data?.createPost) {
        setTitle('')
        setContents('')
        setImageUrl('')
      }
    } catch (err) {
      console.error('Error creating recipe:', err)
    }
  }

  if (!token) {
    return <div>Please log in to create new posts.</div>
  }

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
        <label htmlFor='create-contents'>Recipe Instructions:</label>
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
        value={loading ? 'Creating...' : 'Create'}
        disabled={!title || !contents || loading}
      />

      {error && (
        <p style={{ color: 'red' }}>Error creating recipe: {error.message}</p>
      )}

      {data?.createPost ? (
        <>
          <br />
          Post{' '}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>
          <p>Recipe created successfully!</p>
        </>
      ) : null}
    </form>
  )
}
