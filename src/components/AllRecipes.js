import React from "react";
import TagsList from "./TagsList";
import RecipesList from "./RecipesList";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "recipe" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
              }
            }
            cookTime
            prepTime
            tags
          }
        }
      }
    }
  }
`;
const AllRecipes = () => {
  const data = useStaticQuery(query);
  const recipes = data.allMarkdownRemark.edges.map(({ node }) => node.frontmatter)
  const recipeMeta = data.allMarkdownRemark.edges.map(({ node }) => ({ recipes: node.frontmatter, slug: node.fields.slug }));

  return (
    <section className="recipes-container">
      <TagsList recipes={recipes} />
      <RecipesList recipes={recipeMeta} />
    </section>
  );
};

export default AllRecipes;
