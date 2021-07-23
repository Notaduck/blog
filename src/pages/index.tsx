import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { content } from "../content";
import Typical from "react-typical";
import { FiChevronDown } from "react-icons/fi";
import { GatsbyImage } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";

const Index = () => {
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen items-center justify-center ">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row-reverse items-center justify-between ">
          <div className="w-full md:w-2/5">
            {/* <image src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104113705/original/6076831db34315e45bd2a31a9d79bb7b91d48e04/design-flat-style-minimalist-avatar-of-you.jpg'/> */}
            {/* <LazyLoadImage
            src={content.header.img}
            effect="blur"
            placeholderSrc={process.env.PUBLIC_URL + '/logo512.png'}
          /> */}
          </div>
          <div className=" text-main-text text-center md:text-left">
            <h2
              className={`${
                animated ? "" : "translate-y-10 opacity-0"
              }  transform transition duration-2000 ease-in-out text-3xl md:text-5xl font-bold`}
            >
              {content.index.text[0]}
              <br />
              {content.index.text[1]}
            </h2>

            <h2
              className={`${
                animated ? "" : "translate-y-10 opacity-0"
              }  transform transition duration-2000 ease-in-out text-2xl md:text-3xl font-bold`}
            >
              {content.index.text[2]}
              <br />
              <br />
            </h2>
            <h1
              className={`${
                animated ? "" : "translate-y-10 opacity-0"
              }  transform transition duration-2000 ease-in-out font-bold text-2xl text-gray-500`}
            >
              {content.index.text[3]}{" "}
              <Typical
                steps={content.index.typical}
                loop={Infinity}
                className="inline-block"
              />
            </h1>
            {/* <ScrollLink to="stack" smooth={true}>
            <button className=" animate-float bg-indigo-500 px-10 py-3 text-xl uppercase mt-10 rounded-lg">
              {content.index.btnText}
            </button>
          </ScrollLink> */}
          </div>
        </div>
        {/* <div className="flex justify-around w-full items-center h-full ">
          <button className='flex flex-col items-center border-2 border-gray-400 rounded-3xl p-5' >
            <p> Do you wanna now more?</p>
            <FiChevronDown />
          </button>
        </div> */}
      </div>
    </Layout>
  );
};

export default Index;
