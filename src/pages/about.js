import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import RecipesList from "../components/RecipesList"
import Seo from "../components/SEO"

const About = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  const recipeMeta = nodes.map(({ frontmatter, fields }) => ({ recipes: frontmatter, slug: fields.slug }));

  return (
    <Layout>
      <Seo title="About" />
      <main className="page">
        <section className="about-page">
          <article>
            <h2>I'm baby coloring book poke taxidermy</h2>
            <p>
              Taxidermy forage glossier letterpress heirloom before they sold
              out you probably haven't heard of them banh mi biodiesel chia.
            </p>
            <p>
              Taiyaki tumblr flexitarian jean shorts brunch, aesthetic salvia
              retro.
            </p>
            <Link to="/contact" className="btn">
              contact
            </Link>
          </article>
          <StaticImage
            src="../assets/images/about.jpeg"
            alt="Person Pouring Salt in Bowl"
            className="about-img"
            placeholder="blurred"
          />
        </section>
        <section className="featured-recipes">
          <h5>Look at this Awesomesouce!</h5>
          <RecipesList recipes={recipeMeta} />
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {    
    allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
    ) {
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
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`

export default About
