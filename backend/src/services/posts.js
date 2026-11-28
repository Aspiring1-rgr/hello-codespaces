import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

export async function createPost(userId, { title, contents, tags, imageUrl }) {
  const post = new Post({ title, author: userId, contents, tags, imageUrl })
  return await post.save()
}
export async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  if (sortBy === 'likeCount') {
    const direction = sortOrder === 'ascending' ? 1 : -1

    return await Post.aggregate([
      {
        $match: query,
      },
      {
        $addFields: {
          likeCount: {
            $size: {
              $ifNull: ['$likes', []],
            },
          },
        },
      },
      {
        $sort: {
          likeCount: direction,
          _id: 1,
        },
      },
    ])
  }

  return await Post.find(query).sort({
    [sortBy]: sortOrder,
  })
}
export async function listAllPosts(options) {
  return await listPosts({}, options)
}
export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
export async function getPostById(postId) {
  return await Post.findById(postId)
}
export async function updatePost(
  userId,
  postId,
  { title, contents, tags, imageUrl },
) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags, imageUrl } },
    { new: true },
  )
}
export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}
export async function likePost(userId, postId) {
  return await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        likes: userId,
      },
    },
    {
      new: true,
      timestamps: false,
    },
  )
}

export async function unlikePost(userId, postId) {
  return await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        likes: userId,
      },
    },
    {
      new: true,
      timestamps: false,
    },
  )
}
