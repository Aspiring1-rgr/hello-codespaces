import React from 'react'
import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function Post({
  title,
  contents,
  author,
  imageUrl,
  _id,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={'Image of ${title}'}
          style={{
            maxWidth: '200px',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      )}
      {fullPost && <div>{contents}</div>}
      {author && (
        <em>
          {fullPost && <br />}
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
