import { FC } from "react";
import { graphql, PageProps } from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../components/seo";
import { Layout } from "../components/layout";
import { useSiteMetadata } from "@src/hooks/use-site-metadata";

type PageData = { site: Queries.Site; file: Queries.File };

const About: FC<PageProps<PageData>> = ({ data, location }) => {
  const {
    site: {
      siteMetadata: { name, profession },
    },
  } = data;
  const {
    file: {
      childImageSharp: { fluid: picture },
    },
  } = data;
  const siteMetadata = useSiteMetadata();
  const canonicalPath = location?.pathname ?? "/about";
  const pageDescription =
    siteMetadata?.description ??
    `Learn more about ${name}, a ${profession} based in Copenhagen.`;

  return (
    <Layout>
      <SEO
        title="About"
        description={pageDescription}
        keywords={[name ?? "Daniel Guldberg Aaes", "About", profession ?? "Software Developer"]}
        pathname={canonicalPath}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${name ?? "Daniel Guldberg Aaes"}`,
          description: pageDescription,
          url: siteMetadata?.siteUrl
            ? `${siteMetadata.siteUrl}${canonicalPath}`
            : undefined,
        }}
      />
      <div className="xs:px-10">
        <div className="flex xs:flex-col md:flex-row justify-evenly mb-6">
          <Img
            className="rounded-full h-36 w-36 flex items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            fluid={picture}
          />
          <div className="flex flex-col items-center align-center xs:pt-6 md:pt-0">
            <h2> Hi, my name is {name}. </h2>
            <h3> I am a {profession}</h3>
          </div>
        </div>
        <section>
          <p> I am currently emplyed at </p>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query aboutPageQuery {
    site {
      siteMetadata {
        name
        profession
      }
    }
    file(name: { regex: "/me/" }) {
      id
      childImageSharp {
        fluid(grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default About;
