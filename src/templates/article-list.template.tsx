import { FC, useMemo } from "react";
import { Link, PageProps, graphql } from "gatsby";
import { FiCoffee, FiCalendar, FiTerminal } from "react-icons/fi";

import { Layout } from "@components/layout";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@src/hooks/use-site-metadata";

type PageContext = {
  currentPage: number;
  numPages: number;
  limit: number;
  skip: number;
};

const ArticleList: FC<PageProps<Queries.articleListQuery, PageContext>> = ({
  data,
  pageContext,
  location,
}) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;
  const {
    allMarkdownRemark: { nodes },
  } = data;
  const siteMetadata = useSiteMetadata();
  const pageTitle = currentPage > 1 ? `Blog - Page ${currentPage}` : "Blog";
  const uniqueTags = useMemo(
    () =>
      Array.from(
        new Set(
          nodes.flatMap(
            (node) =>
              node.frontmatter?.tags?.filter(
                (tag): tag is string => Boolean(tag),
              ) ?? [],
          ),
        ),
      ),
    [nodes],
  );
  const canonicalPath = location?.pathname ?? "/blog";
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: siteMetadata?.title ?? "Guldberglab",
    description: siteMetadata?.description,
    url: siteMetadata?.siteUrl
      ? `${siteMetadata.siteUrl}${canonicalPath}`
      : undefined,
  };

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={
          currentPage === 1
            ? siteMetadata?.description
            : `Page ${currentPage} of the Guldberglab blog featuring software development insights and tutorials.`
        }
        keywords={uniqueTags}
        pathname={canonicalPath}
        structuredData={blogSchema}
      />
      <div className="xs:mt-2 md:mt-8 min-h-content" data-cy="article-list">
        {nodes.map((node, index) => {
          const articleSlug = node?.frontmatter?.slug;
          const articleUrl = articleSlug ? `/blog${articleSlug}` : "#";

          return (
            <div
              key={`${node?.id ?? "article"}_${index}`}
              className="flex flex-col mb-4 border-b-2  pb-4 b-accent"
              data-cy="article-card"
            >
              {/* TITLE */}
              <h2 className="sm:text-xl md:text-2xl font-black mb-2 flex items-center space-x-4">
                <FiTerminal className="xm:hidden" />
                <Link to={articleUrl}>{node?.frontmatter?.title}</Link>
              </h2>

              {/* DATE AND TAGS */}
              <div className="flex flex-col  font-montserrat  space-x-2 mb-4 ">
                <div className="flex items-center m-0 uppercase">
                  <FiCalendar className="mr-2" />
                  {node?.frontmatter?.date}
                </div>
              </div>

              {/* EXCERPT AND READ MORE */}
              <div className="mb-4 font-montserrat">{node.excerpt}</div>

              <div className="flex">
                <Link
                  className="hover:underline hover:text-secondary-text flex space-x-2 items-center m-0"
                  to={articleUrl}
                >
                  <FiCoffee />

                  <p className="m-0"> {node.timeToRead} min read.</p>
                </Link>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query articleList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt(truncate: true, pruneLength: 300)
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
          tags
        }
      }
    }
  }
`;

export default ArticleList;
