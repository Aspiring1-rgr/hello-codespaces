import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    contents: String,
    tags: [String],
    imageUrl: {
      type: String,
      trim: true,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
)

export const Post = mongoose.model('post', postSchema)
