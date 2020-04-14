import React from "react";
import { graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  console.log({ data });
  return (
    <Layout>
      <Masonry className="showcase">
        {data.allDatoCmsResource.edges.map(({ node: resource }) => (
          <div key={resource.id} className="showcase__item">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{resource.title}</div>
                <p className="text-gray-700 text-base">{resource.excerpt}</p>
              </div>

              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {resource.category}
                </span>
                <span className="bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4 rounded-full">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More...
                  </a>
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
  query MgrResourcesQuery {
    allDatoCmsResource(sort: { fields: [meta___publishedAt], order: DESC }) {
      edges {
        node {
          id
          title
          link
          category
          excerpt
        }
      }
    }
  }
`;
