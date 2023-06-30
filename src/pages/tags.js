import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import setupTags from "../utils/setupTags"
import slugify from "slugify"
import Seo from "../components/SEO"

const Tags = ({ data }) => {
  const tags = data.allMarkdownRemark.nodes.map(({ frontmatter }) => frontmatter.tags)
  const newTags = setupTags(tags)
  return (
    <Layout>
      <Seo title="Tags" />
      <main className="page">
        <section className="tags-page">
          {newTags.map((tag, index) => {
            const [text, value] = tag
            const slug = slugify(text, { lower: true })

            return (
              <Link to={`/tags/${slug}`} key={index} className="tag">
                <h5>{text}</h5>
                <p>{value} recipe</p>
              </Link>
            )
          })}
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`

export default Tags
