const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsBook {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsModule {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `works/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug
          }
        });
      });
      result.data.allDatoCmsBook.edges.map(({ node: book }) => {
        createPage({
          path: `books/${book.slug}`,
          component: path.resolve(`./src/templates/book.js`),
          context: {
            slug: book.slug
          }
        });
      });
      result.data.allDatoCmsModule.edges.map(({ node: module }) => {
        createPage({
          path: `open-source/${module.slug}`,
          component: path.resolve(`./src/templates/module.js`),
          context: {
            slug: module.slug
          }
        });
      });
      resolve();
    });
  });
};
