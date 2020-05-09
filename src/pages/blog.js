import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Masonry className="showcase">
        {data.allDatoCmsWork.edges.map(({ node: item }) => (
          <div key={item.id} className="showcase__item">
            <div className="max-w-sm rounded overflow-hidden shadow-lg py-4">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.title}</div>
                <p className="text-gray-700 text-base">{item.excerpt}</p>
              </div>
              <div className="px-6 py-4">
                <span className="bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4 rounded-full float-right">
                  <Link to={`/works/${item.link}`}>More...</Link>
                </span>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query BlogQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          excerpt
          link: slug
          meta {
            createdAt
          }
        }
      }
    }
  }
`;
