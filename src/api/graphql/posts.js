import { gql } from '@apollo/client/core/index.js'
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    contents
    tags
    updatedAt
    createdAt
    author {
      username
    }
  }
`
export const GET_POSTS = gql`
  query GetPosts($options: PostsOptions) {
    posts(options: $options) {
      id
      title
      contents
      imageUrl
      tags
      author {
        username
      }
    }
  }
`

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($username: String!, $options: PostsOptions) {
    postsByAuthor(username: $username, options: $options) {
      id
      title
      contents
      imageUrl
      tags
      author {
        username
      }
    }
  }
`
export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $contents: String, $imageUrl: String) {
    createPost(title: $title, contents: $contents, imageUrl: $imageUrl) {
      id
      title
      contents
      imageUrl
    }
  }
`
