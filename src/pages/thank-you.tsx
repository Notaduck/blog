import { FC } from "react";
import { PageProps } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { useSiteMetadata } from "@src/hooks/use-site-metadata";

const ThankYouPage: FC<PageProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();
  const canonicalPath = location?.pathname ?? "/thank-you";

  return (
    <Layout>
      <SEO
        title="Thank You"
        description="Thank you for getting in touch with Daniel Guldberg Aaes. I'll respond to your message as soon as possible."
        pathname={canonicalPath}
        keywords={["contact confirmation", "thank you"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Contact Confirmation",
          description:
            "Confirmation page for messages sent to Daniel Guldberg Aaes via the contact form.",
          url: siteMetadata?.siteUrl
            ? `${siteMetadata.siteUrl}${canonicalPath}`
            : undefined,
        }}
      />
      <h1>Contact</h1>
      <p>Thank you for your submission!</p>
    </Layout>
  );
};

export default ThankYouPage;
