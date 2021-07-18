import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { FiCalendar } from "react-icons/fi";
import { graphql } from "gatsby";
import React from "react";


const ArticleTemplate = ({ data }) => {
  const {
    frontmatter: { title, date },
    html,
    excerpt,
  } = data.markdownRemark;
  return (
    <Layout>
      <SEO description={excerpt} title={title} />
      <div className="flex flex-col min-h-screen text-gray-900">
        <div className="mb-6">
          {/* blog heading and details  */}
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <div className="mb-6">
              <h1 className="text-3xl">{title}</h1>
              <div className="flex space-x-2 items-center mt-2">
                <FiCalendar className />
                {/* <FiCalendar className='mr-4'/> */}
                <p>{date}</p>
              </div>
            </div>
            <div
              className="text-gray-800 dark:text-main"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-10 mb-10  ">
          <Link
            to="/articles"
            className="p-3  
            cursor-pointer 
            border-gray-600
             border-2 rounded 
             hover:bg-gray-800 
             hover:border-gray-800
            hover:text-gray-300
            dark:text-white"
          >
            GO BACK
          </Link>
        </div>
      </div>
    </Layout>
  );
};

{
  /* <div className="flex flex-col min-h-screen text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
        {children}
      </main>
      <Footer/>
</div> */
}

export const query = graphql`
  query PostsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt
      frontmatter {
        title
        # date(formatString: "MMMM DD - YYYY")
        date
      }
    }
  }
`;

export default ArticleTemplate;
