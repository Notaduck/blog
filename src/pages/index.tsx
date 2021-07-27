import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { content } from "../content";
import Typical from "react-typical";
import { Section } from "../components/indexPage/section";

const Index = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);


  return (
    <Layout>
      <Section id="hero" to="tech_stack" btnText='Scroll'>
        <div className="flex-1 flex flex-col xs:mt-4 items-center justify-center mx-auto ">
          <div className="w-10/12 mx-auto flex flex-col md:flex-row-reverse items-center justify-between ">
            {/* <div className="  flex-1 flex flex-col w-full md:w-2/5">
              <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104113705/original/6076831db34315e45bd2a31a9d79bb7b91d48e04/design-flat-style-minimalist-avatar-of-you.jpg" />
            </div> */}
            <div className=" text-main-text text-center md:text-left">
              <h2
                className={`${
                  animated ? "" : "translate-y-10 opacity-0"
                } font-inconsolata transform transition duration-2000 ease-in-out text-3xl md:text-5xl font-bold`}
              >
                {content.index.text[0]}
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

      <Section id="tech_stack" to="hero" btnText='Back to the top' reset={true}>
        Some cool tech stacj stuff here
      </Section>
    </Layout>
  );
};

export default Index;
