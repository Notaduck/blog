import React from "react";
import { Link, graphql } from "gatsby";
import { Layout } from "../components/layout";
import { FiCoffee, FiCalendar } from "react-icons/fi";
import { SEO } from "../components/seo";

const ArticleList = ({ data, pageContext }) => {
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
      <SEO title="Articles" />
      {nodes.map((node, index) => {
        return (
          <div
            key={node.id}
            className={`flex 
                        xs:flex-col-reverse
                        sm:flex-row
                        ${index + 1 !== nodes.length ? "border-b-2" : ""}  
                        space-x-14 
                        mb-12 
                        p-4 
                        md:pl-8 md:pr-8 
                        lg:pr-4 lg:pl-4 `}
          >
            {/* Published and time to read  */}
            <div className="flex sm:flex-col xs:ml-14 md:ml-0 xs:mt-2 md:mt-0 md:flex-row w-44">
              <div className="">
                <div className="flex space-x-4 items-center m-0">
                  <FiCalendar />
                  <p className="m-0"> {node.frontmatter.date}. </p>
                </div>
                <div className="flex space-x-4 items-center m-0">
                  <FiCoffee />
                  <p className="m-0"> {node.timeToRead} min read. </p>
                </div>
              </div>
            </div>
            {/* Title and description */}
            <div className="xs:flex-1 flex-col space-y-2">
              <div className="flex items-center">
                <Link className="hover:underline" to={`/articles${node.frontmatter.slug}`}>
                  <h3 className="text-2xl"> {node.frontmatter.title} </h3>
                </Link>
              </div>
              <p> {node.excerpt} </p>
                <Link className="hover:underline" to={`/articles${node.frontmatter.slug}`}>
                Read More
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
          # date(formatString: "MMMM DD, YYYY")
          date
          title
          slug
        }
      }
    }
  }
`;
export default ArticleList;
