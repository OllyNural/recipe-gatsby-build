import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

const MealTypesTemplate = (props) => {
  const { edges } = props.data.allMarkdownRemark;

  // Process the categories
  let categories = [];
  // Iterate through each post, putting all found tags into `categories`
  edges.forEach((edge) => {
    if (_.get(edge, `node.frontmatter.categories`)) {
      categories = categories.concat(edge.node.frontmatter.categories);
    }
  });
  // Eliminate duplicate tags
  categories = _.uniq(categories);

  return (
    <div className="columns is-multiline">
      {categories &&
        categories.map((category, i) => (
          <div className="is-parent column is-6" key={i}>
            <article
              className={`blog-list-item tile is-child box notification ${category}`}
            >
              <header>
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={`${category}`}
                  >
                    {category}
                  </Link>
                </p>
              </header>
            </article>
          </div>
        ))}
    </div>
  );
};

MealTypes.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function MealTypes() {
  return (
    <StaticQuery
      query={graphql`
        query MealTypesQuery {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  categories
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <MealTypesTemplate data={data} count={count} />}
    />
  );
}

// allMarkdownRemark(
//   sort: { order: DESC, fields: [frontmatter___date] }
//   filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
// ) {
//   edges {
//     node {
//       excerpt(pruneLength: 400)
//       id
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//         templateKey
//         date(formatString: "MMMM DD, YYYY")
//         featuredpost
//         featuredimage {
//           childImageSharp {
//             gatsbyImageData(
//               width: 120
//               quality: 100
//               layout: CONSTRAINED
//             )

//           }
//         }
//       }
//     }
//   }
// }
// }
