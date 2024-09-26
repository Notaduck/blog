import path from "path";
import { GatsbyNode } from "gatsby";

interface ArticleNode {
  id: string;
  frontmatter: {
    slug: string;
  };
}

interface QueryResult {
  allMarkdownRemark: {
    edges: {
      node: ArticleNode;
    }[];
  };
}

const ARTICLES_PER_PAGE = 5;

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
  const result = await graphql<QueryResult>(`
    query AllArticles {
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

  if (result.errors || !result.data) {
    throw new Error(`Error fetching articles: ${result.errors}`);
  }

  const articles = result.data.allMarkdownRemark.edges;
  const numPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  // Create paginated article list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/article-list.template.tsx"),
      context: {
        limit: ARTICLES_PER_PAGE,
        skip: i * ARTICLES_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create individual article pages
  articles.forEach(({ node }) => {
    createPage({
      path: `blog${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/article.template.tsx`),
      context: { id: node.id },
    });
  });
};
