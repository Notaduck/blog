const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value: `/articles${value}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
        query {
          allMarkdownRemark {
              edges {
                node {
                  id
                  frontmatter {
                    slug
                  }
                }
              }
            }
          }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const articles = result.data.allMarkdownRemark.edges;
  const articlePerPage = 5;

  const numPages = Math.ceil(articles.length / articlePerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      component: path.resolve("./src/templates/article-list-template.js"),
      context: {
        limit: articlePerPage,
        skip: i * articlePerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  articles.forEach(({ node }, index) => {
  console.log( `${index} ----- articles${node.frontmatter.slug}`,)
    createPage({
      path: `articles${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/article-template.js`),
      context: { id: node.id },
    });
  });
};
