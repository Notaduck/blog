/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

type MetaEntry = {
  name?: string;
  property?: string;
  content: string;
};

type StructuredData = Record<string, unknown> | Record<string, unknown>[];

type Props = {
  description?: string;
  lang?: string;
  meta?: MetaEntry[];
  title: string;
  keywords?: string[];
  image?: string;
  pathname?: string;
  article?: boolean;
  structuredData?: StructuredData;
};

type SiteMetadata = {
  title?: string;
  description?: string;
  author?: string;
  siteUrl?: string;
  twitterUsername?: string;
  socialImage?: string;
};

const resolveUrl = (baseUrl?: string, path?: string) => {
  if (!path) {
    return undefined;
  }

  try {
    return new URL(path).toString();
  } catch {
    if (!baseUrl) {
      return undefined;
    }

    try {
      return new URL(path, baseUrl).toString();
    } catch {
      return undefined;
    }
  }
};

const toArray = <T,>(value?: T | T[]): T[] => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export function SEO({
  description = "",
  lang = "en",
  meta = [],
  title,
  keywords = [],
  image,
  pathname = "/",
  article = false,
  structuredData,
}: Props) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          twitterUsername
          socialImage
        }
      }
    }
  `);

  const siteMetadata: SiteMetadata = site?.siteMetadata ?? {};
  const metaDescription = description || siteMetadata.description || "";
  const defaultTitle = siteMetadata.title ? `${siteMetadata.title}` : undefined;
  const canonicalUrl = resolveUrl(siteMetadata.siteUrl, pathname);
  const imageForMeta =
    resolveUrl(siteMetadata.siteUrl, image) ??
    resolveUrl(siteMetadata.siteUrl, siteMetadata.socialImage) ??
    resolveUrl(undefined, image) ??
    resolveUrl(undefined, siteMetadata.socialImage);

  const schemaDefaults = toArray<Record<string, unknown>>({
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteMetadata.siteUrl ?? "",
    name: siteMetadata.title ?? "",
    description: metaDescription,
  });
  const structuredDataEntries: Record<string, unknown>[] = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];
  const schemaPayload = [...schemaDefaults, ...structuredDataEntries].filter(Boolean);

  const baseMeta: MetaEntry[] = [
    {
      name: "description",
      content: metaDescription,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:type",
      content: article ? "article" : "website",
    },
    {
      name: "twitter:card",
      content: imageForMeta ? "summary_large_image" : "summary",
    },
    {
      name: "twitter:creator",
      content: siteMetadata.twitterUsername || siteMetadata.author || "",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      property: "og:site_name",
      content: siteMetadata.title || title,
    },
  ];

  if (canonicalUrl) {
    baseMeta.push({
      property: "og:url",
      content: canonicalUrl,
    });
  }

  if (imageForMeta) {
    baseMeta.push(
      {
        property: "og:image",
        content: imageForMeta,
      },
      {
        name: "twitter:image",
        content: imageForMeta,
      },
    );
  }

  if (keywords.length > 0) {
    baseMeta.push({
      name: "keywords",
      content: keywords.join(", "),
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      link={
        canonicalUrl
          ? [
            {
              rel: "canonical",
              href: canonicalUrl,
            },
          ]
          : undefined
      }
      meta={[...baseMeta, ...meta]}
    >
      {schemaPayload.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemaPayload.length === 1 ? schemaPayload[0] : schemaPayload)}
        </script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  structuredData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
