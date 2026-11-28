import React from 'react'
import PropTypes from 'prop-types'

const fieldLabels = {
  createdAt: 'Date Created',
  updatedAt: 'Date Updated',
  likeCount: 'Number of Likes',
}

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By: </label>

      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {fieldLabels[field] ?? field}
          </option>
        ))}
      </select>

      {' / '}

      <label htmlFor='sortOrder'>Sort Order: </label>

      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value='ascending'>
          {value === 'likeCount'
            ? 'Least Liked First'
            : 'Ascending'}
        </option>

        <option value='descending'>
          {value === 'likeCount'
            ? 'Most Liked First'
            : 'Descending'}
        </option>
      </select>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}