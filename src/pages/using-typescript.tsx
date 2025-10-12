// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { useSiteMetadata } from "@src/hooks/use-site-metadata";

type DataProps = {
  site: {
    buildTime: string;
  };
};

const UsingTypescript: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => {
  const siteMetadata = useSiteMetadata();
  const canonicalPath = location?.pathname ?? path;

  return (
    <Layout>
      <SEO
        title="Using TypeScript"
        description="Learn how Guldberglab uses TypeScript within Gatsby along with tips for configuring your development environment."
        pathname={canonicalPath}
        keywords={[
          "TypeScript",
          "Gatsby",
          "Type safety",
          "JavaScript",
          "Developer tooling",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Using TypeScript in Gatsby",
          description:
            "Guidance on leveraging TypeScript within the Guldberglab Gatsby project.",
          url: siteMetadata?.siteUrl
            ? `${siteMetadata.siteUrl}${canonicalPath}`
            : undefined,
        }}
      />
      <h1>Gatsby supports TypeScript by default!</h1>
      <p>
        This means that you can create and write <em>.ts/.tsx</em> files for
        your pages, components etc. Please note that the <em>gatsby-*.js</em>{" "}
        files (like gatsby-node.js) currently don't support TypeScript yet.
      </p>
      <p>
        For type checking you'll want to install <em>typescript</em> via npm and
        run <em>tsc --init</em> to create a <em>.tsconfig</em> file.
      </p>
      <p>
        You're currently on the page "{path}" which was built on{" "}
        {data.site.buildTime}.
      </p>
      <p>
        To learn more, head over to our{" "}
        <a href="https://www.gatsbyjs.com/docs/typescript/">
          documentation about TypeScript
        </a>
        .
      </p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export default UsingTypescript;

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;
