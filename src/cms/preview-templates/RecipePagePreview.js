import React from 'react'
import PropTypes from 'prop-types'
import Recipe from '../../templates/recipe'

const RecipePagePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
    <Recipe
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

RecipePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RecipePagePreview
