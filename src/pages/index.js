import React from "react";
import { graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const results = [
    ...data.allDatoCmsTalk.edges,
    ...data.allDatoCmsModule.edges,
    ...data.allDatoCmsWork.edges,
    ...data.allDatoCmsBook.edges,
    ...data.allDatoCmsResource.edges
  ];
  results.sort((a, b) => a.node.meta.createdAt < b.node.meta.createdAt);
  const latest = results.slice(0, 10);

  return (
    <Layout>
      <Masonry className="showcase">
        {latest.map(({ node: item }) => (
          <div key={item.id} className="showcase__item">
            <div className="max-w-sm rounded overflow-hidden shadow-lg py-4">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.title}</div>
                <p className="text-gray-700 text-base">{item.excerpt}</p>
              </div>
              <div className="px-6 py-4">
                <span className="bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4 rounded-full float-right">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
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
  query IndexQuery {
    allDatoCmsBook {
      edges {
        node {
          id
          title
          link
          excerpt
          meta {
            createdAt
          }
        }
      }
    }
    allDatoCmsWork {
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
    allDatoCmsTalk {
      edges {
        node {
          id
          title
          excerpt
          link: slides
          meta {
            createdAt
          }
        }
      }
    }
    allDatoCmsModule {
      edges {
        node {
          id
          title
          excerpt
          link
          meta {
            createdAt
          }
        }
      }
    }
    allDatoCmsResource {
      edges {
        node {
          id
          title
          excerpt
          link
          meta {
            createdAt
          }
        }
      }
    }
  }
`;
