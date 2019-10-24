import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Layout from "../components/layout";

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsTalk.edges.map(({ node: talk }) => (
        <div key={talk.id} className="showcase__item">
          <figure className="card">
            <figcaption className="card__caption">
              <h6 className="card__title">
                <p>
                  {talk.title} - {talk.location}
                </p>
              </h6>
              <div className="card__description">
                <p>
                  {talk.date} - {talk.location}
                </p>
                <p>{talk.tag.description}</p>
                <p>
                  {talk.slides !== "" && <a href="">Slides</a>}
                  {talk.repo !== "" && <a href="">Repo</a>}
                  {talk.video !== "" && <a href="">Video</a>}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query TalksQuery {
    allDatoCmsTalk {
      edges {
        node {
          id
          date
          location
          repo
          slides
          video
          title
          tag {
            title
            description
          }
        }
      }
    }
  }
`;
