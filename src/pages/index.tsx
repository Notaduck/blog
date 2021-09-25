import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { content } from "../content";
import Typical from "react-typical";
import { Section } from "../components/indexPage/section";
import { StaticImage } from "gatsby-plugin-image";
import { ContactForm } from "../components/form/contactForm";
import { Parallax } from "@react-spring/parallax";
import Divider from "../components/indexPage/divider";
import { UpDown } from "../src/styles/animations";
import Svg from "../src/components/svg";
import { UpDownWide } from "../components/indexPage/animations";
import Content from "../src/elements/content";
import Inner from "../src/elements/inner";

const Index = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const calculateAge = (dob1: string) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

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
     <Parallax pages={1}>
      <div>
        <Divider speed={0.7} offset={0} factor={2}>
          <UpDown>
            {/* <Svg icon="hexa" width={48} stroke color="icon_red" left="60%" top="70%" /> */}
            {/* FRONTEND */}
            <div className='w-24'>
              <StaticImage src='../images/logos/react-logo.png' alt='reactjs logo' className='relative top-56 left-16' />
            </div>

            <div className='w-24'>
            <StaticImage src='../images/logos/docker-logo.png' alt='docker logo' className='relative top-11 left-72' />
            </div>
            {/* <Svg icon="box" width={6} color="icon_darker" left="60%" top="15%" /> */}
          </UpDown>
          <UpDownWide>

            {/* <StaticImage src='../images/logos/gatsby-logo.png' alt='reactjs logo' height={58} className='relative top-40 left-72' /> */}
            {/* BACKEND */}
            {/* <StaticImage src='../images/logos/azure-logo.png' alt='azure logo' height={58} className='relative top-56 left-16' /> */}
            {/* <StaticImage src='../images/logos/nodejs-logo.png' alt='node logo' height={158} className='relative -bottom-3/4 left-16' /> */}
            {/* <StaticImage src='../images/logos/nestjs-logo.png' alt='reactjs logo' height={58} className='relative top-56 left-16' /> */}
            {/* <Svg icon="arrowUp" hiddenMobile width={16} color="icon_blue" left="80%" top="10%" />
            <Svg icon="triangle" width={12} stroke color="icon_brightest" left="90%" top="50%" />
            <Svg icon="circle" width={16} color="icon_darker" left="70%" top="90%" /> */}
            {/* <Svg icon="nestjs" hiddenMobile width={300} stroke color="icon_orange" left="10%" top="20%" /> */}
            {/* <Svg icon='r' */}
            {/* <Svg icon="triangle" width={6} stroke color="icon_darkest" left="30%" top="65%" />
            <Svg icon="cross" width={19} stroke color="" left="20%" top="15%" /> */}
             {/* <Svg icon="gatsbyjs" width={250} stroke color="text-red-500" left="28%" top="15%" /> */}
            {/* <Svg icon="circle" width={6} color="icon_darkest" left="75%" top="10%" />
            <Svg icon="upDown" hiddenMobile width={8} color="icon_darkest" left="45%" top="10%" />
            <Svg icon='upDown' hiddenMobile width={8} color="icon_darkest" left="45%" top="10%" /> */}
          </UpDownWide>
          {/* <Svg icon="circle" width={12} color="icon_darkest" left="50%" top="60%" />
          <Svg icon="upDown" width={8} color="icon_darkest" left="95%" top="90%" />
          <Svg icon="upDown" hiddenMobile width={24} color="icon_darker" left="40%" top="80%" />
          <Svg icon="triangle" width={8} stroke color="icon_darker" left="25%" top="5%" />
          <Svg icon="circle" width={64} color="icon_green" left="95%" top="5%" />
          <Svg icon="box" width={6} color="icon_darkest" left="10%" top="10%" />
          <Svg icon="box" width={12} color="icon_darkest" left="40%" top="30%" />
          <Svg icon="hexa" width={16} stroke color="icon_darker" left="10%" top="50%" />
          <Svg icon="hexa" width={8} stroke color="icon_darker" left="80%" top="70%" /> */}
        </Divider> 
        <Content sx={{ variant: `texts.bigger` }} speed={0.4} offset={0} factor={1}>
          <Inner>
            <h1 className='font-inconsolata'> Techhnoligies I work with </h1>
          </Inner>
        </Content>
      </div>
    </Parallax>
      </Section>

      <Section id="about_me" to="contact" btnText="Get in touch">
        <div className="font-montserrat w-10/12 mx-auto my-auto md:mt-12">
          <h1 className="md:text-3xl sm:text-2xl text-2xl mt-5 mb-10 space-x-4 font-black">
            Who am I?
          </h1>
          <p className="mb-4">
            My name is Daniel Guldberg Aaes, I am a {calculateAge("1991-07-02")} year
            old with a bachelor in Sofware development from the IT University of
            Copenhagen in Denmark.
          </p>

          <p>
            {" "}
            Initially I started out in the social and healt care profession and
            worked there for a coule of years. Howeever, I had always been in
            doubt if I wanted to work with people or in the tech industry due to
            fact that I was afraid of turning a hobby into work and loosing the
            joy within it. But at some point I took the decision to transition
            my career from the social and healt care field into Initially I
            started out in the social and healt care profession and worked there
            for a coule of years. Howeever, I had always been in doubt if I
            wanted to work with people or in the tech industry due to fact that
            I was afraid of turning a hobby into work and loosing the joy within
            it. 
          </p>

          <h1 className="md:text-3xl sm:text-2xl text-2xl mt-5 mb-10 space-x-4 font-black">
            Why this blog?
          </h1>
          <p className="mb-4">
            Throuhout the last couple of years I have gained experince with various programming languages in different domains such as 
            Java, Python, C, C#, F# JS and so on. Most of the knowlegde I have gained is spending countless of hours reading the docs,
            used google fu and read a tun of online tutorials and guides. I fell that I now have enough experience to pass on the knowlgede
            and at the same time I learn a whole lot by making theese blog post since it forces me to reflect on my aquired knowlegde
            which often leads to flaws where I have to dive deeper in the topic in order to pass on the knowlegde in a responsive way.
          </p>

          <h1 className="md:text-3xl sm:text-2xl text-2xl mt-5 mb-10 space-x-4 font-black">
            What do I do in my sparetime
          </h1>

          <p>

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
