import React from 'react'
import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { GET_POSTS, GET_POSTS_BY_AUTHOR } from '../api/graphql/posts.js'
import { Header } from '../components/Header.jsx'
//import { useQuery } from '@tanstack/react-query'
//import { getPosts } from '../api/posts.js'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
//import PropTypes from 'prop-types'

export function Blog() {
  const [author, setauthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('ascending')
  /* const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  }) 
  const posts = postsQuery.data ?? [] */

  const postsQuery = useGraphQLQuery(author ? GET_POSTS_BY_AUTHOR : GET_POSTS, {
    variables: { author, options: { sortBy, sortOrder } },
  })
  const posts = postsQuery.data?.postsByAuthor ?? postsQuery.data?.posts ?? []
  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Richards Recipe Blog</title>
        <meta
          name='description'
          content='A blog full of articles about delicious food recipes.'
        />
      </Helmet>
      <h1>Welcome to My Blog!</h1>
      <Header />
      <br />
      <hr />
      <CreatePost />
      <br />
      <hr />
      Filter by:{' '}
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setauthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
