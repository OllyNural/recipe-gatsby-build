import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import slugify from 'slugify';
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BsClockHistory, BsClock, BsPeople } from "react-icons/bs"

// eslint-disable-next-line
export const ProductPageTemplate = ({
  title,
  description,
  prepTime,
  cookTime,
  servings,
  tags,
  featuredimage,
  instructions,
  ingredients,
  tools
}) => {
  const pathToImage = getImage(featuredimage) 
  return (
    <main className="page">
       <div className="recipe-page">
        {/* hero */}
        <section className="recipe-hero">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="about-img"
            />
            <article className="recipe-info">
              <h2>{title}</h2>
              <p>{description}</p>
              {/* icons */}
              <div className="recipe-icons">
                <article>
                  <BsClock />
                  <h5>prep time</h5>
                  <p>{prepTime} min.</p>
                </article>
                <article>
                  <BsClockHistory />
                  <h5>cook time</h5>
                  <p>{cookTime} min.</p>
                </article>
                <article>
                  <BsPeople />
                  <h5>serving</h5>
                  <p>{servings} </p>
                </article>
              </div>
              {/* tags */}
              <p className="recipe-tags">
                Tags :
                {tags.map((tag, index) => {
                  console.log(tag)
                  const slug = slugify(tag, { lower: true })

                  return (
                    <Link to={`/tags/${slug}`} key={index}>
                      {tag}
                    </Link>
                  )
                })}
              </p>
            </article>
          </section>
          {/* rest of the content */}
          <section className="recipe-content">
            <article>
              <h4>instructions</h4>
              {instructions.map((item, index) => {
                return (
                  <div key={index} className="single-instruction">
                    <header>
                      <p>step {index + 1}</p>
                      <div></div>
                    </header>
                    <p>{item}</p>
                  </div>
                )
              })}
            </article>
            <article className="second-column">
              <div>
                <h4>ingredients</h4>
                {ingredients.map((item, index) => {
                  return (
                    <p key={index} className="single-ingredient">
                      {item}
                    </p>
                  )
                })}
              </div>
              <div>
                <h4>tools</h4>
                {tools.map((item, index) => {
                  return (
                    <p key={index} className="single-tool">
                      {item}
                    </p>
                  )
                })}
              </div>
            </article>
          </section>
       </div>
      </main>
      

    // <div className="content">
    //   <FullWidthImage img={heroImage} title={title} />
    //   <section className="section section--gradient">
    //     <div className="container">
    //       <div className="section">
    //         <div className="columns">
    //           <div className="column is-10 is-offset-1">
    //             <Features gridItems={intro.blurbs} />
    //             <div className="tile is-ancestor">
    //               <div className="tile is-vertical">
    //                 <div className="tile">
    //                   <div className="tile is-parent is-vertical">
    //                     <article className="tile is-child">
    //                       <PreviewCompatibleImage imageInfo={main.image1} />
    //                     </article>
    //                   </div>
    //                   <div className="tile is-parent">
    //                     <article className="tile is-child">
    //                       <PreviewCompatibleImage imageInfo={main.image2} />
    //                     </article>
    //                   </div>
    //                 </div>
    //                 <div className="tile is-parent">
    //                   <article className="tile is-child">
    //                     <PreviewCompatibleImage imageInfo={main.image3} />
    //                   </article>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <FullWidthImage img={fullWidthImage} imgPosition={"bottom"} />
    // </div>
  );
};

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProductPageTemplate
        title={frontmatter.title}
        cookTime={frontmatter.cookTime}
        ingredients={frontmatter.ingredients}
        instructions={frontmatter.instructions}
        tools={frontmatter.tools}
        description={frontmatter.description}
        prepTime={frontmatter.prepTime}
        tags={frontmatter.tags}
        featuredimage={frontmatter.featuredimage}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        cookTime
        ingredients
        instructions
        tools
        tags
        description
        prepTime
        featuredimage {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
