import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { content } from "../content";
import Typical from "react-typical";
import { Section } from "../components/indexPage/section";
import { StaticImage } from "gatsby-plugin-image";
import { ContactForm } from "../components/form/contactForm";
import { TechBadge } from "../components/indexPage/techBadge";


const Index = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const iconSize = 102;

  return (
    <Layout>
      <Section headOrTail id="hero" to="tech_stack" btnText="Scroll">
        <div className="flex-1 flex flex-col xs:mt-4 items-center justify-center mx-auto ">
          <div className="w-10/12 mx-auto py-14 flex flex-col xl:flex-row-reverse items-center justify-between ">
            <div className="  flex-1 flex flex-col w-full md:w-2/5">
              <StaticImage src="../images/profile.png" alt="avatar" />
            </div>
            <div className=" text-main-text text-center md:text-left">
              <h2
                className={`${
                  animated ? "" : "translate-y-10 opacity-0"
                } font-inconsolata transform transition duration-2000 ease-in-out text-3xl md:text-5xl font-bold`}
              >

                <br />
                {content.index.text[1]}
              </h2>

              <h2
                className={`${
                  animated ? "" : "translate-y-10 opacity-0"
                } font-inconsolata transform transition duration-2000 ease-in-out text-2xl md:text-3xl font-bold`}
              >
                {content.index.text[2]}
                <br />
                <br />
              </h2>
              <h1
                className={`${
                  animated ? "" : "translate-y-10 opacity-0"
                }  font-inconsolata transform transition duration-2000 ease-in-out font-bold text-2xl text-gray-500`}
              >
                {content.index.text[3]}{" "}
                <Typical
                  steps={content.index.typical}
                  loop={Infinity}
                  className="inline-block"
                />
              </h1>
            </div>
          </div>
        </div>
      </Section>

      <Section id="tech_stack" to="about_me" btnText="About Me">
          <div className="flex flex-col items-center">
            {/* <StaticImage height={300} src="../images/corne.png" alt="nodejs" />  */}
            <h1 className="text-4xl  mt-10 mb-10 font-inconsolata drop-shadow-lg text-center">
              Technologies I work with
            </h1>
          </div>

          <div className="flex flex-row w-full p-2 text-center justify-around mt-2 items-center space-x-6">
            <TechBadge image={(

              <StaticImage
                placeholder="blurred"
                layout="constrained"
                width={150}
                height={150}
                src="../images/logos/gatsby-logo.png"
                alt="nodejs"
              />
            )}>
            </TechBadge>

            <TechBadge>
              <StaticImage
                placeholder="blurred"
                layout="constrained"
                width={160}
                height={150}
                src="../images/logos/react-logo.png"
                alt="react"
              />
            </TechBadge>

            <TechBadge>
              <StaticImage
                placeholder="blurred"
                layout="constrained"
                width={150}
                height={150}
                src="../images/logos/docker-logo.png"
                alt="docker"
              />
            </TechBadge>
          </div>
          <div className="flex-col w-full p-2 mb-20 text-center justify-around mt-2 items-center">
            <TechBadge>
              <StaticImage
                style={{ width: "150px" }}
                src="../images/logos/nodejs-logo.png"
                alt="nodejs"
              />
            </TechBadge>
            <TechBadge>
              <StaticImage
                style={{ width: "150px" }}
                src="../images/logos/azure-logo.png"
                alt="nodejs"
              />
            </TechBadge>
          </div>
      </Section>

      <Section id="about_me" to="contact" btnText="Get in touch">
        <div className="font-montserrat w-10/12" style={{ margin: "0 auto" }}>
          <h1 className="md:text-3xl text-center sm:text-2xl text-2xl mt-5 mb-10 space-x-4 font-black">
            I guess because my parents keep telling me to be more ladylike. As
            though!
          </h1>
          <p className="mb-4">
            I don't know what you did, Fry, but once again, you screwed up! Now
            all the planets are gonna start cracking wise about our mamas. No!
            The cat shelter's on to me. Um, is this the boring, peaceful kind of
            taking to the streets?
          </p>
          <p className="mb-4">
            We're also Santa Claus! Leela, Bender, we're going grave robbing.
            The key to victory is discipline, and that means a well made bed.{" "}
            <strong>
              {" "}
              You will practice until you can make your bed in your sleep.
            </strong>{" "}
            <em> Leela, are you alright?</em> You got wanged on the head.
          </p>
          <ul>
            <li>
              I've got to find a way to escape the horrible ravages of youth.
              Suddenly, I'm going to the bathroom like clockwork, every three
              hours. And those jerks at Social Security stopped sending me
              checks. Now 'I'' have to pay ''them'!
            </li>
            <li>
              Now Fry, it's been a few years since medical school, so remind me.
              Disemboweling in your species: fatal or non-fatal?
            </li>
            <li>Throw her in the brig.</li>
          </ul>

          <p className="mb-4">
            Can we have Bender Burgers again? Calculon is gonna kill us and it's
            all everybody else's fault! Calculon is gonna kill us and it's all
            everybody else's fault! Doomsday device? Ah, now the ball's in
            Farnsworth's court!
          </p>
          <p className="mb-4">
            Say it in Russian! Who's brave enough to fly into something we all
            keep calling a death sphere? So I really am important? How I feel
            when I'm drunk is correct? You seem malnourished. Are you suffering
            from intestinal parasites?
          </p>
          <p>
            Who are those horrible orange men? You guys aren't Santa! You're not
            even robots. How dare you lie in front of Jesus? Hello Morbo, how's
            the family? I love you, buddy!
          </p>
        </div>
      </Section>

      <Section
        id="contact"
        to="hero"
        // className="flex-col items-center justify center"
        btnText="Back to the top"
        reset
        headOrTail
      >

    <div className="flex-col pt-20 w-10/12 justify-center items-center mx-auto my-auto">

        <h1> Ping me section</h1>
    </div>
        <ContactForm />
      </Section>
    </Layout>
  );
};

export default Index;
