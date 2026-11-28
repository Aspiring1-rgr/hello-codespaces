import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useMutation } from '@tanstack/react-query'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { Header } from '../components/Header.jsx'
import { Post } from '../components/Post.jsx'
import { PostStats } from '../components/PostStats.jsx'
import { postTrackEvent } from '../api/events.js'
import { GET_POST_BY_ID } from '../api/graphql/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Helmet } from 'react-helmet-async'

export function ViewPost({ postId }) {
  const [session, setSession] = useState()
  const [token] = useAuth()

  const trackEventMutation = useMutation({
    mutationFn: (action) => postTrackEvent({ postId, action, session }),
    onSuccess: (data) => setSession(data?.session),
  })

  useEffect(() => {
    let timeout = setTimeout(() => {
      trackEventMutation.mutate('startView')
      timeout = null
    }, 1000)

    return () => {
      if (timeout) clearTimeout(timeout)
      else trackEventMutation.mutate('endView')
    }
  }, [])

  const { data, loading, error, refetch } = useGraphQLQuery(GET_POST_BY_ID, {
    variables: {
      id: postId,
    },
    context: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    refetch().catch(console.error)
  }, [token, refetch])

  const post = data?.postById

  function truncate(str, max = 160) {
    if (!str) return str

    if (str.length > max) {
      return str.slice(0, max - 3) + '...'
    }

    return str
  }

  if (loading) {
    return <p>Loading recipe...</p>
  }

  if (error) {
    return <p>Error loading recipe: {error.message}</p>
  }

  if (!post) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to='/'>Back to main page</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>{post.title} | Richards Recipe Blog</title>

        <meta name='description' content={truncate(post.contents)} />

        <meta property='og:type' content='article' />

        <meta property='og:title' content={post.title} />

        <meta property='og:article:author' content={post.author?.username} />

        {(post.tags ?? []).map((tag) => (
          <meta key={tag} property='og:article:tag' content={tag} />
        ))}
      </Helmet>

      <Header />

      <br />
      <hr />

      <Link to='/'>Back to main page</Link>

      <br />
      <hr />

      <Post {...post} fullPost />

      <hr />

      <PostStats postId={postId} />
    </div>
  )
}

ViewPost.propTypes = {
  postId: PropTypes.string.isRequired,
}
