import { gql } from '@apollo/client/core/index.js'

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    contents
    imageUrl
    tags
    likeCount
    createdAt
    updatedAt
    author {
      username
    }
  }
`

export const GET_POSTS = gql`
  query GetPosts($options: PostsOptions) {
    posts(options: $options) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($username: String!, $options: PostsOptions) {
    postsByAuthor(username: $username, options: $options) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    postById(id: $id) {
      ...PostFields
      likedByMe
    }
  }
  ${POST_FIELDS}
`

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $contents: String, $imageUrl: String) {
    createPost(title: $title, contents: $contents, imageUrl: $imageUrl) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likedByMe
    }
  }
`

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
      likeCount
      likedByMe
    }
  }
`
