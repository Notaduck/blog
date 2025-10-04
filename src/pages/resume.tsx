import { FC } from "react";
import { Layout } from "@components/layout";
import { SEO } from "@components/seo";

const PDF_URL =
  "https://github.com/Notaduck/CV/releases/download/latest/DANIEL_GULDBERG_AAES_CV.pdf";
const PDF_VIEWER_URL = "https://mozilla.github.io/pdf.js/web/viewer.html";
const EMBED_SRC = `${PDF_VIEWER_URL}?file=${encodeURIComponent(PDF_URL)}`;

const Resume: FC = () => {
  return (
    <Layout>
      <SEO
        title="Resume"
        description="Preview Daniel Guldberg Aaes' up-to-date resume directly on the page."
      />
      <div className="w-10/12 mx-auto py-12 font-montserrat text-main-text">
        <header className="max-w-3xl mb-8">
          <h1 className="text-4xl font-bold mb-3">Resume</h1>
          <p className="text-lg text-secondary-text">
            The embedded preview below always loads the latest published resume
            from GitHub Releases. If your browser doesn&apos;t support inline PDF
            previews, you can open the document in a new tab using the
            supplemental link.
          </p>
        </header>

        <div className="w-full rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <iframe
            src={EMBED_SRC}
            title="Daniel Guldberg Aaes Resume"
            className="w-full h-[80vh]"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <p className="mt-6 text-secondary-text">
          Prefer a dedicated tab or need to download it?{' '}
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-highlight font-semibold hover:underline"
          >
            Click here to open the PDF directly.
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default Resume;
