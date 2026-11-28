import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createPost, likePost, unlikePost } from '../services/posts.js'

export const mutationSchema = `#graphql
type Mutation {
  signupUser(username: String!, password: String!): User
  loginUser(username: String!, password: String!): String

  createPost(
    title: String!,
    contents: String,
    tags: [String],
    imageUrl: String
  ): Post

  likePost(postId: ID!): Post!
  unlikePost(postId: ID!): Post!
}
`

function checkAuth(auth) {
  if (!auth?.sub) {
    throw new GraphQLError(
      'You need to be authenticated to perform this action.',
      {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      },
    )
  }
}

export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser(username, password)
    },

    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },

    createPost: async (
      parent,
      { title, contents, tags, imageUrl },
      { auth },
    ) => {
      checkAuth(auth)

      return await createPost(auth.sub, {
        title,
        contents,
        tags,
        imageUrl,
      })
    },

    likePost: async (parent, { postId }, { auth }) => {
      checkAuth(auth)

      const post = await likePost(auth.sub, postId)

      if (!post) {
        throw new GraphQLError('Recipe not found.', {
          extensions: {
            code: 'NOT_FOUND',
          },
        })
      }

      return post
    },

    unlikePost: async (parent, { postId }, { auth }) => {
      checkAuth(auth)

      const post = await unlikePost(auth.sub, postId)

      if (!post) {
        throw new GraphQLError('Recipe not found.', {
          extensions: {
            code: 'NOT_FOUND',
          },
        })
      }

      return post
    },
  },
}
