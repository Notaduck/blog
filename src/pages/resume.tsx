import { FC } from "react";
import { Layout } from "@components/layout";
import { SEO } from "@components/seo";

const Resume: FC = () => {
  return (
    <Layout>
      <SEO
        title="Resume"
        description="Experience summary and professional highlights for Daniel Guldberg Aaes."
      />
      <div className="w-10/12 mx-auto py-12 font-montserrat text-main-text">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Resume</h1>
          <p className="text-lg text-secondary-text">
            I am a full stack developer focused on crafting reliable digital
            products and developer tooling. Below is a condensed overview of my
            current role, past experience, and the technical skills I bring to a
            team.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Experience Highlights</h2>
            <ul className="list-disc list-inside space-y-3 text-secondary-text">
              <li>
                Building connected driving experiences at{' '}
                <span className="font-semibold text-main-text">ooono</span>,
                contributing across the stack from user-facing features to
                platform integrations.
              </li>
              <li>
                Delivered production web applications, automation, and
                integrations while maintaining a focus on accessibility and
                performance.
              </li>
              <li>
                Established collaborative practices including code reviews,
                documentation, and knowledge sharing to keep teams aligned.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Core Skills</h2>
            <ul className="list-disc list-inside space-y-3 text-secondary-text">
              <li>TypeScript, JavaScript, React, and modern web tooling</li>
              <li>API design, Node.js services, and cloud-native deployments</li>
              <li>DevOps practices covering CI/CD pipelines and observability</li>
              <li>Strong communication with cross-functional stakeholders</li>
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">More Details</h2>
          <p className="text-secondary-text mb-6">
            Explore the resources below for a deeper look at my background and
            project history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.linkedin.com/in/daniel-guldberg-aaes-12145b180/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-highlight px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-red-600"
            >
              View LinkedIn Profile
            </a>
            <a
              href="https://github.com/notaduck/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border-2 border-highlight px-6 py-3 text-lg font-semibold text-highlight transition duration-300 hover:bg-highlight hover:text-white"
            >
              Review Legacy CV
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resume;
