import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
const RecipesList = ({ recipes = [] }) => {
  return (
    <div className="recipes-list">
      {recipes.map(({ recipes, slug }, id) => {
        const { title, featuredImage, prepTime, cookTime } = recipes
        const pathToImage = getImage(featuredImage)
        return (
          <Link key={id} to={`${slug}`} className="recipe">
            <GatsbyImage
              image={pathToImage}
              className="recipe-img"
              alt={title}
            />
            <h5>{title}</h5>
            <p>
              Prep : {prepTime}min | Cook : {cookTime}min
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default RecipesList
