import React from "react";
import { graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const results = [
    ...data.allDatoCmsTalk.edges,
    ...data.allDatoCmsModule.edges,
    ...data.allDatoCmsWork.edges,
    ...data.allDatoCmsResource.edges
  ];
  results.sort(
    (a, b) => new Date(b.node.meta.createdAt) - new Date(a.node.meta.createdAt)
  );
  const latest = results.slice(0, 10);

  return (
    <Layout>
      <Masonry className="showcase">
        {latest.map(({ node: item }) => {
          const date = new Date(item.meta.createdAt);
          return (
            <div key={item.id} className="showcase__item">
              <div className="max-w-sm rounded overflow-hidden shadow-lg py-4">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-700 text-base">{item.excerpt}</p>
                </div>
                <div className="px-6 py-4">
                  <span className="bg-pink-300 rounded text-gray py-2 px-4 rounded-full float-left">
                    {date.getMonth()} - {date.getDate()} - {date.getFullYear()}
                  </span>
                  <span className="bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4 rounded-full float-right">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More...
                    </a>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Masonry>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
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
