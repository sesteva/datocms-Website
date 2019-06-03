import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.allDatoCmsBook.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.allDatoCmsBook.title}</h1>
        <p className="sheet__lead">{data.allDatoCmsBook.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.allDatoCmsBook.gallery.map(({ fluid }) => (
              <img
                alt={data.allDatoCmsBook.title}
                key={fluid.src}
                src={fluid.src}
              />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.allDatoCmsBook.descriptionNode.childMarkdownRemark.html
          }}
        />
        <div className="sheet__gallery">
          <Img fluid={data.allDatoCmsBook.coverImage.fluid} />
        </div>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query BookQuery($slug: String!) {
    datoCmsBook(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
