import React from 'react'
import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { LikeButton } from './LikeButton.jsx'

export function Post({
  title,
  contents,
  author,
  imageUrl,
  id,
  likeCount = 0,
  likedByMe = false,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image of ${title}`}
          style={{
            maxWidth: fullPost ? '500px' : '200px',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      )}

      {fullPost && <div>{contents}</div>}

      {author && (
        <p>
          <em>
            Written by <User {...author} />
          </em>
        </p>
      )}

      <p>
        <strong>
          ♥ {likeCount} {likeCount === 1 ? 'like' : 'likes'}
        </strong>
      </p>

      {fullPost && <LikeButton postId={id} likedByMe={likedByMe} />}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  imageUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
  likedByMe: PropTypes.bool,
  fullPost: PropTypes.bool,
}
