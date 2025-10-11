import { FC } from "react";
import { Link, PageProps, graphql } from "gatsby";
import { FiCoffee } from "react-icons/fi";

import { Layout } from "@components/layout";
import { SEO } from "@components/seo";
import { Comments } from "@components/comments/comments";

import "../styles/prism-onedark.css"

const ArticleTemplate: FC<PageProps<Queries.PostsByIDQuery>> = ({ data, location }) => {
  const markdownRemark = data.markdownRemark;

  if (!markdownRemark) {
    return <div>Error: Post not found</div>;
  }

  const {
    frontmatter: { title, date, meta },
    html,
    timeToRead,
    headings,
  } = markdownRemark;

  return (
    <Layout>
      {/* <SEO */}
      {/*   description={meta?.description} */}
      {/*   title={title} */}
      {/*   keywords={meta?.keywords} */}
      {/* /> */}
      <article className="mb-8 xs:mt-2 md:mt-8">
        <div className="mb-4">
          <h1 className="font-inconsolata text-4xl font-black antialiased">
            {title}
          </h1>
          <div className="flex space-x-4">
            <time dateTime={date} className="text-gray-500">
              {date}
            </time>
            <span className="text-gray-500">By: {meta?.author}</span>
            <div className="flex space-x-2 items-center m-0">
              <FiCoffee />
              <p className="m-0">{timeToRead} min</p>
            </div>
          </div>
        </div>

        <section >
          <div
            className="prose dark:prose-invert "
            dangerouslySetInnerHTML={{ __html: html }} />
        </section>

        <div className="relative flex py-5 items-center prose">
          <div className="grow border-t border-gray-400"></div>
          <span className="shrink mx-4 text-gray-400">Comments</span>
          <div className="grow border-t border-gray-400"></div>
        </div>

        <Comments issueTerm={location?.pathname} />
        <div className="prose flex justify-center mt-10 mb-10">
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
                         dark:text-gray-200"
          >
            Go back
          </Link>
        </div>
      </article>
    </Layout>
  );
};

// Update the GraphQL query to include all relevant frontmatter fields
export const query = graphql`
  query PostsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt
      timeToRead
      headings(depth: h6) {
        id
        value
        depth
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM YYYY")
        meta {
          description
          keywords
          author
          excerpt
        }
      }
    }
  }
`;

export default ArticleTemplate;
