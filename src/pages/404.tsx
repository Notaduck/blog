import { FC } from "react";
import { PageProps } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { useSiteMetadata } from "@src/hooks/use-site-metadata";

const NotFoundPage: FC<PageProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();
  const canonicalPath = location?.pathname ?? "/404";

  return (
    <Layout>
      <SEO
        title="404: Not found"
        description="The page you're looking for can't be found. Explore other software development guides and articles on Guldberglab."
        pathname={canonicalPath}
        keywords={["404", "page not found", "guldberglab"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "404 - Page not found",
          description:
            "404 error page for Guldberglab - Daniel Guldberg Aaes' personal blog.",
          url: siteMetadata?.siteUrl
            ? `${siteMetadata.siteUrl}${canonicalPath}`
            : undefined,
        }}
      />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
