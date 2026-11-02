import React from 'react'
import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Post({ title, contents, author, imageUrl }) {
  return (
    <article>
      <h3>{title}</h3>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={'Image of ${title}'}
          style={{
            maxWidth: '400px',
            width: '100%',
            height: 'auto',
            onjectFit: 'cover',
          }}
        />
      )}
      <div>{contents}</div>
      {author && (
        <em>
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
}
