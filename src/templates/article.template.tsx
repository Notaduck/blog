import React, { FC } from "react";
import { Link, graphql } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { FiCalendar, FiCoffee } from "react-icons/fi";

import "../styles/markdown.css";
import Comments from "../components/comments/comments";
import { ArticleData } from "./types";

const ArticleTemplate: FC<ArticleData> = ({ data, location }) => {
  const {
    frontmatter: { title, date },
    html,
    excerpt,
  } = data.markdownRemark;
  return (
    <Layout>
      <div className="mb-8 xs:mt-2 md:mt-8">
        <h1 className=" font-inconsolata text-4xl font-black antialiased">
          {" "}
          {title}
        </h1>
        <div className="flex space-x-4">
          <span> {date}</span>

          <div className="flex space-x-2 items-center m-0">
            <FiCoffee />

            <p className="m-0"> {data.markdownRemark.timeToRead} min </p>
          </div>
        </div>
      </div>

      <div className="">
        <SEO description={excerpt} title={title} />
        <div className="grid grid-cols-1 divide-y space-y-10gg">
          <article
            className="prose-lg"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <Comments issueTerm={location.pathname} />
        </div>
        <div className="flex justify-center mt-10 mb-10  ">
          <Link
            to="/blog"
            className="p-3  
            uppercase
            cursor-pointer 
            border-gray-600
             border-2 rounded 
             hover:bg-gray-800 
             hover:border-gray-800
            hover:text-gray-300
            dark:text-white"
          >
            go back
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PostsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt
      timeToRead
      frontmatter {
        title
        tags
        # date(formatString: "MMMM DD - YYYY")
        date(formatString: "MMMM YYYY")
      }
    }
  }
`;

export default ArticleTemplate;
