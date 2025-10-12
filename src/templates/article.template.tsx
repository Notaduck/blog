import { FC } from "react";
import { Link, PageProps, graphql } from "gatsby";
import { FiCoffee } from "react-icons/fi";

import { Layout } from "@components/layout";
import { SEO } from "@components/seo";
import { Comments } from "@components/comments/comments";
import { useSiteMetadata } from "@src/hooks/use-site-metadata";

import "../styles/prism-onedark.css"

const formatDate = (value?: string | null) => {
  if (!value) {
    return "";
  }

  const dateInstance = new Date(value);

  if (Number.isNaN(dateInstance.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateInstance);
};

const resolveWithSiteUrl = (siteUrl?: string | null, path?: string | null) => {
  if (!path) {
    return undefined;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!siteUrl) {
    return path;
  }

  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return path;
  }
};

const ArticleTemplate: FC<PageProps<Queries.PostsByIDQuery>> = ({ data, location }) => {
  const markdownRemark = data.markdownRemark;
  const siteMetadata = useSiteMetadata();

  if (!markdownRemark) {
    return <div>Error: Post not found</div>;
  }

  const frontmatter = markdownRemark.frontmatter ?? {};
  const htmlContent = markdownRemark.html ?? "";
  const readingTime = markdownRemark.timeToRead ?? 0;
  const meta = (frontmatter.meta ?? {}) as (typeof frontmatter.meta & {
    image?: string | null;
  });
  const isoDate = frontmatter.date ?? null;
  const formattedDate = formatDate(isoDate);
  const displayDate = formattedDate || isoDate || "";
  const description = meta.description ?? markdownRemark.excerpt ?? "";
  const keywordsFromMeta = meta.keywords
    ?.split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const tagsFromFrontmatter =
    frontmatter.tags?.filter((tag): tag is string => Boolean(tag)) ?? [];
  const keywordList = Array.from(
    new Set([...(keywordsFromMeta ?? []), ...tagsFromFrontmatter]),
  );
  const canonicalPath = location?.pathname ?? "/";
  const defaultOgImage = siteMetadata?.siteUrl
    ? `${siteMetadata.siteUrl}/og-default.png`
    : undefined;
  const metaImagePath = meta.image ?? undefined;
  const resolvedMetaImage =
    resolveWithSiteUrl(siteMetadata?.siteUrl, metaImagePath) ?? defaultOgImage;
  const canonicalUrl = resolveWithSiteUrl(siteMetadata?.siteUrl, canonicalPath);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title ?? "",
    description,
    author: {
      "@type": "Person",
      name: meta.author ?? siteMetadata?.author ?? "Daniel Guldberg Aaes",
    },
    publisher: {
      "@type": "Organization",
      name: siteMetadata?.title ?? "Guldberglab",
      logo:
        defaultOgImage && siteMetadata?.siteUrl
          ? {
            "@type": "ImageObject",
            url: defaultOgImage,
          }
          : undefined,
    },
    datePublished: isoDate ?? undefined,
    dateModified: isoDate ?? undefined,
    keywords: keywordList.join(", "),
    mainEntityOfPage: canonicalUrl,
    image: resolvedMetaImage ? [resolvedMetaImage] : undefined,
  };
  const breadcrumbSchema =
    siteMetadata?.siteUrl && canonicalUrl
      ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteMetadata.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteMetadata.siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: frontmatter.title ?? "Article",
            item: canonicalUrl,
          },
        ],
      }
      : undefined;
  const structuredDataEntries = [
    articleSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
  ];

  return (
    <Layout>
      <SEO
        title={frontmatter.title ?? "Article"}
        description={description}
        keywords={keywordList}
        pathname={canonicalPath}
        image={metaImagePath ?? undefined}
        article
        structuredData={structuredDataEntries}
      />
      <article className="mb-8 xs:mt-2 md:mt-8">
        <div className="mb-4">
          <h1 className="font-inconsolata text-4xl font-black antialiased">
            {frontmatter.title}
          </h1>
          <div className="flex space-x-4">
            <time dateTime={isoDate ?? undefined} className="text-gray-500">
              {displayDate}
            </time>
            {meta?.author && (
              <span className="text-gray-500">By: {meta.author}</span>
            )}
            <div className="flex space-x-2 items-center m-0">
              <FiCoffee />
              <p className="m-0">{readingTime} min</p>
            </div>
          </div>
        </div>

        <section >
          <div
            className="prose dark:prose-invert "
            dangerouslySetInnerHTML={{ __html: htmlContent }} />
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
        date
        meta {
          description
          keywords
          author
          excerpt
          image
        }
      }
    }
  }
`;

export default ArticleTemplate;
