import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client/react/index.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import {
  LIKE_POST,
  UNLIKE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'

export function LikeButton({ postId, likedByMe = false }) {
  const [token] = useAuth()

  const mutationOptions = {
    variables: {
      postId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [
      GET_POSTS,
      GET_POSTS_BY_AUTHOR,
    ],
    awaitRefetchQueries: true,
  }

  const [likePost, likeResult] = useMutation(
    LIKE_POST,
    mutationOptions,
  )

  const [unlikePost, unlikeResult] = useMutation(
    UNLIKE_POST,
    mutationOptions,
  )

  const loading =
    likeResult.loading || unlikeResult.loading

  const error =
    likeResult.error || unlikeResult.error

  async function handleLike() {
    try {
      if (likedByMe) {
        await unlikePost()
      } else {
        await likePost()
      }
    } catch (err) {
      console.error('Error updating recipe like:', err)
    }
  }

  if (!token) {
    return (
      <p>
        <Link to='/login'>Log in</Link> to like this recipe.
      </p>
    )
  }

  return (
    <div>
      <button
        type='button'
        onClick={handleLike}
        disabled={loading}
        aria-pressed={likedByMe}
        style={{
          backgroundColor: likedByMe ? '#dc2626' : '#eeeeee',
          color: likedByMe ? 'white' : 'black',
          border: '1px solid #cccccc',
          borderRadius: '5px',
          padding: '8px 16px',
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading
          ? 'Updating...'
          : likedByMe
            ? '♥ Unlike'
            : '♡ Like'}
      </button>

      {error && (
        <p style={{ color: 'red' }}>
          {error.message}
        </p>
      )}
    </div>
  )
}

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
  likedByMe: PropTypes.bool,
}