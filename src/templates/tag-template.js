import React from "react";
import { graphql } from "gatsby";
import RecipesList from "../components/RecipesList";
import Layout from "../components/Layout";
import Seo from "../components/SEO";

const TagTemplate = ({ data, pageContext }) => {
  const recipeMeta = data.allMarkdownRemark.nodes.map(({ frontmatter, fields }) => ({ recipes: frontmatter, slug: fields.slug }));
  return (
    <Layout>
      <Seo title={pageContext.tag} />
      <main className="page">
        <h2>{pageContext.tag}</h2>
        <div className="tag-recipes">
          <RecipesList recipes={recipeMeta} />
        </div>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query GetRecipeByTag($tag: String) {
    allMarkdownRemark(filter: { frontmatter: { tags: { eq: $tag } } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          cookTime
          prepTime
          featuredimage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
            }
          }
        }
      }
    }
  }
`;

export default TagTemplate;
