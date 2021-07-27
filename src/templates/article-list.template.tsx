import React, { FC } from "react";
import { Link, graphql } from "gatsby";
import { Layout } from "../components/layout";
import { FiCoffee, FiCalendar, FiTerminal } from "react-icons/fi";
import { FaTerminal, FaCalendarAlt, FaCoffee } from "react-icons/fa";
import { SEO } from "../components/seo";
import { ArticleListQuery } from "../../graphql-types";
import { Container } from "../components";

type Props = {
  data: ArticleListQuery;
  pageContext: any;
};

const ArticleList: FC<Props> = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/articles" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();
  const {
    allMarkdownRemark: { nodes },
  } = data;

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="xs:mt-2 md:mt-8 min-h-content">

      {nodes.map((node, index) => {
        return (
          <div
            key={`${node}_${index}`}
            className="flex flex-col mb-4 border-b-2  pb-4 b-accent"
          >
            {/* TITLE */}
            <h2 className=" font-inconsolata sm:text-xl md:text-2xl font-black mb-2 flex items-center space-x-4">
              <FiTerminal className="xm:hidden" />
              <Link to={`/blog${node?.frontmatter?.slug}`}>
                {node?.frontmatter?.title}
              </Link>
            </h2>

            {/* DATE AND TAGS */}
            <div className="flex flex-col  font-montserrat  space-x-2 mb-4 ">
              <div className="flex items-center m-0 uppercase">
                <FiCalendar className="mr-2" />
                {node?.frontmatter?.date}
              </div>

              {/* {node?.frontmatter?.tags && (
                <div className="flex flex-wrap items-center space-x-2 text-tag">
                  {node.frontmatter.tags.map((tag) => (
                    <div> {tag} </div>
                  ))}
                </div>
              )} */}
            </div>

            {/* EXCERPT AND READ MORE */}
            <div className="mb-4 font-montserrat">{node.excerpt}</div>

            <div className="flex">
              <Link
                className="hover:underline hover:text-secondary-text flex space-x-2 items-center m-0"
                to={`/articles${node?.frontmatter?.slug}`}
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
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt(truncate: true, pruneLength: 300)
        timeToRead
        frontmatter {
          date(formatString: "MMMM YYYY")
          title
          slug
          tags
        }
      }
    }
  }
`;
export default ArticleList;
