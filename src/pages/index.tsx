import React, { useEffect, useState, useRef } from 'react';
import { ContactForm } from "@components/form";
import { Section } from "@components/indexPage";
import { Layout } from "@components/layout";
import { content } from "@src/content/data";
import { StaticImage } from "gatsby-plugin-image";
import Typical from "react-typical";
import { SEO } from "@components/seo"; // Ensure you have an SEO component
import FloatingIcons from "@components/floating-icons";

const Index = () => {
  const [animated, setAnimated] = useState(false);
  const floatingIconsRef = useRef<HTMLDivElement>(null); // Create a ref for the icons container

  useEffect(() => {
    setAnimated(true);
  }, []);

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };

  enum SECTIONS {
    HERO = 'hero',
    ABOUT = 'about',
    CONTACT = 'contact'
  }

  return (
    <Layout>
      <SEO
        title="Welcome to My Personal Blog"
        description="This is the personal blog of Daniel Guldberg Aaes, where I share my insights on software development and technology."
        keywords="Daniel Guldberg Aaes, personal blog, software development, technology, programming"
      />

      <Section headOrTail id={SECTIONS.HERO} to={SECTIONS.ABOUT} btnText="Scroll">
        <div className="flex-1 flex flex-col xs:mt-4 items-center justify-center mx-auto ">
          <div className="w-10/12 mx-auto py-14 flex flex-col xl:flex-row-reverse items-center justify-between ">
            <div className="flex-1 flex flex-col w-full md:w-2/5">
              <StaticImage loading='eager' src="../images/profile.png" alt="avatar of Daniel Guldberg Aaes" />
            </div>
            <div className="text-main-text text-center md:text-left">
              <h2
                className={`${animated ? "" : "translate-y-10 opacity-0"
                  } font-inconsolata transform transition duration-2000 ease-in-out text-3xl md:text-5xl font-bold`}
              >
                <br />
                {content.index.text[1]}
              </h2>

              <h2
                className={`${animated ? "" : "translate-y-10 opacity-0"
                  } font-inconsolata transform transition duration-2000 ease-in-out text-2xl md:text-3xl font-bold`}
              >
                {content.index.text[2]}
                <br />
                <br />
              </h2>
              <h1
                className={`${animated ? "" : "translate-y-10 opacity-0"
                  } font-inconsolata transform transition duration-2000 ease-in-out font-bold text-2xl text-gray-500`}
              >
                {content.index.text[3]}{" "}
                <Typical
                  steps={content.index.typical}
                  loop={Infinity}
                  className="inline-block"
                />
              </h1>
            </div>
            {/* Include FloatingIcons and pass the ref */}
          </div>

          <div ref={floatingIconsRef} style={{ position: 'relative', width: '100%', height: '300px' }}> {/* Adjust height as needed */}
            <FloatingIcons containerRef={floatingIconsRef} />
          </div>
        </div>
      </Section>

      <Section id={SECTIONS.ABOUT} to={SECTIONS.CONTACT} btnText="Get in touch">

        <div className="font-montserrat w-10/12 mx-auto my-auto md:mt-12 flex justify-center align-middle flex-col ">
          <h2 className="md:text-3xl sm:text-2xl text-2xl mt-5 mb-10 font-black" role="heading" aria-level="2">
            Who am I?
          </h2>
          <p className="mb-4">
            My name is Daniel Guldberg Aaes, and I am {calculateAge("1991-07-02")} years old, with a bachelor’s degree in Software Development from the IT University of Copenhagen in Denmark.
          </p>

          <p>
            Initially, I started out in the social and healthcare profession and worked there for a couple of years. However, I had always been in doubt if I wanted to work with people or in the tech industry due to my fear of turning a hobby into work and losing the joy within it. At some point, I decided to transition my career from the social and healthcare field to technology.
          </p>

          <h2 className="md:text-3xl sm:text-2xl text-2xl mt-5 mb-10 font-black" role="heading" aria-level="2">
            Why this blog?
          </h2>
          <p className="mb-4">
            Throughout the last couple of years, I have gained experience with various programming languages in different domains such as Java, Python, C, C#, F#, JavaScript, and so on. Most of the knowledge I have gained is from spending countless hours reading documentation, using Google, and reading a ton of online tutorials and guides. I feel that I now have enough experience to pass on this knowledge while also learning a lot by creating these blog posts, as it forces me to reflect on my acquired knowledge, which often leads to flaws that I must address.
          </p>
        </div>
      </Section>

      <Section
        id={SECTIONS.CONTACT}
        to="hero"
        btnText="Back to the top"
        reset
        headOrTail
      >
        <div className="flex-col pt-20 w-10/12 justify-center items-center mx-auto my-auto">
          <h1 role="heading" aria-level="1"> Ping me section</h1>
        </div>
        <ContactForm />
      </Section>
    </Layout>
  );
};

export default Index;
