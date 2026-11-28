import { getUserInfoById } from '../services/users.js'

export const postSchema = `#graphql
type Post {
  id: ID!
  title: String!
  author: User
  contents: String
  tags: [String!]
  imageUrl: String
  likeCount: Int!
  likedByMe: Boolean!
  createdAt: Float
  updatedAt: Float
}
`

export const postResolver = {
  Post: {
    id: (post) => {
      return post._id.toString()
    },

    author: async (post) => {
      return await getUserInfoById(post.author)
    },

    likeCount: (post) => {
      return post.likes?.length ?? 0
    },

    likedByMe: (post, args, { auth }) => {
      if (!auth?.sub) return false

      return (post.likes ?? []).some(
        (userId) => userId.toString() === auth.sub.toString(),
      )
    },

    createdAt: (post) => {
      return post.createdAt?.getTime()
    },

    updatedAt: (post) => {
      return post.updatedAt?.getTime()
    },
  },
}
